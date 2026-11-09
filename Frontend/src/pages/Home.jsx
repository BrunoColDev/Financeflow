// Página Home: saudação, cards de resumo e últimas transações.
// Os dados vêm da API (receitas, despesas e investimentos do usuário logado).
import { useState, useEffect } from "react";
import { listar } from "../api";
import { formatarMoeda, formatarData } from "../utils";
import Card from "../components/Card";

// Soma o campo "valor" (ou outro campo) de uma lista
function somar(lista, campo) {
  return lista.reduce(function (total, item) {
    return total + Number(item[campo] || 0);
  }, 0);
}

function Home(props) {
  const usuario = props.usuario;

  // STATE: listas que vêm da API
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // EFFECT: roda uma vez, quando a página abre, e busca os dados
  useEffect(function () {
    async function carregar() {
      try {
        const [r, d, i] = await Promise.all([
          listar("receitas"),
          listar("despesas"),
          listar("investimentos"),
        ]);

        // Mostra só os registros do usuário logado
        setReceitas(r.filter(function (x) { return x.idUsuario === usuario.idUsuario; }));
        setDespesas(d.filter(function (x) { return x.idUsuario === usuario.idUsuario; }));
        setInvestimentos(i.filter(function (x) { return x.idUsuario === usuario.idUsuario; }));
      } catch (e) {
        setErro(e.message);
      }
      setCarregando(false);
    }

    carregar();
  }, [usuario.idUsuario]);

  // Cálculos do resumo
  const totalReceitas = somar(receitas, "valor");
  const totalDespesas = somar(despesas, "valor");
  const saldo = totalReceitas - totalDespesas;
  const totalInvestido = somar(investimentos, "valorInvestido");

  // Junta receitas e despesas numa lista só, ordena pela data (mais nova primeiro)
  // e pega as 7 primeiras.
  const transacoes = [
    ...receitas.map(function (r) {
      return { id: "r" + r.idReceita, descricao: r.descricao, categoria: r.categoria, data: r.dataReceita, valor: Number(r.valor), tipo: "receita" };
    }),
    ...despesas.map(function (d) {
      return { id: "d" + d.idDespesa, descricao: d.descricao, categoria: d.categoria, data: d.dataDespesa, valor: Number(d.valor), tipo: "despesa" };
    }),
  ]
    .sort(function (a, b) { return String(b.data).localeCompare(String(a.data)); })
    .slice(0, 7);

  const primeiroNome = usuario.nome.split(" ")[0];

  return (
    <main className="container main">
      <h1 className="saudacao">Olá, {primeiroNome}! 👋</h1>
      <p className="saudacao-sub">Aqui está o resumo das suas finanças.</p>

      {erro && <p className="erro">{erro}</p>}

      {/* ---------- Cards de resumo ---------- */}
      <section className="secao">
        <h2 className="secao-titulo">Resumo financeiro</h2>

        <div className="cards-grid">
          <Card titulo="Saldo Atual" valor={formatarMoeda(saldo)} detalhe="Receitas - despesas" cor={saldo < 0 ? "vermelho" : "azul"} />
          <Card titulo="Receitas" valor={formatarMoeda(totalReceitas)} detalhe="Total cadastrado" cor="verde" />
          <Card titulo="Despesas" valor={formatarMoeda(totalDespesas)} detalhe="Total cadastrado" cor="vermelho" />
          <Card titulo="Investimentos" valor={formatarMoeda(totalInvestido)} detalhe="Carteira total" cor="dourado" />
        </div>
      </section>

      {/* ---------- Últimas transações ---------- */}
      <section className="secao">
        <h2 className="secao-titulo">Últimas transações</h2>

        <div className="card sem-padding">
          <div className="tabela-scroll">
            <table className="tabela">
              <thead>
                <tr>
                  <th className="th">Descrição</th>
                  <th className="th th-centro oculto-mobile">Categoria</th>
                  <th className="th th-centro oculto-mobile">Data</th>
                  <th className="th th-direita">Valor</th>
                </tr>
              </thead>
              <tbody>
                {carregando && (
                  <tr><td className="td" colSpan="4">Carregando...</td></tr>
                )}

                {!carregando && transacoes.length === 0 && (
                  <tr><td className="td" colSpan="4">Nenhuma transação encontrada.</td></tr>
                )}

                {transacoes.map(function (t) {
                  return (
                    <tr className="linha" key={t.id}>
                      <td className="td">
                        <p className="tx-nome">{t.descricao}</p>
                      </td>
                      <td className="td th-centro oculto-mobile">
                        <span className={t.tipo === "receita" ? "tag tag-trabalho" : "tag tag-moradia"}>
                          {t.categoria}
                        </span>
                      </td>
                      <td className="td th-centro oculto-mobile tx-data">{formatarData(t.data)}</td>
                      <td className={"td th-direita " + (t.tipo === "receita" ? "tx-verde" : "tx-vermelho")}>
                        {t.tipo === "receita" ? "+ " : "- "}
                        {formatarMoeda(t.valor)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
