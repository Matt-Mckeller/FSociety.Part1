# Plan — Host Yen at home with Cloudflare Tunnel

**Date:** 2026-09-27
**Status:** Apex route deployed: Cloudflare Tunnel routes `4eye.ai` to `http://yen:8080`, with proxied DNS CNAME to the tunnel. Yen release `yen-home-2026-09-30.1` and connector are healthy; external unauthenticated requests receive HTTP 401 and authenticated requests HTTP 200. The former apex A record was replaced. Zero Trust Access was not activated; preview uses Yen Basic Auth only, explicitly acknowledged as a weaker boundary.
**Scope:** `4eye/apps/yen` preview on the current macOS machine, with the option to migrate to an always-on host later
**Recommendation:** Cloudflare Tunnel; do not configure conventional DDNS or router port forwarding for the initial deployment.

## 1. Decision summary

Use a dedicated, always-on Linux host running Yen's existing production container and `cloudflared` as a Docker Compose sidecar. Create a named Cloudflare Tunnel and route one chosen public hostname to Yen's private Docker-network origin at `http://yen:8080`.

This meets the practical goal of reaching Yen through a home/office connection whose public IP may change. It does **not** use DDNS in the traditional sense: `cloudflared` makes an outbound tunnel connection to Cloudflare, so the home IP is neither published in DNS nor required to stay fixed. No inbound router ports need to be opened.

| Decision | Recommendation | Reason |
|---|---|---|
| Public ingress | Cloudflare Tunnel (named tunnel) | Outbound-only origin connection; avoids exposing the host and avoids IP update jobs |
| Public hostname | Choose a domain/subdomain before release | Yen's canonical URL is currently undecided; hostname drives build-time metadata and DNS |
| Origin | Yen container on private Docker network, port 8080 | Matches the existing standalone production image; no host-published Yen port needed |
| Runtime host | Current Mac accepted temporarily for preview/testing; use an always-on Mac mini/server, Linux host, or Cloud Run for stronger uptime | Docker Desktop containers stop being reachable when macOS sleeps, logs out, reboots, or loses power/network |
| Security gate | Decide whether Yen is public or preview-only; keep app credentials in host secrets | The existing Basic Auth gate is optional and activates only when both credentials are configured |
| Existing hosting paths | Inventory Cloud Run and Netlify before cutover; retain only an intentional fallback | Repository configuration exists for both paths, but does not prove either is currently live |

## 2. Verified repository facts and boundaries

- Yen's production image is a Node 22 standalone Next.js server with `PORT=8080`, `HOSTNAME=0.0.0.0`, and an exposed container port of 8080. Build it from the monorepo root using `docker/yen.Dockerfile`.
- Yen does not have a runtime Postgres or Redis dependency identified in its package configuration. The root Compose file's database and cache belong to the API stack; they are not prerequisites for Yen.
- `/media/*` redirects to `NEXT_PUBLIC_MEDIA_BASE` when set. The existing environment example points that to a public Google Cloud Storage prefix. Confirm media availability independently of the new origin.
- `NEXT_PUBLIC_SITE_URL` is a build-time public setting used for canonical URLs and metadata. The Yen site helper otherwise falls back to localhost. Set the final HTTPS hostname before building the release image.
- The current deploy script builds and deploys to Cloud Run, allows unauthenticated platform access, and does not create a custom-domain mapping. It is not the self-hosted tunnel deployment path.
- A `netlify.toml` also configures a Yen build. That file proves a Netlify build configuration exists; it does **not** prove a Netlify site is connected, deployed, or serving a custom domain. Verify the Netlify account/site and current DNS before cutover.
- Repository infrastructure documentation says production DNS for `4eye.ai` was managed in Google Cloud DNS zone `four-eye-ai`. On 2026-09-28, queries to public resolvers `1.1.1.1` and `8.8.8.8` returned Cloudflare nameservers `sid.ns.cloudflare.com` and `keira.ns.cloudflare.com`, and Cloudflare SOA; the local resolver briefly returned cached Google nameservers. Treat Cloudflare as the current authority, but recheck from public resolvers if status appears inconsistent.
- **Plan constraint discovered:** Cloudflare standalone subdomain-zone delegation is Enterprise-only. Cloudflare's partial/CNAME setup is Business or Enterprise; Free/Pro require a full-zone setup. Do not assume a child zone such as `yen.4eye.ai` can be delegated to a Free/Pro Cloudflare account.
- Basic Auth is optional: Yen's middleware enforces it only when both `SITE_ACCESS_USER` and a non-empty `SITE_ACCESS_PASSWORD` are set. The existing Cloud Run deploy script passes those credentials, but does not pass `EVOLVE_LOVE_PASSWORD`; self-hosting should explicitly supply that value only if the corresponding feature is meant to be enabled.
- Self-hosted Tunnel artifacts now exist: `docker-compose.yen-tunnel.yml`, `docker/deploy-yen-tunnel.sh`, `docker/yen-home.env.example`, and `docker/yen-home-hosting.md`. They use a remotely managed tunnel token file and require operator-supplied domain/account/host details.
- macOS login startup helpers now exist: `docker/install-yen-home-macos-autostart.sh` installs a user LaunchAgent; `docker/start-yen-home-macos.sh` opens Docker Desktop, waits up to ten minutes for its engine, and starts the already-built stack. These helpers do not remove the Mac's sleep/power/network single point of failure.
- The root `.dockerignore` previously excluded `packages/@4eye/ai-sdk`, even though the Yen Dockerfile copies it. That exclusion has been removed so local Compose builds can include all Dockerfile inputs. The private `.secrets/` directory is excluded from Git and Docker build contexts.

## 3. Required decisions before implementation

1. **Hostname:** choose the canonical HTTPS name, for example `yen.example.com`. This is an example only, not a selected domain.
2. **DNS authority and plan:** public DNS now confirms Cloudflare authority for the full `4eye.ai` zone. First verify that the expected records were imported and remain correct, and reconcile Terraform's prior Google Cloud DNS ownership. Never add the root Cloudflare nameservers as ordinary DNS records inside a zone.
3. **Exposure policy:** decide whether Yen is a public site or a restricted preview. Preview can use Cloudflare Access plus Yen Basic Auth, or Basic Auth alone only with explicit acknowledgment that some static assets and robots.txt are not covered. Public mode requires explicit release/privacy confirmation and cleared Basic Auth credentials.
4. **Host and recovery owner:** select the machine, OS, storage location, restart/patch policy, and person responsible for recovering it after power, network, or hardware failure.
5. **Existing deployment disposition:** verify whether Cloud Run and/or Netlify are actually serving Yen. Decide which, if any, is a temporary rollback target, permanent alternate deployment, or to be disabled after cutover. If retained, account for its direct URL/custom-domain reachability and prevent it from bypassing the intended access policy.

## 4. Target request path

```text
Visitor (HTTPS)
  → Cloudflare DNS / edge
  → outbound encrypted connection from cloudflared to Cloudflare
  → cloudflared container on the host
  → private Docker network: http://yen:8080
  → Yen standalone Next.js server
```

The router has no inbound forwarding rule for ports 80 or 443. The Yen container does not publish 8080 to the host or LAN unless a separately justified local diagnostic need is approved. HTTPS terminates at Cloudflare's edge; the tunnel connection is encrypted. HTTP from `cloudflared` to Yen stays within the host's private Docker network.

## 5. Implementation phases and gates

### Phase A — Domain, account, and DNS readiness

- Confirm ownership of the chosen domain and access to its registrar and Cloudflare account.
- Inventory existing DNS records and mail-related records (MX, SPF, DKIM, DMARC); preserve them if changing nameservers.
- Choose the supported Cloudflare DNS mode before touching nameservers: Enterprise child-zone delegation, Business/Enterprise partial setup, or full-zone Cloudflare setup for Free/Pro. If moving the full zone, export and compare the complete Google Cloud DNS/Terraform record set, preserve mail and verification records, resolve DNSSEC/DS state, and update Terraform ownership before changing nameservers at the registrar. Cloudflare's automatic DNS scan is not a complete migration guarantee.
- Create a **named** tunnel in the intended Cloudflare account/zone. Store its token as a host secret, not in Git, image layers, shell history, or a committed Compose file.
- Route the chosen hostname to the tunnel. Use Cloudflare-managed tunnel DNS routing; do not create an A/AAAA record to the changing residential IP.

**Gate:** A supported Cloudflare DNS mode is active for the selected hostname; existing DNS services remain intact; the tunnel has a stable named identity and recoverable credentials.

### Phase B — Prepare the origin host

- Provision and patch either macOS with Docker Desktop or Linux with Docker Engine and the Compose plugin. This current Mac can host a preview; for production uptime use an always-on host. Prefer wired Ethernet and a DHCP reservation for predictable local administration, while recognizing that a reservation is not public DDNS.
- Use a dedicated non-root operational account and restrict SSH/admin access to the local network or a separately secured management path.
- Set the host to start Docker and the Yen/tunnel services after reboot. On macOS, configure Docker Desktop to open at login, prevent sleep while on power, and verify service recovery after reboot. Configure log rotation and monitor disk space.
- Keep the deployment definition and non-secret settings in a controlled location. The implementation uses a mode-600 `.env.yen-home` for runtime settings and app credentials, plus a separate mode-600 token file mounted as a Compose secret; both are excluded from version control and the image build context. Encrypt any backups containing either file.
- Do not reuse the root `docker-compose.yml` without review: it does not define Yen and starts unrelated API/web/database services.

**Gate:** A host reboot restores Docker, Yen, and `cloudflared`; secrets are not in the repository; Yen is reachable only inside the intended Docker network.

### Phase C — Build and run Yen locally

- Build the existing production image from the repository root using `docker/yen.Dockerfile`; use an immutable release tag or image digest for deployment rather than relying solely on `latest`.
- Use `docker-compose.yen-tunnel.yml` and `docker/deploy-yen-tunnel.sh` for the self-hosted path; do not invoke the unrelated root development Compose stack. The deployment script requires a unique release tag and records the image digest for rollback; Docker tags themselves are mutable.
- Configure `NEXT_PUBLIC_SITE_URL` to the final `https://<chosen-hostname>` before building. This value is baked into the public build and changing it requires rebuilding.
- Configure `NEXT_PUBLIC_MEDIA_BASE` to the verified public media origin if GCS remains the media host. Check that media objects are accessible and do not depend on the old application origin.
- Supply `SITE_ACCESS_USER` and `SITE_ACCESS_PASSWORD` only according to the public-vs-preview decision. Keep credentials out of image build arguments because they are runtime secrets.
- Supply `EVOLVE_LOVE_PASSWORD` only if that feature is intended to work; check that it is not accidentally omitted by the chosen runtime definition.
- Keep Yen and `cloudflared` on a dedicated private Compose network. Set restart policies. Add a meaningful local health check or monitoring probe before relying on restart/uptime reporting; the current Yen Dockerfile does not declare a health check.
- Run Yen locally before connecting public DNS. Check the home page, representative routes, metadata/canonical URL, authentication behavior, static assets, API route behavior, and redirected media.

**Gate:** The pinned image is healthy locally; critical routes and assets pass; secrets and access policy behave as intended; canonical URLs use the selected HTTPS hostname.

### Phase D — Connect the named tunnel and test privately

- Configure `cloudflared` to send the selected hostname to the Compose service name and internal port, `http://yen:8080`.
- Do not use `localhost:8080` from a separate `cloudflared` container; in that container, localhost means the tunnel container itself. Do not use the host's public IP as the origin.
- Verify the tunnel is registered and connected after a cold restart. Verify that the Cloudflare hostname resolves through the tunnel and that HTTP requests reach Yen without any router port-forwarding rules.
- Validate that expected request headers and the `https` public origin produce correct redirects and canonical metadata. Do not weaken TLS/security settings to hide a misconfiguration.
- Test both the authenticated preview case and unauthenticated response if a gate is configured. Ensure the behavior matches the chosen release policy.

**Gate:** External tests pass over HTTPS; no inbound ports are open; stopping Yen makes the origin unavailable (not a stale second service); restarting Yen and `cloudflared` restores service without manual DNS/IP edits.

### Phase E — Cutover and operational readiness

- Lower DNS TTL in advance where relevant and schedule a brief cutover window. Add/update only the selected hostname's tunnel route.
- Update external links and any remaining references to the previous hostname. Confirm `NEXT_PUBLIC_SITE_URL` and generated sitemap/robots/canonical URLs agree.
- Keep only the verified Cloud Run or Netlify deployment as rollback, for the agreed observation period. A Cloud Run service URL or Netlify site's assigned hostname may remain directly reachable after DNS points elsewhere. If retiring either, remove or restrict it deliberately; DNS changes do not disable a deployment or provide access control.
- Check all DNS records, Cloudflare routes, Netlify custom-domain assignments, and Cloud Run custom-domain mappings for the chosen hostname. Ensure no stale or parallel route can serve an older Yen build or bypass the intended access policy.
- Record the image digest, deployment date, tunnel identifier, DNS owner, secret recovery procedure, tested rollback steps, and alert/contact owner in the operational runbook. Never record the tunnel token or passwords in that runbook.
- Monitor external uptime, host CPU/memory/disk, container restarts, tunnel connectivity, and backup/recovery status. Test a host reboot and one restore/redeploy procedure.

**Gate:** The chosen hostname is the only intended public entry point, rollback is understood, and the host has an owner and monitoring/recovery process.

## 6. Security and reliability controls

- **No port forwarding:** do not expose SSH, Yen's 8080, or router-admin interfaces to the public Internet for this design.
- **Origin isolation:** publish no Yen host port; allow only the tunnel container to reach Yen on the private network.
- **Credential hygiene:** rotate tunnel tokens if exposed; keep site credentials out of Git and image layers; use unique strong credentials for any preview gate.
- **Cloudflare Access:** use it in addition to, not as an accidental substitute for, Yen's own access policy when preview access should be identity-restricted. Confirm the Access policy protects every intended hostname/path and that direct Cloud Run or Netlify access is not a bypass.
- **Public-site readiness:** the repository's prior public-release review identifies content/privacy concerns. Hosting behind a tunnel does not audit content or make a private site safe to publish. Close the applicable release/privacy review before allowing public access.
- **Availability boundary:** a single home host remains a single point of failure. Cloudflare Tunnel masks changing IPs and removes inbound exposure; it does not provide origin redundancy, power, ISP uptime, hardware replacement, or disaster recovery. Cloud Run remains the better fit if managed availability and low home-operations burden matter more than self-hosting.
- **Updates:** pin supported `cloudflared` and Yen image versions, apply OS/container security updates on a planned cadence, and test upgrades before replacing the known-good image.

## 7. Rollback plan

1. Keep the previous Yen image digest and the last known-good host configuration.
2. If the new origin is unhealthy, restore the previous local image and verify the tunnel-to-origin path first.
3. If the host or ISP is unavailable and Cloud Run or Netlify is the agreed fallback, restore only the previously validated routing for that service. Preconfigure and test any custom-domain route; do not assume a service's default URL automatically accepts the chosen hostname.
4. If public exposure must stop immediately, remove the tunnel hostname route and/or apply a Cloudflare Access block. Do not rely on DNS propagation alone for emergency access removal.
5. After any cutback, verify the old Cloud Run endpoint's access policy separately; removing the public hostname does not disable that endpoint.

## 8. Conventional DDNS fallback (not recommended for first release)

If Cloudflare Tunnel is unavailable or explicitly rejected, traditional DDNS would require a DNS provider/updater to publish the changing WAN IP, router port-forwarding (normally 443 only) to a hardened reverse proxy, valid TLS certificates, host firewall rules, and a plan for CGNAT/double NAT. This creates an inbound Internet path and extra failure/security surfaces. If the ISP uses CGNAT, conventional inbound DDNS will not work without a public IP or an additional relay. Revisit this only if an explicit requirement needs direct inbound connectivity.

## 9. Acceptance checklist

- [ ] Canonical domain and Cloudflare DNS authority/delegation are confirmed.
- [ ] No DNS record exposes the residential WAN IP for this Yen hostname.
- [ ] No inbound router port-forwarding is required or present for Yen.
- [ ] Yen and `cloudflared` start after host reboot and recover from container restart.
- [ ] Public HTTPS hostname reaches the correct Yen build and all tested routes/assets work.
- [ ] Build-time canonical URL and public media origin are correct.
- [ ] Preview/public access policy is intentional and independently tested.
- [ ] Tunnel token and application passwords are absent from Git, image history, and public logs.
- [ ] Cloud Run and Netlify status are verified; each is either a documented fallback or disabled/restricted, with no unintentional public bypass.
- [ ] Host monitoring, patching, backups/recovery, and named ownership are in place.

## 10. Sources checked in this repository

- Yen package scripts and test commands: `apps/yen/package.json`
- Monorepo Yen deployment shortcuts: root `package.json`
- Home-hosted Tunnel Compose stack: `docker-compose.yen-tunnel.yml`
- Host-side validation and deployment script: `docker/deploy-yen-tunnel.sh`
- macOS login startup helpers: `docker/install-yen-home-macos-autostart.sh`, `docker/start-yen-home-macos.sh`
- Safe environment template and operational runbook: `docker/yen-home.env.example`, `docker/yen-home-hosting.md`
- Yen production image, runtime port, and build-time URL defaults: `docker/yen.Dockerfile`
- Current Cloud Run deploy behavior and environment variables: `docker/deploy-yen-cloudrun.sh`
- Yen environment example: `apps/yen/.env.example`
- Yen optional Basic Auth and media redirect: `apps/yen/src/middleware.ts`, `apps/yen/src/lib/site-access.ts`
- Canonical URL fallback and domain decision note: `apps/yen/src/lib/site.ts`
- Root Compose services (which do not include Yen): `docker-compose.yml`
- Netlify build configuration (presence is not proof of an active site): `netlify.toml`
- Documented production DNS authority and domain names: `infrastructure-as-code/README.md`
- Cloudflare DNS setup modes and plan availability: [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), [partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/)
- Secret/build-context exclusions: `.gitignore`, `.dockerignore`, `docker/yen.dockerignore`
- Cloudflare Tunnel outbound-only design: [Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
- Cloudflare Tunnel DNS record routing: [Cloudflare DNS records documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/)
- Verified `cloudflared` container release and digest: [Cloudflare cloudflared releases](https://github.com/cloudflare/cloudflared/releases)
- Existing public-release review / separate privacy launch concerns: `_current/plans/yen-public-release-review.md`

This is an implementation plan, not a claim that the domain, Cloudflare zone, host, secrets, or tunnel have already been provisioned.
