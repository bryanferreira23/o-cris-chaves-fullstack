import { Routes, Route, Link, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import AdminProdutos from "./pages/AdminProdutos";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <header>
        <h1>O Cris Chaves</h1>
      </header>
      <nav>
        <Link to="/">Tela Inicial</Link>
        <Link to="/home">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-produtos" element={<ProtectedRoute><AdminProdutos /></ProtectedRoute>} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 1995 O Cris Chaves — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
