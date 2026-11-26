import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";
const MAX_ENTRY_CHARS = 200;

// The comment: a developer traced the checkout retry loop, proved the
// double-fire is load-bearing, and is emotionally done discussing it.
const ENTRY_TEXT =
  "Do not fix the retry loop. This whole checkout flow only works because it double-fires. I verified this. I no longer want to discuss it.";

// The gate counts characters, not lines: one line, 1 to 200 chars.
// Keep the limit as a named constant so the check and the error agree.
const GATE_MIN_CHARS = 1;

function validateEntry(text: string): void {
  if (text.length < GATE_MIN_CHARS || text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be ${GATE_MIN_CHARS} to ${MAX_ENTRY_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function writeEntry(text: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  // No trailing newline: the gate counts characters, and the entry is one line.
  writeFileSync(OUTPUT_DIR + "/" + OUTPUT_FILE, text);
}

function main(): void {
  validateEntry(ENTRY_TEXT);
  writeEntry(ENTRY_TEXT);
}

main();
