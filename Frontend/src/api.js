// Todas as chamadas ao backend Spring Boot ficam neste arquivo.
// O prefixo /api é encaminhado pelo setupProxy.js para localhost:8080.

async function chamarApi(url, opcoes) {
  let resposta;

  try {
    resposta = await fetch(url, opcoes);
  } catch (erro) {
    throw new Error(
      "Não foi possível conectar ao backend. Ele está rodando em localhost:8080?"
    );
  }

  if (!resposta.ok) {
    throw new Error(
      "Erro na API (status " + resposta.status + "). Verifique os dados e o backend."
    );
  }

  // DELETE devolve 204 (sem corpo), então não há JSON para ler.
  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

// GET /api/recurso → lista todos
export function listar(recurso) {
  return chamarApi("/api/" + recurso);
}

// POST /api/recurso → cria um novo
export function criar(recurso, dados) {
  return chamarApi("/api/" + recurso, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

// PUT /api/recurso/id → atualiza
export function atualizar(recurso, id, dados) {
  return chamarApi("/api/" + recurso + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

// DELETE /api/recurso/id → exclui
export function excluir(recurso, id) {
  return chamarApi("/api/" + recurso + "/" + id, {
    method: "DELETE",
  });
}
