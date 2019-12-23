#!/usr/bin/env node
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const util = require("util");
const globby = require('globby');
const pascalCase = require("pascalcase");

const getComponentName = name => {
    return pascalCase(name)
};

const rootDir = path.join(__dirname, "..");
const svgDir = path.join(rootDir, "./svg");

const iconsDir = path.join(rootDir, "./src/icons");
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// RUN
(async () => {
    let icons = {};
    let indexContent = "";

    try {
        const files = await globby(`${svgDir}/*.svg`);
        await Promise.all(files.map(async function (file) {
            let content = await fsp.readFile(file, 'utf-8')
            const svgInner = content.match(/<p(ath|olygon) [^>]+>/)[0];
            let name = path.basename(file, '.svg');
            icons[name] = svgInner;
        }));

        await Promise.all(Object.keys(icons).map(async function (name) {
            const str = icons[name];
            const componentName = getComponentName(name);
            indexContent += `export { default as ${componentName}Icon } from './icons/${componentName}.svelte';\n`;
            const componentContent = `<svelte:options tag="${name}-icon"/>\n
<script>
  export let color = 'currentColor';
  export let size = 24;
  let className = '';
  export { className as class };
</script>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  class={className}
  fill={color}
  width="{size}"
  height="{size}"
  >
  ${str}
</svg>`;
            await fsp.writeFile(path.join(iconsDir, componentName + ".svelte"), componentContent);
        }));
    } catch (error) {
        console.error(error);
    }

    try {
        await fsp.writeFile(path.join(rootDir, "src/index.js"), indexContent);
    } catch (error) {
        console.error(error);
    }
})();
