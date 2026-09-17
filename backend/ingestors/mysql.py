from sqlalchemy import create_engine, text


def extract(host: str, user: str, password: str, database: str) -> list[str]:
    """Conecta ao MySQL, lê todas as tabelas e converte cada linha em texto."""
    url = f"mysql+mysqlconnector://{user}:{password}@{host}/{database}"
    engine = create_engine(url)
    chunks = []

    with engine.connect() as conn:
        tables = conn.execute(text("SHOW TABLES")).fetchall()

        for (table_name,) in tables:
            columns = conn.execute(text(f"DESCRIBE `{table_name}`")).fetchall()
            col_names = [c[0] for c in columns]

            rows = conn.execute(
                text(f"SELECT * FROM `{table_name}` LIMIT 1000")
            ).fetchall()

            for row in rows:
                row_text = " | ".join(
                    f"{col}: {val}"
                    for col, val in zip(col_names, row)
                    if val is not None
                )
                if row_text.strip():
                    chunks.append(f"[Tabela: {table_name}] {row_text}")

    engine.dispose()
    return chunks
