# 🎨 Frontend – Vite + React

This is the frontend project of a fullstack application built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/). It connects to a Go Fiber backend for API calls.

---

## 📦 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) – for HTTP requests
- [React Router](https://reactrouter.com/) – (optional if routing is used)

---

## ขั้นตอนการติดตั้ง
1. **Clone โปรเจกต์จาก GitHub**

   ```bash
   git clone https://github.com/elephz/todo-list-movies.git
   cd todo-list-movies
   ```

2. **ติดตั้ง dependencies**

   ```bash
   npm install
   ```

3. **แก้ไขไฟล์ `.env`**

   ```bash
   VITE_API_KEY=`XXX`
   ```

34. **รัน serve**
   ```bash
   npm run dev
   ```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
