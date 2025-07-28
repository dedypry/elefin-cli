#!/usr/bin/env node
const { Command } = require("commander");
const { default: inquirer } = require("inquirer");
const { generateController } = require("../command/create/controller");
const program = new Command();
const { generateTemplate } = require("../command/create/template");
const pkg = require("../package.json");
const { exec } = require("child_process");
const { migration } = require("../command/create/migration");
const { createApp } = require("../command/create/apps");
program
  .name("elefin")
  .description("Generate boilerplate code")
  .version(pkg.version);

program
  .command("create")
  .description("Generate new application")
  .argument("[name]", "Application name (folder will be created)")
  .action(async (name) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Application?",
          validate: (input) => (input ? true : "Application name is required."),
        },
      ]);
      name = answers.name;
    }
    createApp(name);
  });

program
  .command("service")
  .description("Generate a new service")
  .argument("[name]", "Name of the service")
  .action(async (name) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the service?",
          validate: (input) => (input ? true : "Service name is required."),
        },
      ]);
      name = answers.name;
    }
    generateTemplate({
      name,
      templateName: "service",
      folder: "services",
    });
  });

program
  .command("controller")
  .description("Generate a new controller")
  .argument("[name]", "Name of the controller")
  .option("--auth, -a", "Enable authentication")
  .option("-r, --resource", "Generate as resource controller")
  .action(async (name, options) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the controller?",
          validate: (input) => (input ? true : "Controller name is required."),
        },
      ]);
      name = answers.name;
    }

    const isAuth = options.auth === true;
    const isResource = options.resource === true;

    generateController(name, { isAuth, isResource });
  });

// guard
program
  .command("guard")
  .description("Generate a new Guard")
  .argument("[name]", "Name of the service")
  .action(async (name) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the guard?",
          validate: (input) => (input ? true : "Guard name is required."),
        },
      ]);
      name = answers.name;
    }
    generateTemplate({
      name,
      templateName: "guard",
      folder: "guards",
    });
  });

program
  .command("interceptor")
  .description("Generate a new Interceptor")
  .argument("[name]", "Name of the Interceptor")
  .action(async (name) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the interceptor?",
          validate: (input) => (input ? true : "Interceptor name is required."),
        },
      ]);
      name = answers.name;
    }
    generateTemplate({
      name,
      templateName: "interceptor",
      folder: "interceptors",
    });
  });
program
  .command("middleware")
  .description("Generate a new Middleware")
  .argument("[name]", "Name of the Middleware")
  .action(async (name) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Middleware?",
          validate: (input) => (input ? true : "Middleware name is required."),
        },
      ]);
      name = answers.name;
    }
    generateTemplate({
      name,
      templateName: "middleware",
      folder: "middlewares",
    });
  });
program
  .command("model")
  .description("Generate a new Model")
  .argument("[name]", "Name of the Model")
  .option("-m, --migration", "Only generate the migration file")
  .option(
    "-r, --resource",
    "Generate model file with resource structure (e.g., index, show, store, update, destroy)"
  )
  .option("-c, --controller", "Generate a controller file alongside the model")
  .action(async (name, option) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Model?",
          validate: (input) => (input ? true : "Model name is required."),
        },
      ]);
      name = answers.name;
    }
    generateTemplate({
      name,
      templateName: "model",
      folder: "models",
    });

    if (option.resource) {
      generateController(name, { isResource: true });
    } else if (option.controller && !option.resource) {
      generateController(name);
    }

    if (option.migration) {
      migration(name);
    }
  });

program
  .command("make:migration")
  .description("[Database] Generate a new Migration file")
  .argument("[name]", "Name of the Migration")
  .option(
    "-a, --alter",
    "Allow modifying an existing seeder file if it already exists"
  )
  .action(async (name, options) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Migration?",
          validate: (input) => (input ? true : "Migration name is required."),
        },
      ]);
      name = answers.name;
    }

    migration(name, {
      isAlter: options.alter === true,
    });
  });

program
  .command("make:seed")
  .description("[Seeder] Generate a new Seeder file")
  .argument("[name]", "Name of the Seeder")
  .action(async (name) => {
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Seeder?",
          validate: (input) => (input ? true : "Seeder name is required."),
        },
      ]);
      name = answers.name;
    }
    migration(name, {
      isSeeder: true,
    });
  });

program
  .command("run:migration")
  .description(
    "Run all pending Knex migrations (same as `npx knex migrate:latest`)"
  )
  .argument("[name]", "Optional name of specific migration (not used here)")
  .action(async (name) => {
    exec("npx knex migrate:latest", (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Migration failed: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`⚠️  stderr: ${stderr}`);
      }
      console.log(`✅ Migration output:\n${stdout}`);
    });
  });

program
  .command("run:seeder")
  .description("Run all Knex seed files (same as `npx knex seed:run`)")
  .argument("[name]", "Optional name of specific seed file (currently unused)")
  .action(async (name) => {
    exec("npx knex seed:run", (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Seeding failed: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`⚠️  stderr: ${stderr}`);
      }
      console.log(`✅ Seeder output:\n${stdout}`);
    });
  });

program.parse(process.argv);
