# BoraIA-MA

Sistema de Chat com Inteligencia Artificial que permite ao usuario criar bases de conhecimento a partir de diferentes fontes de dados (PDF, XLSX, MySQL, MongoDB) e interagir com elas por meio de perguntas em linguagem natural.

A IA processa os documentos, indexa o conteudo em um banco vetorial e utiliza um modelo de linguagem local (LLM) para gerar respostas contextualizadas via RAG (Retrieval-Augmented Generation).

## Tecnologias Utilizadas

### Frontend
- **React 19** com React Router v7
- **Material UI** (MUI)
- **JavaScript (ES6+)**

### Backend
- **Python 3** com **FastAPI**
- **PyTorch** com aceleracao MPS (Apple Silicon) / CPU
- **HuggingFace Transformers** — modelo Qwen2.5-1.5B-Instruct
- **Sentence-Transformers** — embeddings all-MiniLM-L6-v2
- **ChromaDB** — banco de dados vetorial para busca semantica
- **pdfplumber** — extracao de texto de PDFs
- **pandas / openpyxl** — leitura de planilhas Excel
- **SQLAlchemy / mysql-connector-python** — conexao com MySQL
- **pymongo** — conexao com MongoDB

## Arquitetura

```
Frontend React (porta 3000)
        |
        | POST /upload, /ia, /connect-mysql, /connect-mongo, GET /fontes
        v
Backend FastAPI (porta 8000)
        |
   +----+----+
   |         |
   v         v
ChromaDB   LLM Local (Qwen 1.5B)
(vetores)  (PyTorch + MPS)
```

**Fluxo RAG:**
1. O usuario envia arquivos ou conecta bancos de dados
2. O backend extrai o texto, divide em chunks e gera embeddings
3. Os embeddings sao armazenados no ChromaDB
4. Quando o usuario faz uma pergunta, o sistema busca os chunks mais relevantes
5. O contexto recuperado e a pergunta sao enviados ao modelo LLM
6. O modelo gera uma resposta baseada exclusivamente no contexto fornecido

## Guia de Execucao

### Pre-requisitos

- **Node.js** >= 18
- **Python** >= 3.10
- **MySQL** (para o conector de banco relacional)
- **MongoDB** (opcional, para o conector NoSQL)
- Aproximadamente **4GB de espaco livre** para o modelo LLM (baixado automaticamente na primeira execucao)

### 1. Clonar o repositorio

```bash
git clone <url-do-repositorio>
cd SI-IA
```

### 2. Instalar e rodar o Frontend

```bash
npm install
npm start
```

O frontend estara disponivel em `http://localhost:3000`.

### 3. Configurar e rodar o Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

pip install -r requirements.txt
python main.py
```

O backend estara disponivel em `http://localhost:8000`.

> Na primeira pergunta ao chat, o modelo Qwen 1.5B sera baixado automaticamente do HuggingFace (~3GB). Apos o download, ele fica em cache local e as proximas execucoes serao rapidas.

### 4. Subir o banco de dados MySQL (se necessario)

Certifique-se de ter uma instancia MySQL rodando localmente ou acessivel na rede. A conexao e feita pela interface do sistema, informando host, usuario, senha e nome do banco.

### 5. Subir o MongoDB (opcional)

Para MongoDB, tenha uma instancia rodando e conecte pela interface do sistema.

## Endpoints da API

| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | `/upload` | Envia arquivo PDF ou XLSX para indexacao |
| POST | `/connect-mysql` | Conecta a um banco MySQL e indexa os dados |
| POST | `/connect-mongo` | Conecta a um banco MongoDB e indexa os dados |
| POST | `/ia` | Envia uma pergunta e recebe a resposta da IA |
| GET | `/fontes` | Lista todas as fontes de dados indexadas |

## Estrutura do Projeto

```
SI-IA/
├── public/                  # Assets estaticos do React
├── src/                     # Codigo-fonte do Frontend
│   ├── pages/               # Paginas (Home, NovaFonte, Perguntas)
│   ├── services/             # Servicos de comunicacao com a API
│   └── styles/              # Estilos globais
├── backend/                 # Codigo-fonte do Backend
│   ├── main.py              # FastAPI — definicao dos endpoints
│   ├── model.py             # Carregamento e inferencia do LLM
│   ├── rag.py               # Pipeline RAG (ChromaDB + LLM)
│   └── ingestors/           # Modulos de extracao por formato
│       ├── pdf.py           # Extrator de PDF
│       ├── xlsx.py          # Extrator de Excel
│       ├── mysql.py         # Extrator de MySQL
│       └── mongo.py         # Extrator de MongoDB
├── package.json
└── README.md
```
