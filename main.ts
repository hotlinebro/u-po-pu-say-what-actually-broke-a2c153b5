import { mkdirSync, writeFileSync } from "node:fs";

// The line itself: a real failure from our own agent work. The only
// PXIO/USDT pool holds 6.65 USDT against 500,085,899 PXIO with zero
// active liquidity, and the quoter refuses to sell even 1 PXIO.
const line =
  "Swap failed: 500,085,899 PXIO against $6.65 of liquidity and zero buyers. The quoter will not sell a single token. Congratulations, you own all of it.";

// Self-check gate: the sealed scorer only accepts UTF-8 text of 1-200
// characters, not only whitespace, on a single line. Fail loudly here
// instead of writing output that would score Valid 0.
const chars = [...line].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, must be 1-200`);
}
if (line.includes("\n") || line.trim().length === 0) {
  throw new Error("line must be one non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
