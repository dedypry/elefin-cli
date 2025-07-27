const { generateTemplate } = require("./template");

async function generateController(name, { isAuth, isResource }) {
  let tmpName = "no-auth";
  if (isAuth && isResource) {
    tmpName = "resource-auth";
  } else if (isAuth) {
    tmpName = "auth";
  } else if (isResource) {
    tmpName = "resource";
  } else {
    tmpName = "no-auth";
  }

  generateTemplate({
    name,
    templateName: tmpName,
    folder: "controllers",
    fileOutput: "controllers",
  });
}

module.exports = {
  generateController,
};
