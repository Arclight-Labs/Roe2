# Alliance Games Web App

A full fledge overlay tool for AcadArena Alliance Games Broadcast. This app is intended to be run locally for optimal latency.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `ctrl`: Console for Remote Overlay Tool
- `overlay`: Web based stream overlay
- `ws`: Websocket server
- `cloud-functions`: Cloud Functions for Firebase
- `utils`: utilities that can be used through all of the apps
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: configurations (includes `vite.config.js` `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `interface`: typescript types and interfaces

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### API

Read the [documentation](https://documenter.getpostman.com/view/15039556/Uyr5ne83)

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

<!-- This repository is used in the `npx create-turbo` command, and selected when choosing which package manager you wish to use with your monorepo (Yarn). -->

This repo requires `Yarn` as a package manager. Run this command to install yarn

```sh
npm install --global yarn
```

### Build

To build you must have the same node version or higher.
To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

<!--
### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
``` -->

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
