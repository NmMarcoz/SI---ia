import io
import pdfplumber


def extract(content: bytes, chunk_size: int = 500) -> list[str]:
    """Extrai texto de um PDF e divide em chunks por quantidade de palavras."""
    chunks = []

    with pdfplumber.open(io.BytesIO(content)) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue

            words = text.split()
            for i in range(0, len(words), chunk_size):
                chunk = " ".join(words[i : i + chunk_size])
                if chunk.strip():
                    chunks.append(chunk)

    return chunks
