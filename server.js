import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/products.js";
import autenticarToken from "./middleware/autenticarToken.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET || "chave_secreta_bem_segura";

// 👉 Caminho do banco ajustado para Render Disks ou "./db.sqlite" local
const DB_PATH = process.env.DB_PATH || "./db.sqlite";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

let db;

(async () => {
  try {
    db = await open({ filename: DB_PATH, driver: sqlite3.Database });

    await db.run(`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      descricao TEXT,
      imagem TEXT,
      preco REAL
    )`);

    console.log(`📦 Banco de dados pronto em ${DB_PATH}`);

    // Rota de login com JWT
    app.post("/api/login", async (req, res) => {
      const { username, password } = req.body;

      try {
        const user = await db.get("SELECT * FROM admins WHERE username = ?", [username]);
        if (!user) return res.status(401).send("Usuário não encontrado");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send("Senha incorreta");

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "2h" });
        res.json({ token });
      } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).send("Erro interno");
      }
    });

    // Middleware para injetar o banco no req
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // 🔓 Rota pública para listar produtos
    app.get("/api/products", async (req, res) => {
      try {
        const produtos = await db.all("SELECT * FROM products");
        res.json(produtos);
      } catch (err) {
        res.status(500).json({ error: "Erro ao carregar produtos" });
      }
    });

    // 🔒 Rotas protegidas de CRUD
    app.use("/api/produtos-admin", autenticarToken, productRoutes);

    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });

    // Inicia o servidor só depois que o banco está pronto
    app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Erro ao inicializar o banco:", err);
    process.exit(1);
  }
})();