#!/usr/bin/env node

const { default: inquirer } = require("inquirer");
const { showHelp } = require("./command/help");
const { getPackageName } = require("./utils/global");

var argv = require("./utils/minimlist")(process.argv.slice(2));
const { default: chalk } = require("chalk");
const { createPage } = require("./command/create/page");

const command = argv._[0];
const target = argv._[1];

(async () => {
  console.log("COMMAN", command);
  const package = getPackageName("elefin-buyer-client");

  if (!package) {
    console.error(
      chalk.red("❌ Harus dijalankan dari dalam project 'elefin-buyer-client'")
    );
    // process.exit(1);
  }

  if (!command) {
    showHelp();
  } else {
    if (command == "create:page") {
      let pageName = target;
      if (!pageName) {
        const answer = await inquirer.prompt([
          {
            type: "input",
            name: "pageName",
            message: "Enter the page name (e.g., customer/page-list):",
            validate: (input) => !!input || "Page name is required!",
          },
        ]);
        pageName = answer.pageName;
      }

      createPage(pageName);
    }
  }

  console.log("PC", package);
})();
