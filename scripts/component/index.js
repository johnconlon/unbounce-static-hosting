#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const COMPONENT_TEMPLATE = path.resolve(__dirname, "component.tsx.template");
const CSS_TEMPLATE = path.resolve(__dirname, "component.css.template");

// Ensure the template files exist
if (!fs.existsSync(COMPONENT_TEMPLATE) || !fs.existsSync(CSS_TEMPLATE)) {
  console.error("Missing template files");
  process.exit(1);
}

const name = process.argv[2];
if (!name) {
  console.error("Missing the name of the component to generate");
  process.exit(1);
}

const componentTemplate = fs.readFileSync(COMPONENT_TEMPLATE, "utf8");
const componentResult = render(name, componentTemplate);
fs.writeFileSync(
  path.resolve(process.env.INIT_CWD, `${name}.tsx`),
  componentResult
);

const cssTemplate = fs.readFileSync(CSS_TEMPLATE, "utf8");
const cssResult = render(name, cssTemplate);
fs.writeFileSync(path.resolve(process.env.INIT_CWD, `${name}.css`), cssResult);

function render(componentName, template) {
  return template.replace(/COMPONENT_NAME/g, componentName);
}
