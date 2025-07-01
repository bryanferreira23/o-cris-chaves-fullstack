import { useEffect, useState } from "react";
import "./style/AdminProdutos.css";

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    imagem: "/images/produtos/chave-yale.png",
    preco: "0.00",
  });
  const [editandoId, setEditandoId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = () => {
    fetch("/api/produtos-admin", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        return res.json();
      })
      .then(setProdutos)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const metodo = editandoId ? "PUT" : "POST";
    const url = editandoId
      ? `/api/produtos-admin/${editandoId}`
      : "/api/produtos-admin";

    fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar produto");
        buscarProdutos();
        setForm({
          nome: "",
          descricao: "",
          imagem: "/images/produtos/chave-yale.png",
          preco: "0.00",
        });
        setEditandoId(null);
      })
      .catch((err) => console.error("Erro ao salvar produto:", err));
  };

  const handleEditar = (produto) => {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      imagem: produto.imagem,
      preco: produto.preco,
    });
    setEditandoId(produto.id);
  };

  const handleExcluir = (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      fetch(`/api/produtos-admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erro ao excluir produto (status ${res.status})`);
          }
          buscarProdutos();
        })
        .catch((err) => console.error("Erro ao excluir produto:", err));
    }
  };

  const imagensDisponiveis = [
    "/images/produtos/chave-yale.png",
    "/images/produtos/controle-comum.png",
    "/images/produtos/tag.png",
    "/images/produtos/fechadura-tetra-stam-1004.png",
    "/images/produtos/fechadura-digital-fr101.png",
    "/images/produtos/fechadura-colonial-stam-cx55.png",
    "/images/produtos/instalacoes-manutencoes.png",
    "/images/produtos/chave-tetra.png",
  ];

  return (
    <div className="admin-container">
      <h2>Administração de Produtos</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="nome"
          placeholder="Nome do produto"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <select
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
          required
        >
          {imagensDisponiveis.map((img, idx) => (
            <option key={idx} value={img}>
              {img.split("/").pop().replace(".png", "")}
            </option>
          ))}
        </select>
        <input
          name="preco"
          type="number"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          step="0.01"
          required
        />
        <button type="submit">
          {editandoId ? "Atualizar Produto" : "Adicionar Produto"}
        </button>
      </form>

      <h3>Lista de Produtos</h3>

      {produtos.map((p) => (
        <div key={p.id} className="produto-item">
          <img src={p.imagem} alt={p.nome} />
          <div className="produto-info">
            <strong>{p.nome}</strong>
            <p>{p.descricao}</p>
            <p>Preço: R$ {parseFloat(p.preco).toFixed(2)}</p>
          </div>
          <div className="produto-actions">
            <button onClick={() => handleEditar(p)} className="editar">
              Editar
            </button>
            <button onClick={() => handleExcluir(p.id)} className="excluir">
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProdutos;