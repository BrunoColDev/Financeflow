// Página de Despesas: CRUD completo (listar, criar, editar, excluir).
// Props: usuario (o usuário logado, usado para saber de quem é a despesa).
import { useState, useEffect } from "react";
import { listar, criar, atualizar, excluir } from "../api";
import { formatarMoeda, formatarData } from "../utils";

// Formulário vazio (usado no início e depois de salvar)
const formularioVazio = {
  descricao: "",
  valor: "",
  dataDespesa: "",
  categoria: "",
};

function Despesas(props) {
  const usuario = props.usuario;

  // ---------- STATES ----------
  const [despesas, setDespesas] = useState([]);       // lista vinda da API
  const [formulario, setFormulario] = useState(formularioVazio); // campos do form
  const [idEditando, setIdEditando] = useState(null);  // null = criando | número = editando
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // ---------- LISTAR (READ) ----------
  async function carregarDespesas() {
    try {
      const dados = await listar("despesas");
      // só as despesas do usuário logado
      setDespesas(dados.filter(function (d) { return d.idUsuario === usuario.idUsuario; }));
      setErro("");
    } catch (e) {
      setErro(e.message);
    }
    setCarregando(false);
  }

  // Executa uma vez quando a página abre
  useEffect(function () {
    carregarDespesas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- FORMULÁRIO ----------
  // Atualiza o campo que o usuário está digitando
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
      descricao: formulario.descricao,
      valor: Number(formulario.valor),
      dataDespesa: formulario.dataDespesa,
      categoria: formulario.categoria,
      idUsuario: usuario.idUsuario,
    };

    try {
      if (idEditando === null) {
        await criar("despesas", dados);               // POST
      } else {
        await atualizar("despesas", idEditando, dados); // PUT
      }
      cancelarEdicao();
      await carregarDespesas();
    } catch (e) {
      setErro(e.message);
    }
  }

  // Clicou em "Editar": joga os dados da linha para dentro do formulário
  function aoEditar(despesa) {
    setIdEditando(despesa.idDespesa);
    setFormulario({
      descricao: despesa.descricao,
      valor: despesa.valor,
      dataDespesa: despesa.dataDespesa,
      categoria: despesa.categoria,
    });
    window.scrollTo(0, 0);
  }

  // ---------- EXCLUIR (DELETE) ----------
  async function aoExcluir(id) {
    if (!window.confirm("Deseja realmente excluir esta despesa?")) {
      return;
    }
    try {
      await excluir("despesas", id);
      await carregarDespesas();
    } catch (e) {
      setErro(e.message);
    }
  }

  // ---------- TELA ----------
  return (
    <main className="container main">
      <h2 className="secao-titulo">Despesas</h2>

      {/* Formulário */}
      <section className="secao">
        <div className="card">
          <h3 className="form-titulo">{idEditando === null ? "Nova despesa" : "Editando despesa"}</h3>

          <form onSubmit={aoSalvar}>
            <div className="formulario">
              <div className="campo">
                <label htmlFor="descricao">Descrição</label>
                <input id="descricao" name="descricao" type="text" maxLength="100" value={formulario.descricao} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="valor">Valor (R$)</label>
                <input id="valor" name="valor" type="number" step="0.01" min="0" value={formulario.valor} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="dataDespesa">Data</label>
                <input id="dataDespesa" name="dataDespesa" type="date" value={formulario.dataDespesa} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <input id="categoria" name="categoria" type="text" maxLength="100" value={formulario.categoria} onChange={aoDigitar} required />
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

      {/* Tabela */}
      <section className="secao">
        <div className="card sem-padding">
          <div className="tabela-scroll">
            <table className="tabela">
              <thead>
                <tr>
                  <th className="th">Descrição</th>
                  <th className="th th-centro oculto-mobile">Categoria</th>
                  <th className="th th-centro oculto-mobile">Data</th>
                  <th className="th th-direita">Valor</th>
                  <th className="th th-direita">Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando && (
                  <tr><td className="td" colSpan="5">Carregando...</td></tr>
                )}
                {!carregando && despesas.length === 0 && (
                  <tr><td className="td" colSpan="5">Nenhuma despesa cadastrada.</td></tr>
                )}

                {despesas.map(function (d) {
                  return (
                    <tr className="linha" key={d.idDespesa}>
                      <td className="td"><p className="tx-nome">{d.descricao}</p></td>
                      <td className="td th-centro oculto-mobile"><span className="tag tag-moradia">{d.categoria}</span></td>
                      <td className="td th-centro oculto-mobile tx-data">{formatarData(d.dataDespesa)}</td>
                      <td className="td th-direita tx-vermelho">- {formatarMoeda(d.valor)}</td>
                      <td className="td th-direita">
                        <button className="botao-pequeno" onClick={function () { aoEditar(d); }}>Editar</button>
                        <button className="botao-pequeno botao-perigo" onClick={function () { aoExcluir(d.idDespesa); }}>Excluir</button>
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

export default Despesas;
