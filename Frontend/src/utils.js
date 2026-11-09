// Funções pequenas para formatar valores na tela.

// 1500 -> "R$ 1.500,00"
export function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// "2025-06-01" -> "01/06/2025"
export function formatarData(data) {
  if (!data) return "";
  const partes = String(data).split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// "Bruno Silva" -> "BS"
export function pegarIniciais(nome) {
  if (!nome) return "?";
  const palavras = nome.trim().split(" ");
  const primeira = palavras[0][0];
  const ultima = palavras.length > 1 ? palavras[palavras.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}
