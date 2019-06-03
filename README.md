## Unbounce Static Hosting

This public repo contains the sources we wish to publish for use in Unbounce landing pages.

Public root is hosted at http://sundaehq.github.io/unbounce-static-hosting/

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

`postcss-loader` and `css-loader` parse each css file separately, which prevents `postcss-preset-env` from working correctly when using imports. For example, when importing custom properties defined in `theme.css` into another css file, `foo.css`, which uses those custom properties, `postcss-preset-env` doesn't correctly build the fallback css properties for older browsers. To solve this, we use `postcss-import` which includes all imported css files into a single file, then runs the other postcss plugins on that single large file.

`postcss-preset-env` has an `importFrom` plugin property which can be set. This is pretty inadequate - you have to know all of the files which will be imported and list them at the config level :shruggin-man:. Maybe this would work if it accepts globs, but is still accident prone and takes manual curation.

## Other Notes

### Nested `node_modules`

We use a nested `node_modules` directory to take advantage of the nodejs lookup scheme to avoid fragile relative lookups for shared libraries. For example, we can `import 'sundaelib'` rather than `import '../../sundaelib`. The nodejs lookup process will check the current directory for `node_modules`, then the parent directory, then parent-of-the-parent directory, and so on.
