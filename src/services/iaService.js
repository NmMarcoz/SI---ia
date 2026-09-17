const API_URL = "http://localhost:8000";

export async function perguntarIA(pergunta, fontes) {
  const response = await fetch(`${API_URL}/ia`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta, fontes }),
  });

  return response.json();
}

export async function uploadArquivo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

export async function conectarMySQL(host, user, senha, database) {
  const response = await fetch(`${API_URL}/connect-mysql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host, user, senha, database }),
  });

  return response.json();
}

export async function conectarMongo(host, user, senha, database) {
  const response = await fetch(`${API_URL}/connect-mongo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host, user, senha, database }),
  });

  return response.json();
}

export async function listarFontes() {
  const response = await fetch(`${API_URL}/fontes`);
  return response.json();
}
