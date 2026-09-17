import React, { useState, useEffect, useRef } from "react";
import "./Perguntas.css";
import { useNavigate } from "react-router-dom";
import { perguntarIA, listarFontes } from "../../services/iaService";

export default function Perguntas() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [fontes, setFontes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listarFontes()
      .then((data) => {
        const lista = (data.fontes || []).map((nome, i) => ({
          id: i + 1,
          nome,
          selecionado: true,
        }));
        setFontes(lista);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const toggleFonte = (id) => {
    setFontes(fontes.map(f =>
      f.id === id ? { ...f, selecionado: !f.selecionado } : f
    ));
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim() || loading) return;

    const pergunta = mensagem;
    setChat(prev => [...prev, { tipo: "user", texto: pergunta }]);
    setMensagem("");
    setLoading(true);

    try {
      const data = await perguntarIA(pergunta, fontes);
      setChat(prev => [...prev, { tipo: "ia", texto: data.resposta }]);
    } catch {
      setChat(prev => [...prev, { tipo: "ia", texto: "Erro ao conectar com o backend. Verifique se a API está rodando." }]);
    }

    setLoading(false);
  };

  return (
    <div className="tela3-wrapper">

      {/* ÍCONES SUPERIORES */}
      <div className="tela3-top-icons">
        <img
          src="/icon-home.png"
          className="icon-btn"
          onClick={() => navigate("/")}
          alt="Home"
        />

        <img
          src="/icon-voltar.png"
          className="icon-btn"
          onClick={() => navigate(-1)}
          alt="Voltar"
        />
      </div>

      <div className="tela3-content">

        {/* COLUNA ESQUERDA — FONTES */}
        <div className="fontes-box">
          <div className="fontes-header">
            <h2 className="fontes-title">
              Fontes
            </h2>

            <button className="btn-add" onClick={() => navigate("/nova-fonte")}>
              + Adicionar fontes
            </button>
          </div>

          <div className="fontes-list">
            {fontes.length === 0 && (
              <p style={{ color: "#999", fontSize: 14 }}>
                Nenhuma fonte carregada. Adicione arquivos ou conecte um banco.
              </p>
            )}
            {fontes.map(f => (
              <label key={f.id} className="fonte-item">
                <input
                  type="checkbox"
                  checked={f.selecionado}
                  onChange={() => toggleFonte(f.id)}
                />
                {f.nome}
              </label>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA — CHAT */}
        <div className="chat-box">
          <h2 className="chat-title">Chat</h2>

          <div className="chat-area">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${msg.tipo === "user" ? "user" : "ia"}`}
              >
                {msg.texto}
              </div>
            ))}
            {loading && (
              <div className="chat-msg ia">Pensando...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT DO CHAT */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Comece a escrever..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
              disabled={loading}
            />

            <button className="btn-send" onClick={enviarMensagem} disabled={loading}>
              <img src="/icon-send.png" alt="Enviar" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
