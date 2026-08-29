# App Start Demo

A practical React Native (Expo) demo focused on building fast, observable app startups. Before the first screen renders, it manages the critical boot sequence: version gating, maintenance mode, security checks, and splash screen timing. Everything is hooked up to Sentry for full observability, capturing detailed startup traces and navigation telemetry. It also includes a side-by-side look at eager versus lazy loading to show the real-world impact of heavy modules on boot time.

## Prerequisites

- Node.js and npm
- Xcode (for iOS builds)
- Android Studio with an Android SDK (for Android builds)

## Getting started

- Copy `.env.example` to `.env` and fill in the values:

  ```sh
  cp .env.example .env
  ```

  | Variable                 | Purpose                                                                                        |
  | ------------------------ | ---------------------------------------------------------------------------------------------- |
  | `SENTRY_ORG`             | Your Sentry organization slug. Required by the Expo plugin during the build step.              |
  | `SENTRY_PROJECT`         | Your Sentry project slug. Pairs with your org to route data to the right bucket.               |
  | `EXPO_PUBLIC_SENTRY_DSN` | Your client key. Baked directly into the JS bundle to power live telemetry and error tracking. |

- Install the dependencies:

  ```sh
  npm install
  ```

- Generate the native `android`/`ios` projects:

  ```sh
  npm run prebuild
  ```

- Start the development server:

  ```sh
  npm run start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

## Code quality

- Run `npm run biome:check` to catch syntax and formatting issues.
- Use `npm run biome:fix` to format the codebase and resolve auto-fixable errors.
- `npm run ts:check` runs a strict type check across the project.
- Run `npm test` to execute the Jest test suite.
