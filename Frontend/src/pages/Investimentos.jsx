// Página de Investimentos: CRUD completo (listar, criar, editar, excluir).
// Props: usuario (o usuário logado).
import { useState, useEffect } from "react";
import { listar, criar, atualizar, excluir } from "../api";
import { formatarMoeda, formatarData } from "../utils";

const formularioVazio = {
  tipo: "",
  valorInvestido: "",
  rendimento: "",
  dataInicio: "",
};

function Investimentos(props) {
  const usuario = props.usuario;

  // ---------- STATES ----------
  const [investimentos, setInvestimentos] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [idEditando, setIdEditando] = useState(null); // null = criando | número = editando
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // ---------- LISTAR (READ) ----------
  async function carregarInvestimentos() {
    try {
      const dados = await listar("investimentos");
      setInvestimentos(dados.filter(function (i) { return i.idUsuario === usuario.idUsuario; }));
      setErro("");
    } catch (e) {
      setErro(e.message);
    }
    setCarregando(false);
  }

  useEffect(function () {
    carregarInvestimentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- FORMULÁRIO ----------
  function aoDigitar(evento) {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
  }

  function cancelarEdicao() {
    setFormulario(formularioVazio);
    setIdEditando(null);
  }

  // ---------- CRIAR (CREATE) e EDITAR (UPDATE) ----------
  async function aoSalvar(evento) {
    evento.preventDefault();

    const dados = {
      tipo: formulario.tipo,
      valorInvestido: Number(formulario.valorInvestido),
      // rendimento é opcional no banco: se estiver vazio, envia null
      rendimento: formulario.rendimento === "" ? null : Number(formulario.rendimento),
      dataInicio: formulario.dataInicio,
      idUsuario: usuario.idUsuario,
    };

    try {
      if (idEditando === null) {
        await criar("investimentos", dados);                 // POST
      } else {
        await atualizar("investimentos", idEditando, dados); // PUT
      }
      cancelarEdicao();
      await carregarInvestimentos();
    } catch (e) {
      setErro(e.message);
    }
  }

  function aoEditar(investimento) {
    setIdEditando(investimento.idInvestimento);
    setFormulario({
      tipo: investimento.tipo,
      valorInvestido: investimento.valorInvestido,
      rendimento: investimento.rendimento === null ? "" : investimento.rendimento,
      dataInicio: investimento.dataInicio,
    });
    window.scrollTo(0, 0);
  }

  // ---------- EXCLUIR (DELETE) ----------
  async function aoExcluir(id) {
    if (!window.confirm("Deseja realmente excluir este investimento?")) {
      return;
    }
    try {
      await excluir("investimentos", id);
      await carregarInvestimentos();
    } catch (e) {
      setErro(e.message);
    }
  }

  // ---------- TELA ----------
  return (
    <main className="container main">
      <h2 className="secao-titulo">Investimentos</h2>

      <section className="secao">
        <div className="card">
          <h3 className="form-titulo">{idEditando === null ? "Novo investimento" : "Editando investimento"}</h3>

          <form onSubmit={aoSalvar}>
            <div className="formulario">
              <div className="campo">
                <label htmlFor="tipo">Tipo (ex: Tesouro Direto)</label>
                <input id="tipo" name="tipo" type="text" maxLength="100" value={formulario.tipo} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="valorInvestido">Valor investido (R$)</label>
                <input id="valorInvestido" name="valorInvestido" type="number" step="0.01" min="0" value={formulario.valorInvestido} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="rendimento">Rendimento (R$)</label>
                <input id="rendimento" name="rendimento" type="number" step="0.01" value={formulario.rendimento} onChange={aoDigitar} />
              </div>
              <div className="campo">
                <label htmlFor="dataInicio">Data de início</label>
                <input id="dataInicio" name="dataInicio" type="date" value={formulario.dataInicio} onChange={aoDigitar} required />
              </div>
            </div>

            {erro && <p className="erro">{erro}</p>}

            <div className="botoes">
              <button className="botao" type="submit">
                {idEditando === null ? "Cadastrar" : "Salvar alterações"}
              </button>
              {idEditando !== null && (
                <button className="botao botao-secundario" type="button" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="secao">
        <div className="card sem-padding">
          <div className="tabela-scroll">
            <table className="tabela">
              <thead>
                <tr>
                  <th className="th">Tipo</th>
                  <th className="th th-centro oculto-mobile">Início</th>
                  <th className="th th-direita oculto-mobile">Rendimento</th>
                  <th className="th th-direita">Valor investido</th>
                  <th className="th th-direita">Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando && (
                  <tr><td className="td" colSpan="5">Carregando...</td></tr>
                )}
                {!carregando && investimentos.length === 0 && (
                  <tr><td className="td" colSpan="5">Nenhum investimento cadastrado.</td></tr>
                )}

                {investimentos.map(function (i) {
                  return (
                    <tr className="linha" key={i.idInvestimento}>
                      <td className="td"><p className="tx-nome">{i.tipo}</p></td>
                      <td className="td th-centro oculto-mobile tx-data">{formatarData(i.dataInicio)}</td>
                      <td className="td th-direita oculto-mobile tx-verde">
                        {i.rendimento === null ? "-" : formatarMoeda(i.rendimento)}
                      </td>
                      <td className="td th-direita tx-dourado">{formatarMoeda(i.valorInvestido)}</td>
                      <td className="td th-direita">
                        <button className="botao-pequeno" onClick={function () { aoEditar(i); }}>Editar</button>
                        <button className="botao-pequeno botao-perigo" onClick={function () { aoExcluir(i.idInvestimento); }}>Excluir</button>
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

export default Investimentos;
