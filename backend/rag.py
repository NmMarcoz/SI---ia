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

        context = "\n\n".join(results["documents"][0])

        prompt = (
            "Com base no seguinte contexto, responda a pergunta do usuário.\n\n"
            f"CONTEXTO:\n{context}\n\n"
            f"PERGUNTA:\n{question}\n\n"
            "Responda de forma clara e objetiva, baseando-se apenas no contexto fornecido."
        )

        return self.llm.generate(prompt)

    def list_sources(self) -> list[str]:
        all_metadatas = self.collection.get()["metadatas"]
        if not all_metadatas:
            return []
        return list(set(m["source"] for m in all_metadatas))
