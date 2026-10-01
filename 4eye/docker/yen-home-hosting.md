# Yen home-hosting runbook — Cloudflare Tunnel

This deploys Yen's production container behind a remotely managed Cloudflare Tunnel. It does not configure traditional DDNS: the tunnel creates outbound connections, and the router needs no inbound port-forwarding rule.

## What is included

- `docker-compose.yen-tunnel.yml`: separate, isolated Compose project; Yen has no published host port, and `cloudflared` reaches it on the Compose bridge.
- `docker/yen.Dockerfile`: existing Yen production image, built with the approved hostname passed as a build argument.
- `docker/deploy-yen-tunnel.sh`: validates settings and file permissions, builds/pulls pinned images, waits for Yen's health check, then starts the stack.
- `docker/yen-home.env.example`: safe-to-commit configuration template. The real `.env.yen-home` and tunnel token are intentionally not tracked or included in the image build context.

This does not provision the Cloudflare account/zone, select a public hostname, create the named tunnel, configure Access, or provision an always-on Linux host. Those require account/domain/host access and a human choice; no account secret is needed in Git.

## 1. Prepare the hostname and Cloudflare side

1. DNS cutover was confirmed on 2026-09-28: public resolvers `1.1.1.1` and `8.8.8.8` return `sid.ns.cloudflare.com` and `keira.ns.cloudflare.com`, and the Cloudflare SOA. A local resolver briefly returned cached Google Cloud DNS nameservers. The repository IaC documents the previous Google Cloud DNS zone as `four-eye-ai`; verify its Terraform ownership/records before changing infrastructure further.
2. **Before proceeding, check that important DNS records survived the move.** Compare the Google Cloud DNS/Terraform inventory with records in Cloudflare; preserve A/AAAA/CNAME, MX, TXT (SPF/DKIM/DMARC and verification), CAA, certificate, staging/development, and app records. Confirm email and current sites still work. Do not make further nameserver changes unless a specific problem is found.
3. Cloudflare plan limits for future reference: standalone delegated child-zone setup (such as `yen.4eye.ai` as its own Cloudflare zone) is Enterprise-only; partial/CNAME setup is Business or Enterprise. These are no longer needed for this deployment because the parent `4eye.ai` zone is now on Cloudflare.
4. If Squarespace is the registrar, the required setting is the domain's **custom/authoritative nameservers**, not an ordinary DNS record. If the Nameservers control is absent, first verify the registrar (Squarespace may only host the site or domain connection); use the registrar shown by the domain registration lookup, or ask Squarespace support whether that domain is registered there and supports custom nameservers. Do not add Cloudflare's root nameservers as NS records inside the current Google Cloud DNS zone.
5. Alternatively, if your Cloudflare plan supports partial/CNAME setup, configure the zone/hostname as partial and follow Cloudflare's prescribed CNAME target at the current authoritative provider. Do not assume this is available on Free/Pro. If neither a full-zone migration nor a paid partial setup is acceptable, use a domain already managed by Cloudflare or retain a managed Yen host such as Cloud Run.
6. Once `4eye.ai` is active in the Cloudflare zone and the root-domain cutover is approved, create/use the **remotely managed named tunnel** and set its **Published application** route hostname to `4eye.ai`, with service URL `http://yen:8080`. The tunnel connector and Yen service share the Compose network, so `yen` is the service DNS name; do not use `localhost` or the residential WAN address. This apex-domain route replaces the previous `yen.4eye.ai` target and the existing proxied apex A record, so it changes what the root domain serves.
7. For **preview** deployment, Cloudflare Access plus Yen Basic Auth is the recommended site-wide gate. If deliberately skipping Access, retain Yen Basic Auth and explicitly acknowledge that static assets and robots.txt are not covered. Confirm any Zero Trust plan/billing terms with the account owner; do not accept payment or over-limit billing terms on their behalf. For a public launch, finish the Yen privacy/release review first.
8. Copy the tunnel token into a host-side file; never paste it into this repository, `.env.yen-home`, a command argument, or a source-controlled configuration file. The token file is read by the container using `cloudflared --token-file` (requires cloudflared 2025.4.0 or newer).

Cloudflare references: [DNS setup options and availability](https://developers.cloudflare.com/dns/zone-setups/), [full-zone setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), [partial/CNAME setup availability](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), [subdomain delegation availability](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/), [Tunnel overview](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), [create a remotely managed tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/), and [tunnel run parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/).

## 2. Prepare the host (macOS or Linux)

**Yes, this Mac can run the origin in Docker.** Docker Desktop runs the Linux Yen and `cloudflared` containers inside its managed Linux VM; Cloudflare Tunnel only needs outbound connectivity, so no inbound router rule is required. This is suitable for a preview or low-availability personal site. A laptop is not a reliable 24/7 production host: sleep, lid closure, logout, reboots, Docker Desktop shutdown, power loss, or ISP outages take Yen offline. For dependable public hosting, use an always-on Mac mini/server or Linux host, or keep Yen on a managed service such as Cloud Run.

Requirements: current Docker Desktop (with Compose v2) and Python 3.9+ on macOS, or Docker Engine/Compose v2 and Python 3.9+ on Linux. The deployment script and stack support either. Keep the host patched and network-connected; configure service startup and monitoring. This remains a single origin; Cloudflare does not provide power, ISP, hardware, or origin redundancy.

For this Mac, before relying on it:

1. Keep it connected to power and a stable network. In macOS System Settings → Battery/Power Adapter (wording depends on macOS version), enable the option to prevent automatic sleep on power while the display is off. Keep the lid open; do not depend on clamshell operation for the initial setup.
2. The repository includes a per-user LaunchAgent installer that opens Docker Desktop at login, waits up to ten minutes for the engine, and starts the existing stack without rebuilding. It writes only the LaunchAgent under `~/Library/LaunchAgents` and logs under `~/Library/Logs`; it does not store credentials in the plist. Install it only after deployment validates successfully (instructions below).
3. Deploy from an account that will remain logged in. After a reboot, confirm Docker Desktop starts, then verify `docker compose ... ps` and test the public hostname externally. Repeat after a macOS update/restart before treating this as production-ready.
4. Check the Mac's CPU architecture and keep the Yen image built for the machine that will run it. Rebuild on the target machine when moving between Apple Silicon and Intel unless using an explicitly configured multi-platform build.

If the computer sleeps or Docker Desktop stops, the tunnel disconnects and the site becomes unavailable; it should reconnect when the engine and containers return. A `caffeinate` command in a terminal is not a durable service manager, so prefer macOS power settings and verify behavior after reboot.

The host/firewall must permit the connector's **outbound** Cloudflare Tunnel traffic (normally port `7844` over UDP/QUIC, with TCP/HTTP2 fallback). No inbound Internet ports are required. Check the current Cloudflare connectivity pre-check documentation if the host has restrictive egress rules.

Clone/pull the repository on the host and run deployment commands from the repository root. Create a private config and token file:

1. Copy `docker/yen-home.env.example` to the repository root as `.env.yen-home`.
2. Set `YEN_SITE_URL` to the exact approved HTTPS origin (no path or trailing route) and `YEN_IMAGE_TAG` to a unique tag for this release. The template pins verified Cloudflare `cloudflared` release `2026.9.3` by version and Docker Hub manifest digest; update both together after checking the [official releases](https://github.com/cloudflare/cloudflared/releases). The configured version must remain at least `2025.4.0` for `--token-file`. Do not use `latest`.
3. Set `YEN_ACCESS_MODE=preview` until a public release is explicitly approved. For preview, either configure/test Cloudflare Access and set `CLOUDFLARE_ACCESS_CONFIRMED=YES`, or, if deliberately skipping Access, leave it `NO` and set `YEN_PREVIEW_WITHOUT_ACCESS_CONFIRMED=YES`. The latter is a weaker boundary: Yen Basic Auth protects matched pages, but static assets and `robots.txt` are not covered by Cloudflare Access. Both preview choices require a unique Yen password of at least 16 characters; never set both confirmation flags to `YES`.
4. For a public site, set `YEN_ACCESS_MODE=public`, `YEN_PUBLIC_RELEASE_CONFIRMED=YES` only after the public-release/privacy review, and clear both `SITE_ACCESS_USER` and `SITE_ACCESS_PASSWORD`. Public mode should be an intentional decision, not an accidental result of missing credentials.
5. Leave `EVOLVE_LOVE_PASSWORD` empty unless that feature should be enabled. Set the media base only to a verified public origin; the default matches the current Yen example configuration.
6. Create `.secrets/yen-cloudflare-token` and place **only the raw token** on a single line using a secure local method. Do not include comments, quotes, a variable name, or other dotenv text; `cloudflared --token-file` treats the file contents as the token. Set `CLOUDFLARE_TUNNEL_TOKEN_FILE=./.secrets/yen-cloudflare-token` in `.env.yen-home`.
7. Restrict both files to the host account: `.env.yen-home` and the token file must be readable only by the owner (mode `600`). Keep `.secrets/` under the repository root; it is excluded from Git and the Docker build context. Host administrators with Docker access can inspect container configuration/environment, so treat host administration as privileged access.

The validator intentionally rejects example hostnames, mutable `latest` cloudflared references, missing/loosely-permissioned secrets, unacknowledged public exposure, and preview mode without Yen Basic Auth plus either Cloudflare Access confirmation or an explicit weaker-boundary acknowledgment.

## 3. Validate, deploy, and inspect

Run the validation mode first; it starts no containers:

```sh
bash docker/deploy-yen-tunnel.sh validate
```

Then deploy:

```sh
bash docker/deploy-yen-tunnel.sh deploy
```

After a successful deploy and external test, install the macOS login startup helper:

```sh
bash docker/install-yen-home-macos-autostart.sh install
```

It starts Docker Desktop if installed, waits for its engine, and runs Compose `start` mode (no build/pull). Test recovery by logging out/in or rebooting while on power, then verify the hostname externally. View logs with `tail -n 100 ~/Library/Logs/yen-home-launchd*.log`. Remove only the LaunchAgent with `bash docker/install-yen-home-macos-autostart.sh uninstall`; this leaves containers running. Stop containers separately using the `docker compose ... down` command in the rollback section.

The deploy script builds Yen locally from the repository root, pulls the selected cloudflared image, and waits for Yen's `/robots.txt` health probe. The Compose configuration publishes **no host ports**. There is no database/cache dependency for Yen in this stack.

Useful operational checks:

```sh
docker compose --env-file .env.yen-home -f docker-compose.yen-tunnel.yml ps
docker compose --env-file .env.yen-home -f docker-compose.yen-tunnel.yml logs --tail=100 cloudflared
docker compose --env-file .env.yen-home -f docker-compose.yen-tunnel.yml logs --tail=100 yen
```

Verify all of the following before calling the deployment live:

- Cloudflare reports the named tunnel connector as **Healthy** and the published route points at `http://yen:8080`.
- The selected HTTPS hostname serves the expected build; canonical metadata and sitemap use `YEN_SITE_URL`.
- Preview mode blocks unauthenticated page requests using either the configured Cloudflare Access policy plus Yen Basic Auth, or the explicitly acknowledged Basic-Auth-only fallback; the fallback does not gate excluded static assets or robots.txt. Public mode works without Basic Auth only after the explicit release confirmation.
- `/robots.txt`, representative pages, static assets, any required API behavior, and media redirects work from outside the host.
- No router port forwarding for Yen is present. Do not expose port 8080 to the host/LAN as a shortcut.
- Any previous Cloud Run or Netlify origin is either intentionally retained and documented or disabled/restricted; DNS changes alone do not disable a directly addressable service.

`NEXT_PUBLIC_SITE_URL` is baked into the Yen build. Changing the public hostname requires editing `.env.yen-home` and rebuilding/redeploying. Use a fresh `YEN_IMAGE_TAG` per release and record the resulting image digest for rollback.

## 4. Troubleshoot connector and routing

If `cloudflared` logs `Provided Tunnel token is not valid`, the Yen origin can still be healthy while the public tunnel remains offline. In Cloudflare Zero Trust, open the intended **remotely managed named tunnel** and obtain a fresh connector token for that tunnel. The token file must contain the raw tunnel token—not an account API token, tunnel UUID, dashboard URL, or shell assignment. Replace `.secrets/yen-cloudflare-token` using a secure local method; do not print or paste the token into a command, log, or repository file. Confirm the file remains owner-readable only (`chmod 600 .secrets/yen-cloudflare-token`), then restart the stack with `bash docker/deploy-yen-tunnel.sh start`. Check the `cloudflared` logs and confirm the connector reports **Healthy** in Cloudflare before testing the public hostname.

If the connector is established but logs `No ingress rules were defined` and the hostname does not resolve, the token is working but the Cloudflare tunnel still needs its **Published application** route. In the Cloudflare dashboard, add the selected hostname to the intended named tunnel and set its service to `http://yen:8080`. For a preview, Cloudflare Access is recommended for a site-wide identity gate; if deliberately skipped, retain Yen Basic Auth and acknowledge the weaker boundary with `YEN_PREVIEW_WITHOUT_ACCESS_CONFIRMED=YES`. Cloudflare normally creates the tunnel DNS record; if an existing record conflicts, replace it with a proxied CNAME to `<tunnel-UUID>.cfargotunnel.com` (Cloudflare supports apex CNAME flattening). Never point an A/AAAA record at the home WAN IP. Then retest DNS and HTTPS externally.

## 5. Updates, stop, and rollback

Before an update, select a new `YEN_IMAGE_TAG`, verify the intended site URL/access mode, and run `validate`. Deploy with the script. Retain the previous release's image digest/tag and the known-good configuration. Test the upgraded hostname and tunnel before removing the old image.

To stop the stack without deleting the local release image:

```sh
docker compose --env-file .env.yen-home -f docker-compose.yen-tunnel.yml down
```

To roll back, restore the previous Yen image tag/settings and redeploy. If the host/ISP is unavailable, use Cloud Run or Netlify only if that fallback was previously tested and its custom-domain route is configured. Direct Cloud Run/Netlify URLs may still be reachable, so verify their access policies separately.

Rotate the Cloudflare tunnel token immediately if exposed. Rotate Yen credentials as needed. Never include token contents or passwords in logs, support requests, or repository commits.
