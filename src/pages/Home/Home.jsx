import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__center">
        <Logo size="lg" />
        <p className="home__tagline">Chat com IA sobre seus dados</p>
        <button className="home__start" onClick={() => navigate("/nova-fonte")}>
          Novo projeto
        </button>
      </div>
    </div>
  );
}
