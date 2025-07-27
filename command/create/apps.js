const degit = require("degit");
const path = require("path");
const fs = require("fs");
const ora = require("ora").default;
const { default: inquirer } = require("inquirer");
const { execSync } = require("child_process");

async function createApp(name) {
  if (!name || typeof name !== "string") {
    console.error("❌ Please provide a valid name for your application.");
    process.exit(1);
  }

  const appName = name.toLowerCase();
  const targetDir = path.resolve(process.cwd(), appName);

  if (fs.existsSync(targetDir)) {
    const { replace } = await inquirer.prompt([
      {
        type: "confirm",
        name: "replace",
        message: `⚠️ Folder "${appName}" already exists. Do you want to replace it?`,
        default: false,
      },
    ]);

    if (!replace) {
      console.log("❌ Operation cancelled.");
      process.exit(1);
    }

    console.log(`⚠️  Folder "${appName}" already exists. Deleting...`);
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log(`🧹 Folder "${appName}" has been deleted.`);
  }

  const emitter = degit("dedypry/template-be", {
    cache: false,
    force: true,
    verbose: true,
  });

  const spinner = ora(`🚀 Cloning template to '${appName}'...`).start();

  try {
    await emitter.clone(targetDir);
    spinner.succeed("Template cloned successfully!");
  } catch (err) {
    spinner.fail("❌ Failed to clone the repository.");
    console.error(err.message);
    process.exit(1);
  }

  // Update package.json name (if exists)
  const pkgPath = path.join(targetDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      pkg.name = appName;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      console.log("📦 package.json updated with new project name.");
    } catch (err) {
      console.warn("⚠️ Failed to update package.json:", err.message);
    }
  }

  console.log(`🎉 App '${appName}' created successfully!`);
  process.chdir(targetDir);
  const lockFile = path.join(process.cwd(), "pnpm-lock.yaml");
  if (fs.existsSync(lockFile)) {
    fs.rmSync(lockFile);
  }

  // Copy .env.example to .env if exists
  const envExamplePath = path.join(targetDir, ".env.example");
  const envPath = path.join(targetDir, ".env");

  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
  }

  const { packageManager } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Choose a package manager to install dependencies:",
      choices: ["npm", "pnpm"],
    },
  ]);

  const installSpinner = ora(
    `Installing dependencies using ${packageManager}...`
  ).start();
  execSync(`${packageManager} install`, { stdio: "inherit" });
  installSpinner.succeed("Dependencies installed successfully!");

  console.log(`\n✅ App '${name}' created and ready to go!\n`);
  console.log(`👉 cd ${name}`);
  console.log(`👉 ${packageManager} run dev`);
}

module.exports = {
  createApp,
};
