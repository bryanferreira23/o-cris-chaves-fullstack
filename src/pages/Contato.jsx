import "./style/Contato.css";

const Contato = () => {
  return (
    <div className="contato-container">
      <h1 className="titulo-contato">Fale Conosco</h1>
      <p className="descricao-contato">
        Estamos disponíveis para atendê-lo sempre que precisar!
      </p>
      <div className="botoes-contato">
        <a href="tel:+5551998063633" className="botao botao-ligar">
          📞 Ligar
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5551998063633&text=Olá!%20Gostaria%20de%20falar%20com%20vocês."
          target="_blank"
          rel="noopener noreferrer"
          className="botao botao-whatsapp"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contato;
