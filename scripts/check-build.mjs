import { access, readFile } from "node:fs/promises";

const outputDirectory = new URL("../dist/", import.meta.url);
const html = await readFile(new URL("index.html", outputDirectory), "utf8");
const references = [...html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)]
  .map(([, reference]) => reference)
  .filter((reference) => !/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(reference))
  .map((reference) => decodeURIComponent(reference.split(/[?#]/, 1)[0]));

for (const reference of references) {
  await access(new URL(reference, outputDirectory));
}

console.log(`Verified ${references.length} local site resources.`);
