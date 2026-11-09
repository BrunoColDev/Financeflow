// Página de Receitas: CRUD completo (listar, criar, editar, excluir).
// Props: usuario (o usuário logado, usado para saber de quem é a receita).
import { useState, useEffect } from "react";
import { listar, criar, atualizar, excluir } from "../api";
import { formatarMoeda, formatarData } from "../utils";

// Formulário vazio (usado no início e depois de salvar)
const formularioVazio = {
  descricao: "",
  valor: "",
  dataReceita: "",
  categoria: "",
};

function Receitas(props) {
  const usuario = props.usuario;

  // ---------- STATES ----------
  const [receitas, setReceitas] = useState([]);       // lista vinda da API
  const [formulario, setFormulario] = useState(formularioVazio); // campos do form
  const [idEditando, setIdEditando] = useState(null);  // null = criando | número = editando
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // ---------- LISTAR (READ) ----------
  async function carregarReceitas() {
    try {
      const dados = await listar("receitas");
      // só as receitas do usuário logado
      setReceitas(dados.filter(function (r) { return r.idUsuario === usuario.idUsuario; }));
      setErro("");
    } catch (e) {
      setErro(e.message);
    }
    setCarregando(false);
  }

  // Executa uma vez quando a página abre
  useEffect(function () {
    carregarReceitas();
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
      dataReceita: formulario.dataReceita,
      categoria: formulario.categoria,
      idUsuario: usuario.idUsuario,
    };

    try {
      if (idEditando === null) {
        await criar("receitas", dados);               // POST
      } else {
        await atualizar("receitas", idEditando, dados); // PUT
      }
      cancelarEdicao();
      await carregarReceitas();
    } catch (e) {
      setErro(e.message);
    }
  }

  // Clicou em "Editar": joga os dados da linha para dentro do formulário
  function aoEditar(receita) {
    setIdEditando(receita.idReceita);
    setFormulario({
      descricao: receita.descricao,
      valor: receita.valor,
      dataReceita: receita.dataReceita,
      categoria: receita.categoria,
    });
    window.scrollTo(0, 0);
  }

  // ---------- EXCLUIR (DELETE) ----------
  async function aoExcluir(id) {
    if (!window.confirm("Deseja realmente excluir esta receita?")) {
      return;
    }
    try {
      await excluir("receitas", id);
      await carregarReceitas();
    } catch (e) {
      setErro(e.message);
    }
  }

  // ---------- TELA ----------
  return (
    <main className="container main">
      <h2 className="secao-titulo">Receitas</h2>

      {/* Formulário */}
      <section className="secao">
        <div className="card">
          <h3 className="form-titulo">{idEditando === null ? "Nova receita" : "Editando receita"}</h3>

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
                <label htmlFor="dataReceita">Data</label>
                <input id="dataReceita" name="dataReceita" type="date" value={formulario.dataReceita} onChange={aoDigitar} required />
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
                {!carregando && receitas.length === 0 && (
                  <tr><td className="td" colSpan="5">Nenhuma receita cadastrada.</td></tr>
                )}

                {receitas.map(function (r) {
                  return (
                    <tr className="linha" key={r.idReceita}>
                      <td className="td"><p className="tx-nome">{r.descricao}</p></td>
                      <td className="td th-centro oculto-mobile"><span className="tag tag-trabalho">{r.categoria}</span></td>
                      <td className="td th-centro oculto-mobile tx-data">{formatarData(r.dataReceita)}</td>
                      <td className="td th-direita tx-verde">+ {formatarMoeda(r.valor)}</td>
                      <td className="td th-direita">
                        <button className="botao-pequeno" onClick={function () { aoEditar(r); }}>Editar</button>
                        <button className="botao-pequeno botao-perigo" onClick={function () { aoExcluir(r.idReceita); }}>Excluir</button>
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

export default Receitas;
