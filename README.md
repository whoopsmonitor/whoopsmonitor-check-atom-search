# whoopsmonitor-check-cloudflare-status-feed

Filter Cloudflare status Atom feed.

## Environmental variables

-   `WM_FEED_URL` - URL to the feed.
-   `WM_SEARCH_FOR` - JavaScript regular expression to search for.
-   `WM_MINUTES_AGO` - How much should we dig in the past.

## Example

There is an example of the check at the Whoops Monitor configuration tab or the `.env` file.

```yaml
WM_FEED_URL=https://www.cloudflarestatus.com/history.atom
WM_SEARCH_FOR=text to search for
WM_MINUTES_AGO=10
```

## Output

-   Exit code `0` - A searched expression not found.
-   Exit code `1` - Items founded. Output is in markdown format.
-   Exit code `2` - Some errors appeared.

## Build

```sh
docker build -t whoopsmonitor-check-cloudflare-status-feed .
```

## Run

```bash
docker run --rm --env-file .env whoopsmonitor-check-cloudflare-status-feed
```
