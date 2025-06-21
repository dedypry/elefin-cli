const chalk = require("chalk").default;
const boxen = require("boxen").default;

const info = chalk.cyan("ℹ");
const green = chalk.green;
const gray = chalk.gray;

const helpText = `
${chalk.bold.cyan("Elefin CLI – Command List")}

${chalk.bold("Usage:")}
  elefin <command> [options]

${chalk.bold("Available Commands:")}
  ${info} ${green("create:page")}       ${gray("– Generate a new page file in `pages/`")}
  ${info} ${green("create:route")}      ${gray("– Create a route handler file")}
  ${info} ${green("create:component")}  ${gray("– Scaffold a reusable component")}
  ${info} ${green("create:layout")}     ${gray("– Scaffold a layout file (wrapper)")}

${chalk.bold("Examples:")}
  $ elefin create:page home
  $ elefin create:page customer/index
  $ elefin create:component Button --type ui
  $ elefin create:layout MainLayout

${chalk.bold("Options:")}
  ${chalk.yellow("--page")}       Set the page name
  ${chalk.yellow("--lang")}       Language option (e.g., en, id)
  ${chalk.yellow("--type")}       Type of component (e.g., private, public, ui)
  ${chalk.yellow("--force")}      Force overwrite existing file
`;

function showHelp() {
  const box = boxen(helpText, {
    padding: 2,
    borderColor: "cyan",
    margin: 1,
    borderStyle: "round",
  });
  console.log(box);
}

module.exports = {
  showHelp,
};
