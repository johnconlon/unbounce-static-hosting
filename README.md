## Unbounce Static Hosting

This public repo contains the sources we wish to publish for use in Unbounce landing pages.

Public root is hosted at http://sundaehq.github.io/unbounce-static-hosting/

## Building for production

The `build` command accepts a config name and will build just that configuration. This is useful for ensuring only the page/component you're working on is updated for production in `dist`.

For example:
```
# Will build only the msow timeline page.
yarn build pages-msow-timeline
```
The config names are generally the path to the relevant index.ts, with slashes converted to dashes e.g. the address confirmation page located at `src/pages/address-confirmation/a` would have the config name `pages-address-confirmation-a`. Similarly, the msow-timeline page at `src/pages/msow-timeline` would have the config name `pages-msow-timeline`.

### Building all pages
The `yarn build-all` command will build all pages.

## Naming convention

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

## Development process

In [package.json](./package.json), we have a dev dependency on http-server. So you can run

```javascript
yarn
npm start
```

and then access the root of dist at [http://localhost:8080/](). You can use this path in the script tag while developing the page in Unbounce.

## TODO

- Add automated unit test plan.
- Add cross-browser test plan.
- Add facility to develop locally based off of the Unbounce preview feature, while loading JS hosted in this repo.

## Build Notes

### CSS/PostCSS

This is a work in progress. For now, we use the `importFrom` property provided by the `postcss-preset-env` plugin to indicate where postcss globals are located. Worth noting that we still need to import that same css file in the `index.tsx` of every page :shrugging-man:.

TODO: Support different themes (e.g. seller, investor)

## Other Notes

### Nested `node_modules`

We use a nested `node_modules` directory to take advantage of the nodejs lookup scheme to avoid fragile relative lookups for shared libraries. For example, we can `import 'sundaelib'` rather than `import '../../sundaelib`. The nodejs lookup process will check the current directory for `node_modules`, then the parent directory, then parent-of-the-parent directory, and so on.
