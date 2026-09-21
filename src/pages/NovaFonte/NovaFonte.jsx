import React, { useRef, useState } from "react";
import "./NovaFonte.css";
import { useNavigate } from "react-router-dom";
import { uploadArquivo } from "../../services/iaService";
import Logo from "../../components/Logo";

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
    <div className="fonte">
      <nav className="fonte__nav">
        <button className="fonte__back" onClick={() => navigate("/")} aria-label="Voltar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <Logo size="sm" onClick={() => navigate("/")} />
      </nav>

      <div className="fonte__content">
        <h1 className="fonte__title">Adicionar fontes</h1>
        <p className="fonte__subtitle">
          Envie arquivos PDF ou XLSX, ou conecte a um banco de dados
        </p>

        <div
          className={`fonte__upload ${dragOver ? "fonte__upload--active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <svg className="fonte__upload-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>

          <p className="fonte__upload-text">
            {uploading
              ? "Processando arquivos..."
              : "Arraste e solte seus arquivos aqui"}
          </p>
          <p className="fonte__upload-hint">PDF ou XLSX</p>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".pdf,.xlsx"
            multiple
            onChange={handleFileSelect}
          />

          <button
            className="fonte__upload-btn"
            disabled={uploading}
            onClick={() => fileInputRef.current.click()}
          >
            {uploading ? "Enviando..." : "Escolher arquivos"}
          </button>
        </div>

        <div className="fonte__divider">
          <span>ou conecte a um banco</span>
        </div>

        <div className="fonte__db-buttons">
          <button
            className="fonte__db-btn fonte__db-btn--mongo"
            onClick={() => navigate("/conectar-mongo")}
          >
            MongoDB
          </button>
          <button
            className="fonte__db-btn fonte__db-btn--mysql"
            onClick={() => navigate("/conectar-mysql")}
          >
            MySQL
          </button>
        </div>
      </div>
    </div>
  );
}
