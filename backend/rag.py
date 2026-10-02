import time

import chromadb
from sentence_transformers import SentenceTransformer

from model import LLM


class RAGPipeline:
    def __init__(self, persist_dir="./chroma_db"):
        self.client = chromadb.PersistentClient(path=persist_dir)
        self.collection = self.client.get_or_create_collection("knowledge_base")
        self.embedder = SentenceTransformer("all-MiniLM-L6-v2")
        self.llm = LLM()

    def add_documents(self, chunks: list[str], source: str):
        if not chunks:
            return

        embeddings = self.embedder.encode(chunks).tolist()
        ids = [f"{source}_{i}" for i in range(len(chunks))]
        metadatas = [{"source": source} for _ in chunks]

        self.collection.upsert(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas,
        )

    def query(self, question: str, sources: list[str] = None, n_results: int = 5) -> str:
        query_embedding = self.embedder.encode([question]).tolist()

        where_filter = None
        if sources:
            if len(sources) == 1:
                where_filter = {"source": sources[0]}
            else:
                where_filter = {"source": {"$in": sources}}

        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=n_results,
            where=where_filter,
        )

        if not results["documents"][0]:
            return "Não encontrei informações relevantes nas fontes selecionadas."

        docs = results["documents"][0]
        metas = results["metadatas"][0]
        distances = results.get("distances", [[]])[0]

        context = "\n\n".join(docs)

        # Build reasoning from retrieved chunks
        reasoning_lines = [f"Encontrados {len(docs)} trecho(s) relevante(s):\n"]
        for i, (doc, meta) in enumerate(zip(docs, metas)):
            source = meta.get("source", "?")
            dist = f" (dist: {distances[i]:.3f})" if i < len(distances) else ""
            preview = doc[:120].replace("\n", " ")
            if len(doc) > 120:
                preview += "..."
            reasoning_lines.append(f"{i+1}. [{source}]{dist}\n   {preview}")
        raciocinio = "\n".join(reasoning_lines)

        prompt = (
            "Com base no seguinte contexto, responda a pergunta do usuário.\n\n"
            f"CONTEXTO:\n{context}\n\n"
            f"PERGUNTA:\n{question}\n\n"
            "Responda de forma clara e objetiva, baseando-se apenas no contexto fornecido."
        )

        start = time.time()
        answer = self.llm.generate(prompt)
        elapsed = round(time.time() - start, 2)

        return {"resposta": answer, "raciocinio": raciocinio, "tempo": elapsed}

    def list_sources(self) -> list[str]:
        all_metadatas = self.collection.get()["metadatas"]
        if not all_metadatas:
            return []
        return list(set(m["source"] for m in all_metadatas))
