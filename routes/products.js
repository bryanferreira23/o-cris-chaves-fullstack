import express from "express";

const router = express.Router();

// Listar produtos (rota protegida - usada em /api/produtos-admin)
router.get("/", async (req, res) => {
  const db = req.db;
  if (!db) return res.status(500).json({ error: "Banco de dados não disponível" });

  try {
    const produtos = await db.all("SELECT * FROM products");
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// Criar produto
router.post("/", async (req, res) => {
  const db = req.db;
  if (!db) return res.status(500).json({ error: "Banco de dados não disponível" });

  const { nome, descricao, imagem, preco } = req.body;
  try {
    const result = await db.run(
      "INSERT INTO products (nome, descricao, imagem, preco) VALUES (?, ?, ?, ?)",
      [nome, descricao, imagem, preco]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Atualizar produto
router.put("/:id", async (req, res) => {
  const db = req.db;
  if (!db) return res.status(500).json({ error: "Banco de dados não disponível" });

  const { nome, descricao, imagem, preco } = req.body;
  try {
    await db.run(
      "UPDATE products SET nome = ?, descricao = ?, imagem = ?, preco = ? WHERE id = ?",
      [nome, descricao, imagem, preco, req.params.id]
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

// Deletar produto
router.delete("/:id", async (req, res) => {
  const db = req.db;
  if (!db) return res.status(500).json({ error: "Banco de dados não disponível" });

  try {
    await db.run("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default router;