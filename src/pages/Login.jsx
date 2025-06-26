import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Login inválido");
        return res.json();
      })
      .then(data => {
        localStorage.setItem("token", data.token);
        navigate("/admin-produtos");
      })
      .catch(() => setErro("Usuário ou senha incorretos"));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login do Administrador</h2>
        {erro && <p className="erro">{erro}</p>}
        <input name="username" placeholder="Usuário" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;