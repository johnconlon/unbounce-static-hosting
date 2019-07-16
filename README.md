## Unbounce Static Hosting

This public repo contains the sources we wish to publish for use in Unbounce landing pages and onboarding flows.

Public root is hosted at http://sundaehq.github.io/unbounce-static-hosting/

## What's in this repo
This repo contains code written using two different methods: 
- "legacy": which is written using jQuery 1.4.2 and no build step.
- "modern": newer code written in Typescript using Preact and Webpack. All "modern" code is in the `src` directory.

Most new work is done in the "modern" style, but we maintain the "legacy" code until we are able to retire the relevant landing pages which use that source. The "modern" approach is preferred because we can leverage re-usable components and modern build tooling.

The combination of these two styles in a single repo can be confusing. We're moving towards removing "legacy" code from the repo.

Documentation for both kinds of code is provided below.

## Unbounce and the page model
[Unbounce](unbounce.com) is a SaaS tool and visual builder for landing pages. We currently use it to host landing pages, but are moving away from it. More information on Unbounce and our plans for it can be found here: https://docs.google.com/presentation/d/1_YMYPm08OJz3AEcawoAaVQ2eKX9Gl7o3V6_hSZiVOHU/edit?usp=sharing.

Unbounce is organized around the concept of Pages and Variants of those pages. The code in this repo is generally organized around that same concept. In "legacy" code, source is organized into directoriess which indicate which page those assets should be loaded on - see the "Naming Convention" section for details. In "modern" code, we define an entry point for each page which determines the bundle to be served for that page - see "Entry Points and Pages" for more details.

## Directory Structure Overview
- `dist`: Files served to public pages are located in `dist`. All "legacy" code lives here directly. For "modern" code, the build process outputs bundles to `dist/pages`.
- `scripts`: Contains miscellaneous scripts.
- `shim`: Defines a local webserver which can be used to host "legacy" pages from localhost.
- `snippets`: Contains html snippets which have to be manually entered into Unbounce pages through the Unbounce GUI e.g. tracking snippets.
- `src`: Source files for "modern" code.

## Legacy Code

Legacy code expects jQuery 1.4.2 to be provided by Unbounce and be globally available.

### Naming convention

We need to host JS and CSS for multiple pages, and multiple variants nested within each page.
As a convention, in the `/dist` directory, we will create a folder for each page.
The name of the folder should reflect the name of the page [in Unbounce](https://app.unbounce.com/3108821/pages?show_only=all&direction=desc&sort_option=updated_at&group_id=1986861).

Within each folder, you should create a folder per variant using the variant's char ID as set by Unbounce (e.g. a, b, c...). The name of the JS or CSS asset should contain the page & the variant name (separated by a `-`). For example:

```
dist
├── autocomplete-address-step2-contact-info
│   ├── README.md
│   └── a
│       ├── README.md
│       └── autocomplete-address-step2-contact-info-a.js
```

Both the folders for each page and each variant should contain a README.md file with a brief explanation of the page/variant.

## Modern Code

We use [Typescript](https://www.typescriptlang.org/), [Preact](https://preactjs.com/), and [Webpack](https://webpack.js.org/) for "modern"-style code. All "modern" code lives in the `src` directory.

We use Preact rather than React because of Preact's small bundle size (3kb).

### Entry Points and Pages
To match the Unbounce structure of Pages, we define separate webpack configurations and entry points for each page. Pages are defined by the subdirectors of the `src/pages` directory. For example, the `src/pages/msow-timeline` directory contains the entry file for msow-timeline page.

We define entry points for each individual page so we can publish a bundle which contains only the code relevant to that specific page. We define Webpack configurations for each page/entry point so we have the ability to build individual pages (rather than all pages in the repo) which is useful for publishing bundles for only the pages you are currently focusing on.

#### Adding a Page
To add a page, create a new subdirectory of `src/pages` e.g. `src/pages/my-new-page` and define an entry file for the assets to be used on the page e.g. `index.tsx` (so the path would be `src/pages/my-new-page/index.tsx`. The webpack config will automatically find the new entry point, create a new configuration for that page, and be able to bundle and build the relevant assets.

### Building for production

The `build` command accepts a config name and will build just that configuration. This is useful for ensuring only the page/component you're working on is updated for production in `dist`.

For example:
```
# Will build only the msow timeline page.
yarn build pages-msow-timeline
```
The config names are generally the path to the relevant index.ts, with slashes converted to dashes e.g. the address confirmation page located at `src/pages/address-confirmation/a` would have the config name `pages-address-confirmation-a`. Similarly, the msow-timeline page at `src/pages/msow-timeline` would have the config name `pages-msow-timeline`.

### Building all pages
The `yarn build-all` command will build all pages.

## Development process

In [package.json](./package.json), we have a dev dependency on http-server. So you can run

```javascript
yarn
yarn start
```

and then access the root of dist at [http://localhost:8080/](). You can use this path in the script tag while developing the page in Unbounce.

## Other Notes

### Nested `node_modules`

We use a nested `node_modules` directory to take advantage of the nodejs lookup scheme to avoid fragile relative lookups for shared libraries. For example, we can `import 'sundaelib'` rather than `import '../../sundaelib`. The nodejs lookup process will check the current directory for `node_modules`, then the parent directory, then parent-of-the-parent directory, and so on.
