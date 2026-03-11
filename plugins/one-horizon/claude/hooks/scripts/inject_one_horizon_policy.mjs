import fs from "node:fs";

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function getPromptText(payload) {
  if (!payload) return "";
  if (typeof payload.prompt === "string") return payload.prompt;
  if (typeof payload.user_prompt === "string") return payload.user_prompt;
  if (typeof payload.input === "string") return payload.input;
  return "";
}

function isOneHorizonRelevant(text) {
  if (!text) return false;
  const re =
    /\b(one\s*horizon|initiative|initiatives|bug|bugs|feature request|todo|planned work|blocker|standup|work recap|implement|fix|ship|write back)\b/i;
  return re.test(text);
}

function main() {
  let payload = {};
  try {
    payload = JSON.parse(readStdin() || "{}");
  } catch {
    payload = {};
  }

  const promptText = getPromptText(payload);
  if (!isOneHorizonRelevant(promptText)) return;

  const additionalContext = [
    "OH rules:",
    "1) list+details -> implement.",
    "2) done chunk -> write-back now (`update-bug`/`update-todo`/`update-initiative` or completed `create-todo`).",
    "3) delivered work -> append `## Changes`: `What changed` + `Why`.",
    "4) req initiative links -> apply before final.",
    "5) plan mode -> include: discover, details, implement, validate, write-back, link."
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext
      }
    })
  );
}

main();
