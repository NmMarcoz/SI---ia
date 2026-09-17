import io
import pandas as pd


def extract(content: bytes) -> list[str]:
    """Extrai dados de cada aba do Excel, convertendo cada linha em texto."""
    chunks = []
    xls = pd.ExcelFile(io.BytesIO(content))

    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)

        for _, row in df.iterrows():
            row_text = " | ".join(
                f"{col}: {val}" for col, val in row.items() if pd.notna(val)
            )
            if row_text.strip():
                chunks.append(f"[Planilha: {sheet_name}] {row_text}")

    return chunks
