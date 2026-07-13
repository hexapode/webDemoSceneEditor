import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "dist");
const runtimeFiles = [
  "index.html",
  "styles.css",
  "overrides.css",
  "app.js",
  "exporter.js",
  "operator-manifest.js",
  "compat-runtime.js",
  "city-shader.js",
  "tutorials.js",
  "demos.js"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of runtimeFiles) {
  await copyFile(join(root, file), join(output, file));
}

const index = await readFile(join(output, "index.html"), "utf8");
const absoluteAsset = /(?:src|href)=["']\/(?!\/)/.exec(index);
if (absoluteAsset) {
  throw new Error(`GitHub Pages build contains a root-relative asset: ${absoluteAsset[0]}`);
}

await copyFile(join(output, "index.html"), join(output, "404.html"));
await writeFile(join(output, ".nojekyll"), "");

console.log(`GitHub Pages build ready: dist/ (${runtimeFiles.length + 2} files)`);
