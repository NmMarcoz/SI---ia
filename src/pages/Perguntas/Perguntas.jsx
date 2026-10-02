import React, { useState, useEffect, useRef } from "react";
import "./Perguntas.css";
import { useNavigate } from "react-router-dom";
import { perguntarIA, listarFontes } from "../../services/iaService";
import Logo from "../../components/Logo";

export default function Perguntas() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const timerRef = useRef(null);

  const [fontes, setFontes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [expandedThinking, setExpandedThinking] = useState({});

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

  useEffect(() => {
    if (loading) {
      setElapsed(0);
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 0.1);
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [loading]);

  const toggleFonte = (id) => {
    setFontes(fontes.map(f =>
      f.id === id ? { ...f, selecionado: !f.selecionado } : f
    ));
  };

  const toggleThinking = (index) => {
    setExpandedThinking((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim() || loading) return;

    const pergunta = mensagem;
    setChat(prev => [...prev, { tipo: "user", texto: pergunta }]);
    setMensagem("");
    setLoading(true);

    try {
      const data = await perguntarIA(pergunta, fontes);
      setChat(prev => [...prev, {
        tipo: "ia",
        texto: data.resposta,
        raciocinio: data.raciocinio || "",
        tempo: data.tempo || 0,
      }]);
    } catch {
      setChat(prev => [...prev, { tipo: "ia", texto: "Erro ao conectar com o backend.", raciocinio: "", tempo: 0 }]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-page">
      <nav className="chat-page__nav">
        <div className="chat-page__nav-left">
          <button className="chat-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <Logo size="sm" onClick={() => navigate("/")} />
        </div>
        <button className="chat-page__add-fonte" onClick={() => navigate("/nova-fonte")}>
          + Adicionar fontes
        </button>
      </nav>

      <div className="chat-page__layout">
        <aside className="chat-page__sidebar">
          <h3 className="chat-page__sidebar-title">Fontes</h3>
          <div className="chat-page__sources">
            {fontes.length === 0 && (
              <p className="chat-page__empty">Nenhuma fonte carregada.</p>
            )}
            {fontes.map(f => (
              <label key={f.id} className="chat-page__source">
                <input
                  type="checkbox"
                  checked={f.selecionado}
                  onChange={() => toggleFonte(f.id)}
                />
                <span className="chat-page__source-name">{f.nome}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="chat-page__main">
          <div className="chat-page__messages">
            {chat.length === 0 && !loading && (
              <div className="chat-page__placeholder">
                <Logo size="lg" />
                <p>Faca uma pergunta sobre seus dados</p>
              </div>
            )}
            {chat.map((msg, index) => (
              <div key={index} className={`chat-page__msg chat-page__msg--${msg.tipo}`}>
                <div className="chat-page__msg-avatar">
                  {msg.tipo === "user" ? "Eu" : "IA"}
                </div>
                <div className="chat-page__msg-content">
                  {msg.tipo === "ia" && msg.raciocinio && (
                    <div className="chat-page__thinking">
                      <button
                        className="chat-page__thinking-toggle"
                        onClick={() => toggleThinking(index)}
                      >
                        <svg
                          className={`chat-page__thinking-arrow ${expandedThinking[index] ? "chat-page__thinking-arrow--open" : ""}`}
                          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        Raciocinio
                      </button>
                      {expandedThinking[index] && (
                        <div className="chat-page__thinking-content">
                          {msg.raciocinio}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="chat-page__msg-text">{msg.texto}</div>
                  {msg.tipo === "ia" && msg.tempo > 0 && (
                    <span className="chat-page__msg-time">{msg.tempo}s</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-page__msg chat-page__msg--ia">
                <div className="chat-page__msg-avatar">IA</div>
                <div className="chat-page__msg-content">
                  <div className="chat-page__msg-text chat-page__msg-text--loading">
                    <span className="chat-page__dot"></span>
                    <span className="chat-page__dot"></span>
                    <span className="chat-page__dot"></span>
                    <span className="chat-page__timer">{elapsed.toFixed(1)}s</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-page__input-area">
            <input
              type="text"
              className="chat-page__input"
              placeholder="Escreva sua pergunta..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
              disabled={loading}
            />
            <button className="chat-page__send" onClick={enviarMensagem} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
