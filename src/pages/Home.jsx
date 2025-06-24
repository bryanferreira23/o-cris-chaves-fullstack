import { useState } from "react";
import "./style/Home.css";
import { Link } from "react-router-dom";


const Home = () => {
  const imagens = ["foto1.webp", "foto2.webp", "foto3.webp", "foto4.webp"];
  const [imagemIndex, setImagemIndex] = useState(null);

  const abrirImagem = (index) => setImagemIndex(index);
  const fecharImagem = () => setImagemIndex(null);
  const imagemAnterior = () =>
    setImagemIndex((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  const proximaImagem = () =>
    setImagemIndex((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));

  return (
    <div className="home">
      {/* Seções lado a lado */}
      <div className="services-local-container">
        <section className="services">
          <h2>Serviços</h2>
          <div className="service-cards">
            <Link to="/produtos" className="service-card-link">
              <div className="service-card">
                <h3>Cópias de Chaves, Controles e Tags</h3>
              </div>
            </Link>
            <Link to="/produtos" className="service-card-link">
              <div className="service-card">
                <h3>Aberturas, Instalações e Manutenções de Fechaduras</h3>
              </div>
            </Link>
          </div>
          {/* Google Maps incorporado */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1731.7975289028868!2d-50.01772646150211!3d-29.7604305653165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95228276b018548d%3A0xddfd4247f2390a83!2sO%20Cris%20Chaves%20-%20Tele%20Chaveiro!5e0!3m2!1spt-BR!2sbr!4v1748920869374!5m2!1spt-BR!2sbr"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Loja"
            ></iframe>
          </div>
        </section>

        <section className="local">
          <h2>Venha nos Visitar</h2>
          <div className="photo-carousel">
            {imagens.map((img, index) => (
              <img
                key={index}
                src={`/images/${img}`}
                alt={`Foto ${index + 1}`}
                onClick={() => abrirImagem(index)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Contato */}
      <section className="contact">
        <h2>Fale Conosco</h2>
        <p>Disponíveis 24 horas para emergências em Capão da Canoa.</p>
        <div className="contact-buttons">
          <a href="tel:+5551998063633" className="btn call">Ligar</a>
          <a href="https://wa.me/5551998063633" className="btn whatsapp">WhatsApp</a>
        </div>
      </section>

      {/* Modal */}
      {imagemIndex !== null && (
        <div className="modal" onClick={fecharImagem}>
          <span className="close" onClick={fecharImagem}>&times;</span>
          <span className="arrow left" onClick={(e) => { e.stopPropagation(); imagemAnterior(); }}>&#10094;</span>
          <img
            className="modal-content"
            src={`/images/${imagens[imagemIndex]}`}
            alt="Visualização"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="arrow right" onClick={(e) => { e.stopPropagation(); proximaImagem(); }}>&#10095;</span>
        </div>
      )}
    </div>
  );
};

export default Home;
