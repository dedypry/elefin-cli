const { generateTemplate } = require("./template");
const pluralize = require("pluralize");

function migration(name, { isSeeder = false, isAlter } = {}) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

  const fileName = `${timestamp}_${isAlter ? "alter" : "create"}_${name}_table`;
  const tableName = pluralize.isPlural(name) ? name : pluralize.plural(name);

  if (isSeeder) {
    generateTemplate({
      name: tableName,
      templateName: "seed",
      folder: "seeds",
      fileOutput: `${name}_seeder`,
      folderOutput: "db/seeders",
      showFileExt: false,
    });
  } else {
    generateTemplate({
      name: tableName,
      templateName: isAlter ? "alter" : "migration",
      folder: "migrations",
      fileOutput: fileName,
      folderOutput: "db/migrations",
      showFileExt: false,
    });
  }
}

module.exports = {
  migration,
};
