from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from rag import RAGPipeline
from ingestors import pdf, xlsx, mysql, mongo

app = FastAPI(title="SL-IA API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = RAGPipeline()


class PerguntaRequest(BaseModel):
    pergunta: str
    fontes: list


class DBConnection(BaseModel):
    host: str
    user: str
    senha: str
    database: str


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    filename = file.filename

    if filename.endswith(".pdf"):
        chunks = pdf.extract(content)
    elif filename.endswith(".xlsx"):
        chunks = xlsx.extract(content)
    else:
        return {"error": "Formato não suportado. Use PDF ou XLSX."}

    rag.add_documents(chunks, source=filename)
    return {"message": f"{filename} processado com sucesso", "chunks": len(chunks)}


@app.post("/connect-mysql")
async def connect_mysql(conn: DBConnection):
    chunks = mysql.extract(conn.host, conn.user, conn.senha, conn.database)
    source = f"mysql - {conn.database}"
    rag.add_documents(chunks, source=source)
    return {"message": f"MySQL '{conn.database}' indexado", "chunks": len(chunks)}


@app.post("/connect-mongo")
async def connect_mongo(conn: DBConnection):
    chunks = mongo.extract(conn.host, conn.user, conn.senha, conn.database)
    source = f"mongodb - {conn.database}"
    rag.add_documents(chunks, source=source)
    return {"message": f"MongoDB '{conn.database}' indexado", "chunks": len(chunks)}


@app.post("/ia")
async def perguntar(req: PerguntaRequest):
    fontes_selecionadas = [
        f["nome"] for f in req.fontes if f.get("selecionado")
    ]
    resultado = rag.query(req.pergunta, fontes_selecionadas)
    if isinstance(resultado, str):
        return {"resposta": resultado, "raciocinio": "", "tempo": 0}
    return resultado


@app.get("/fontes")
async def listar_fontes():
    return {"fontes": rag.list_sources()}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
