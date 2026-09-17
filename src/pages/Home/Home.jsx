import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* TOPO */}
      <header className="home-header">
        <h1 className="logo">
          <img src="/logo-boraia.png" alt="BoraIA-MA" className="logo-icon" />
          BoraIA‑MA
        </h1>

        <button className="btn-settings">Definições</button>
      </header>

      {/* SEÇÃO EM DESTAQUE */}
      <section className="section">
        <h2 className="section-title">BoraIA‑MA em destaque</h2>

        <div className="featured-grid">
          <div className="featured-card empty"></div>
          <div className="featured-card empty"></div>
          <div className="featured-card empty"></div>
          <div className="featured-card empty"></div>
        </div>
      </section>

      {/* SEÇÃO RECENTES */}
      <section className="section">
        <div className="recent-header">
          <h2 className="section-title">BoraIA‑MA recentes</h2>

          <select className="sort-select">
            <option>Mais recentes</option>
            <option>Mais antigos</option>
          </select>
        </div>

        <div className="recent-grid">

          {/* CARD CRIAR NOVO */}
          <div className="recent-card new" onClick={() => navigate("/nova-fonte")}>
            <div className="plus-icon">+</div>
            <p>Criar novo BoraIA‑MA</p>
          </div>

          {/* EXEMPLOS DE CARDS (você pode substituir depois) */}
          <div className="recent-card">
            <h3>Untitled BoraIA‑MA</h3>
            <p className="date">25/03/2026</p>
            <p className="origens">0 origens</p>
          </div>

          <div className="recent-card">
            <h3>Máquina de Turing Não Determinística</h3>
            <p className="date">23/04/2025</p>
            <p className="origens">1 origem</p>
          </div>

          <div className="recent-card">
            <h3>AI Search Methods</h3>
            <p className="date">01/04/2025</p>
            <p className="origens">1 origem</p>
          </div>

        </div>
      </section>

    </div>
  );
}