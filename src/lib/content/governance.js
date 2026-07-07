import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export function loadGovernance(id) {
  const file = path.resolve(`content/governance/${id}.yaml`);
  const data = yaml.load(fs.readFileSync(file, "utf8"));
  return data.governance;
}
