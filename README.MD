<p>
  <img src="https://elefin.id/images/logo.avif" width="100" alt="Elefin Logo">
</p>
# ⚡️ Elefin CLI

![version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![node](https://img.shields.io/badge/node-%3E=18.0.0-green.svg)
![license](https://img.shields.io/badge/license-MIT-yellow.svg)

> 🎉 Sebuah Command Line Interface (CLI) untuk mempercepat pembuatan **service**, **controller**, **middleware**, **model**, dan struktur aplikasi lainnya di proyek Elefin. Dirancang untuk efisiensi, konsistensi, dan kemudahan.

---

## 🛠️ Instalasi

```bash
npm install -g elefin-cli
```
---

## 🚀 Penggunaan Dasar
```bash
elefin [command] [options]
```

## 📜 Example Output
```bash
$ elefin create rumah90

? Folder "rumah90" already exists. Do you want to replace it? › (Y/n)
✔ Cloning project into rumah90...
✔ Installing dependencies (choose: pnpm / npm)...
✔ Copying .env.example → .env...
🎉 App is ready! Run the following:

cd rumah90
pnpm dev
```

## 📂 Project Structure
```bash
/rumah90
├── .env
├── package.json
├── pnpm-lock.yaml
├── src/
│   └── app.ts
└── ...
```

## 📦 Dependencies
```bash
Make sure you have the following packages available globally (or install during init):

inquirer

ora

simple-git

fs-extra (or fs)

chalk
```
