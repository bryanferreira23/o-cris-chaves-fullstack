import { Link } from "react-router-dom";
import "./style/Inicio.css";

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1>Bem-vindo ao O Cris Chaves</h1>
      <div className="botoes">
        <Link to="/home" className="btn-cliente">Entrar como Cliente</Link>
        <Link to="/login" className="btn-admin">Entrar como Administrador</Link>
      </div>
    </div>
  );
};

export default Inicio;
