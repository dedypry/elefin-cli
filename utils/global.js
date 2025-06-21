const path = require("path");
const fs = require("fs");
function getPackageName(name) {
  try {
    const package = path.join(process.cwd(), "package.json");
    const pckg = JSON.parse(fs.readFileSync(package, "utf-8"));

    if(pckg.name === name){
        return true
    }

  } catch (error) {
    console.log("ERROR", error);
}
return false;
}

module.exports = {
  getPackageName,
};
