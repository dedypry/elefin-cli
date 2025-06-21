const fs = require("fs");
const path = require("path");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
  return str.split(/[-_]/).map(capitalize).join("");
}

module.exports = {
  createPage: (pageName) => {
    if (!pageName) {
      console.error("❌ Page name is required!");
      process.exit(1);
    }

    const pagesDir = path.join(process.cwd(), "src/pages");

    // Pisahkan path dan nama file
    const parts = pageName.split("/");
    const rawFileName = parts.pop().replace(/[-_]?page$/i, '');
    const folderPath = path.join(pagesDir, ...parts);

    const componentName = toPascalCase(rawFileName) + "Page";
    const filePath = path.join(folderPath, `${componentName}.tsx`);

    // Buat folder jika belum ada
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📁 Folder created: ${folderPath}`);
    }

    // Cegah overwrite jika file sudah ada
    if (fs.existsSync(filePath)) {
      console.log(`❌ File already exists: ${filePath}`);
      return;
    }

    const content = `import React from 'react';

export default function ${componentName}(){
    return <div>${componentName} page</div>;
};`;

    fs.writeFileSync(filePath, content);
    console.log(`✅ Page created: ${filePath}`);
  },
};
