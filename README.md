# cloudflare-pages-badges

**Add status badges to your [Cloudflare Pages](https://pages.cloudflare.com/) projects.**

This project is deployed using [Cloudflare Workers](https://workers.cloudflare.com/), to set it up yourself, follow the [Deployment](#deployment) section.

Badges are rendered using [shields.io](https://shields.io) - it makes use of the `endpoint` functionality, all this worker does is provide a JSON response that tells shields how to render your badge.

## Contributions

This project is pretty much complete, however, feel free to submit a PR or issue for any changes/additions you feel are worth adding!

## Required Secrets

You must add the following secrets to your Workers runtime in order for the Worker to function correctly:

- `CLOUDFLARE_ACCOUNT_ID` is the ID of the Cloudflare account that contains the Pages projects.
- `CLOUDFLARE_API_KEY` is the generated API key for the account that contains the Pages projects. To generate the correct API key, follow [this section](#generating-api-tokens).

## Deployment

To deploy this project:

1. Clone this git repo
1. Install [wrangler2](https://developers.cloudflare.com/workers/wrangler/get-started/).
1. Run `wrangler publish`
1. Take note of the `workers.dev` URL you are given.
1. Go to the Cloudflare Dashboard, get your account ID and an [API token](#generating-api-tokens).
1. Add your account ID to the worker config: `wrangler secret put CLOUDFLARE_ACCOUNT_ID`.
1. Add your Cloudflare API token to the worker config: `wrangler secret put CLOUDFLARE_API_KEY`.
1. Use the following URL to get a badge:
    ```
    https://img.shields.io/endpoint?url=https://<WORKERS_DEV_URL>/?projectName=<NAME_OF_PAGES_PROJECT>
    ```


## Generating API tokens

You will need to generate a Cloudflare API key in order to use this Worker.

1. First, go to the [API Tokens](https://dash.cloudflare.com/profile/api-tokens) page.
1. Click `Create Token` in the top right.
1. Scroll down and create a `Custom Token`.
1. Create the token:
    - Name the token `Cloudflare Pages Badges`.
    - Under permissions, set to `Account` -> `Cloudflare Pages` -> `Read`.
    - Under Account Resources, only select the relevant account under `Include`.
    - Do not define any IP address filtering, or a TTL.
    - Click `Continue to summary`. Your response should look something like:
        ```
        Cloudflare Pages Badges API token summary
        This API token will affect the below accounts and zones, along with their respective permissions

        <YOUR_EMAIL>'s Account - Cloudflare Pages:Read
        ```
