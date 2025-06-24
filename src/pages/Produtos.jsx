import { useEffect, useState } from "react";
import "./style/Produtos.css";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  return (
    <div className="produtos-container">
      <h1 className="titulo">Nossos Produtos e Serviços</h1>
      <div className="grid-produtos">
        {produtos.map((produto, index) => {
          const mensagem = `Olá, gostaria de saber mais sobre o serviço: ${produto.nome}`;
          const linkWhatsApp = `https://api.whatsapp.com/send?phone=5551998063633&text=${encodeURIComponent(mensagem)}`;

          return (
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-produto"
              key={index}
            >
              <div className="card-produto">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="imagem-produto"
                />
                <div className="info-produto">
                  <h2>{produto.nome}</h2>
                  <p>{produto.descricao}</p>
                  <p className="preco-produto">R$ {parseFloat(produto.preco).toFixed(2)}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Produtos;