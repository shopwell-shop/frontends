# Blank Vue 3 template (Vite)

![Shopwell Frontends](./public/shopwell-frontends-logo.png)

This repository shows an example of application built with Shopwell Frontends Framework on Vue 3 (Vite).

## What's inside

- Vue 3 application
- Required libraries installed (api-client, composables)
- Minimum Shopwell context setup (see `createShopwellContext` in [main.ts](./src/main.ts))

## Requirements

Go to [Documentation > Requirements](https://developer.shopwell.cn/frontends/framework/requirements.html) to see the details.

## Set up your Shopwell 6 instance

In order to have a different API connect to the app, change the API access information in `.env.local` file. Then rerun the application.

## Customize

Now, you are free to use the `@shopwell/composables` package in the application. You can start from [src/App.vue](./src/App.vue).

## Install & Run

1. `pnpm i` to install deps
2. `pnpm dev` to run the project in dev mode

## Try it online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/shopwell-shop/frontends/tree/main/templates/vue-vite-blank)
