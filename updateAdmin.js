import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

const dbFile = "./db.sqlite";

const atualizarSenhaAdmin = async () => {
  const db = await open({ filename: dbFile, driver: sqlite3.Database });

  const novaSenha = "admin123"; // escolha a nova senha desejada
  const senhaHash = await bcrypt.hash(novaSenha, 10);

  await db.run("UPDATE admins SET password = ? WHERE username = ?", [
    senhaHash,
    "admin",
  ]);

  console.log("Senha atualizada com sucesso para o usuário 'admin'");
  await db.close();
};

atualizarSenhaAdmin();
