import { readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join, relative } from "node:path";

const sourceRoot = process.argv[2];
const destination = process.argv[3];
if (!sourceRoot || !destination) throw new Error("Usage: node scripts/extract-wz4-operators.mjs <wz4-root> <output.js>");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".ops")) files.push(path);
  }
  return files;
}

function familyFor(output, module) {
  const value = `${output} ${module}`.toLowerCase();
  if (/wz4_audio/.test(module)) return "Audio Analysis";
  if (/wz4_anim|basic_ops/.test(module)) return "Animation & Control";
  if (/^(fr\d|chaosfx|easter|tron|kbfx|screens4|pdf)/.test(module)) return "Utility & Project FX";
  if (/bitmap|texture|cubemap/.test(value)) return "Bitmap & Texture";
  if (/mesh|skeleton|font/.test(value)) return "Mesh & Geometry";
  if (/particle|explosion|sph/.test(value)) return "Particles & Simulation";
  if (/mtrl|material|shader/.test(value)) return "Material & Shading";
  if (/render|rendertarget|camera|demo2|ipp/.test(value)) return "Scene & Render";
  if (/anim|spline|beat/.test(value)) return "Animation & Control";
  if (/audio/.test(value)) return "Audio Analysis";
  return "Utility & Project FX";
}

const operators = [];
for (const file of (await walk(sourceRoot)).sort()) {
  const text = await readFile(file, "utf8");
  const module = basename(file, ".ops");
  text.split(/\r?\n/).forEach((line, index) => {
    const match = line.match(/^\s*operator\s+(\S+)\s+([A-Za-z_][\w]*)(?:\s+"([^"]+)")?\s*\((.*)$/);
    if (!match) return;
    const [, output, symbol, alias, inputs] = match;
    operators.push({
      id: `${module}:${symbol}:${index + 1}`,
      name: alias || symbol.replaceAll("_", " "),
      symbol,
      output,
      inputs: inputs.replace(/\)\s*(?:\{|$).*/, "").trim(),
      family: familyFor(output, module),
      module,
      source: relative(sourceRoot, file),
      line: index + 1,
      runtime: "schema"
    });
  });
}

const header = `// Generated from Farbrausch fr_public/altona_wz4 .ops declarations.\n// Do not edit manually; regenerate with scripts/extract-wz4-operators.mjs.\n`;
await writeFile(destination, `${header}export const WZ4_OPERATORS = ${JSON.stringify(operators, null, 2)};\nexport const WZ4_OPERATOR_COUNT = ${operators.length};\n`);
console.log(`Extracted ${operators.length} Werkkzeug4 operators to ${destination}`);
