const path = require("path");
const fs = require("fs");
const { toPascalCase, toKebabPath } = require("../../utils/global");
const ejs = require("ejs");
const { default: inquirer } = require("inquirer");

async function generateTemplate({
  name,
  templateName,
  folder = null,
  fileOutput = null,
  folderOutput = null,
  showFileExt = true,
}) {
  const parts = name.split("/");
  const rawFileName = parts
    .pop()
    .replace(new RegExp(`[-_]?${fileOutput || folder}$`, "i"), "");
  const componentName = toPascalCase(rawFileName);

  const templatePath = path.resolve(
    __dirname,
    `../../template/${folder}/${templateName}.ejs`
  );

  const fileExt = showFileExt
    ? `.${(fileOutput || templateName).toLowerCase()}`
    : "";

  const fileComponentName = showFileExt ? componentName : fileOutput;
  const outputPath = path.join(
    process.cwd(),
    `${folderOutput || "src/" + folder}/${fileComponentName}${fileExt}.ts`
  );

  if (fs.existsSync(outputPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `File ${outputPath} already exists. Do you want to overwrite it?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log("❌ Operation cancelled.");
      return;
    }
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const rendered = ejs.render(template, {
    name: componentName,
    toKebabPath,
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, rendered);

  console.log(
    `✅ ${toKebabPath(folder)} "${componentName}" generated at: ${outputPath}`
  );
}

module.exports = {
  generateTemplate,
};
