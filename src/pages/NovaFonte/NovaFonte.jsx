import React, { useRef, useState } from "react";
import "./NovaFonte.css";
import { useNavigate } from "react-router-dom";
import { uploadArquivo } from "../../services/iaService";

export default function NovaFonte() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const processarArquivos = async (files) => {
    setUploading(true);

    for (const file of files) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (ext !== "pdf" && ext !== "xlsx") {
        alert(`Formato não suportado: ${file.name}. Use PDF ou XLSX.`);
        continue;
      }

      try {
        const result = await uploadArquivo(file);
        if (result.error) {
          alert(`Erro ao processar ${file.name}: ${result.error}`);
        }
      } catch {
        alert(`Erro de conexão ao enviar ${file.name}. O backend está rodando?`);
      }
    }

    setUploading(false);
    navigate("/perguntas");
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      processarArquivos(Array.from(e.target.files));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      processarArquivos(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="fonte-wrapper">

      {/* ÍCONE HOME */}
      <div className="home-icon-area">
        <img
          src="/icon-home.png"
          alt="Home"
          className="home-icon"
          onClick={() => navigate("/")}
        />
      </div>

      <h1 className="fonte-title">
        Crie resumos a partir dos seus arquivos ou conectando a bancos de dados
      </h1>

      {/* ÁREA DE UPLOAD */}
      <div
        className={`upload-area ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <p className="upload-text">
          {uploading
            ? "Processando arquivos..."
            : "Arraste e solte aqui seus ficheiros .PDF ou .XLSX"}
        </p>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".pdf,.xlsx"
          multiple
          onChange={handleFileSelect}
        />

        <button
          className="btn-primary"
          disabled={uploading}
          onClick={() => fileInputRef.current.click()}
        >
          {uploading ? "Enviando..." : "Carregar Arquivos"}
        </button>
      </div>

      {/* BOTÕES DE CONEXÃO */}
      <div className="db-buttons">

        <button
          className="btn-db mongo"
          onClick={() => navigate("/conectar-mongo")}
        >
          Conectar ao MongoDB
        </button>

        <button
          className="btn-db mysql"
          onClick={() => navigate("/conectar-mysql")}
        >
          Conectar ao MySQL
        </button>

      </div>
    </div>
  );
}
