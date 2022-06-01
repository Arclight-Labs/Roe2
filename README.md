<p align="center">
  <img src="https://user-images.githubusercontent.com/49423729/169544055-63179ae4-0702-4e3f-a730-335dee835e56.png" height="150" />
</p>
<p align="center">
  Roe2
</p>
<p align="center">
  <a href="https://www.codefactor.io/repository/github/acadarena/roe2"><img src="https://www.codefactor.io/repository/github/acadarena/roe2/badge" alt="CodeFactor" /></a>
  <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="CodeFactor" />
  <a href="https://www.codacy.com/gh/AcadArena/Roe2/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AcadArena/Roe2&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/3b2f3c26e71d4949aced6e64ce9e3608"/></a>
</p>



# Remote Overlay Environment 2

An overlay tool for tournaments hosted in [AcadArena](https://app.acadarena.com/) platform.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `ctrl`: Console for Remote Overlay Tool
- `overlay`: Web based stream overlay
- `ws`: Websocket server
- `cloud-functions`: Cloud Functions for Firebase
- `utils`: utilities that can be used through all of the apps
- `ui`: a stub React component library shared by both `ctrl` and `overlay` applications
- `config`: configurations (includes `vite.config.js` `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `interface`: typescript types and interfaces

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

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

```sh
cd roe2
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd roe2
yarn run dev
```
