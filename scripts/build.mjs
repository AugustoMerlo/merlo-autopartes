import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = new URL("../dist/", import.meta.url);
const outputImagesDirectory = new URL("../dist/fotos/", import.meta.url);

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputImagesDirectory, { recursive: true });

for (const file of ["index.html", "styles.css"]) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(`../dist/${file}`, import.meta.url));
}

for (const file of ["frente-local.jpeg", "interior-local.jpeg", "logo.jpg"]) {
  await cp(new URL(`../fotos/${file}`, import.meta.url), new URL(`../dist/fotos/${file}`, import.meta.url));
}
