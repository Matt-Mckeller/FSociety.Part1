# Typecheck baseline

`error-sites.txt` is the set of `file(line,` sites that **already fail** `tsc --noEmit`
in this app, captured 2026-08-05. There are 53 of them and none are new.

## Why this exists

The app does not typecheck clean, so "did tsc pass?" cannot answer "did I break
anything?". Comparing *counts* is not enough either — fixing one error while
introducing another leaves the count unchanged. Comparing the **set of error
sites** catches that.

## Use

```bash
cd apps/4eye-web-mockup
./node_modules/.bin/tsc --noEmit -p tsconfig.json > /tmp/tsc-now.txt 2>&1
grep -oE "^[^(]+\([0-9]+," /tmp/tsc-now.txt | sort > /tmp/sites-now.txt
diff tools/typecheck-baseline/error-sites.txt /tmp/sites-now.txt \
  && echo "no regressions"
```

Any diff is a regression you introduced. If you deliberately *fix* a
pre-existing error, remove its line from the baseline in the same commit.

## Note on `next start`

When verifying rendered output, confirm the server actually bound before
trusting a fetch:

```bash
grep -qi EADDRINUSE server.log && echo "STALE — you are reading the old build"
```

A previous session spent a round reporting work as missing when it was present;
`next start` had failed with `EADDRINUSE` and curl was hitting the old process.
