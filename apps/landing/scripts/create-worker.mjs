import { mkdir, rm, writeFile } from "node:fs/promises";

await rm(new URL("../dist/videos/", import.meta.url), { recursive: true, force: true });
await mkdir(new URL("../dist/server/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../dist/server/index.js", import.meta.url),
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};\n`,
);
