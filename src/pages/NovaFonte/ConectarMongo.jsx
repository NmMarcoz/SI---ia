import React, { useState } from "react";
import "./ConectarDB.css";
import { useNavigate } from "react-router-dom";
import { conectarMongo } from "../../services/iaService";

export default function ConectarMongo() {
  const navigate = useNavigate();
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [database, setDatabase] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConectar = async () => {
    if (!host || !database) {
      alert("Preencha pelo menos Host e Database.");
      return;
    }

    setLoading(true);
    try {
      const result = await conectarMongo(host, user, senha, database);
      if (result.error) {
        alert(`Erro: ${result.error}`);
      } else {
        alert(result.message);
        navigate("/perguntas");
      }
    } catch {
      alert("Erro de conexão. O backend está rodando?");
    }
    setLoading(false);
  };

  return (
    <div className="db-wrapper">
      <button className="db-back" onClick={() => navigate(-1)}>&larr; Voltar</button>
      <h1>Conectar ao MongoDB</h1>

      <input placeholder="Host" value={host} onChange={e => setHost(e.target.value)} />
      <input placeholder="Usuário" value={user} onChange={e => setUser(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <input placeholder="Database" value={database} onChange={e => setDatabase(e.target.value)} />

      <button className="btn-primary" disabled={loading} onClick={handleConectar}>
        {loading ? "Conectando..." : "Conectar"}
      </button>
    </div>
  );
}
