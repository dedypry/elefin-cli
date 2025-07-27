const path = require("path");
const fs = require("fs");
const { toPascalCase, toKebabPath } = require("../../utils/global");
const ejs = require("ejs");
const { default: inquirer } = require("inquirer");
const { generateTemplate } = require("./template");

async function generateInterceptor(name) {
  generateTemplate({
    name,
    templateName: "interceptor",
    folder: "interceptors",
    fileOutput: "interceptor",
  });
}

module.exports = {
  generateInterceptor,
};
