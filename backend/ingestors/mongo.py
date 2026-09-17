import json
from pymongo import MongoClient


def extract(host: str, user: str, password: str, database: str) -> list[str]:
    """Conecta ao MongoDB, lê coleções e converte cada documento em texto."""
    if user and password:
        uri = f"mongodb://{user}:{password}@{host}"
    else:
        uri = f"mongodb://{host}"

    client = MongoClient(uri)
    db = client[database]
    chunks = []

    for collection_name in db.list_collection_names():
        collection = db[collection_name]

        for doc in collection.find().limit(1000):
            doc.pop("_id", None)
            doc_text = json.dumps(doc, ensure_ascii=False, default=str)
            chunks.append(f"[Coleção: {collection_name}] {doc_text}")

    client.close()
    return chunks
