const path = require("path");
const fs = require("fs");
function getPackageName(name) {
  try {
    const package = path.join(process.cwd(), "package.json");
    const pckg = JSON.parse(fs.readFileSync(package, "utf-8"));

    if (pckg.name === name) {
      return true;
    }
  } catch (error) {
    console.log("ERROR", error);
  }
  return false;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
  return str.split(/[-_]/).map(capitalize).join("");
}

function toKebabPath(name) {
  return name.replace(/([a-z])([A-Z])/g, "$1/$2").toLowerCase();
}

module.exports = {
  getPackageName,
  toPascalCase,
  toKebabPath,
};
