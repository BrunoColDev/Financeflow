// Página de Usuários: CRUD completo (listar, criar, editar, excluir).
// Props: usuario (o usuário logado — usado só para impedir que ele exclua a si mesmo).
import { useState, useEffect } from "react";
import { listar, criar, atualizar, excluir } from "../api";

const formularioVazio = {
  nome: "",
  email: "",
  senha: "",
  telefone: "",
};

function Usuarios(props) {
  const usuarioLogado = props.usuario;

  // ---------- STATES ----------
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [idEditando, setIdEditando] = useState(null); // null = criando | número = editando
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // ---------- LISTAR (READ) ----------
  async function carregarUsuarios() {
    try {
      const dados = await listar("usuarios");
      setUsuarios(dados);
      setErro("");
    } catch (e) {
      setErro(e.message);
    }
    setCarregando(false);
  }

  useEffect(function () {
    carregarUsuarios();
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

    try {
      if (idEditando === null) {
        await criar("usuarios", formulario);                 // POST
      } else {
        await atualizar("usuarios", idEditando, formulario); // PUT
      }
      cancelarEdicao();
      await carregarUsuarios();
    } catch (e) {
      setErro(e.message);
    }
  }

  function aoEditar(u) {
    setIdEditando(u.idUsuario);
    setFormulario({
      nome: u.nome,
      email: u.email,
      senha: u.senha,
      telefone: u.telefone || "",
    });
    window.scrollTo(0, 0);
  }

  // ---------- EXCLUIR (DELETE) ----------
  async function aoExcluir(id) {
    if (id === usuarioLogado.idUsuario) {
      alert("Você não pode excluir o usuário que está logado.");
      return;
    }
    if (!window.confirm("Deseja realmente excluir este usuário?")) {
      return;
    }
    try {
      await excluir("usuarios", id);
      await carregarUsuarios();
    } catch (e) {
      setErro(e.message);
    }
  }

  // ---------- TELA ----------
  return (
    <main className="container main">
      <h2 className="secao-titulo">Usuários</h2>

      <section className="secao">
        <div className="card">
          <h3 className="form-titulo">{idEditando === null ? "Novo usuário" : "Editando usuário"}</h3>

          <form onSubmit={aoSalvar}>
            <div className="formulario">
              <div className="campo">
                <label htmlFor="nome">Nome</label>
                <input id="nome" name="nome" type="text" maxLength="100" value={formulario.nome} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" maxLength="100" value={formulario.email} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="senha">Senha</label>
                <input id="senha" name="senha" type="password" maxLength="100" value={formulario.senha} onChange={aoDigitar} required />
              </div>
              <div className="campo">
                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" name="telefone" type="text" maxLength="20" value={formulario.telefone} onChange={aoDigitar} />
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
                  <th className="th">Nome</th>
                  <th className="th oculto-mobile">E-mail</th>
                  <th className="th oculto-mobile">Telefone</th>
                  <th className="th th-direita">Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando && (
                  <tr><td className="td" colSpan="4">Carregando...</td></tr>
                )}
                {!carregando && usuarios.length === 0 && (
                  <tr><td className="td" colSpan="4">Nenhum usuário cadastrado.</td></tr>
                )}

                {usuarios.map(function (u) {
                  return (
                    <tr className="linha" key={u.idUsuario}>
                      <td className="td"><p className="tx-nome">{u.nome}</p></td>
                      <td className="td oculto-mobile tx-data-esq">{u.email}</td>
                      <td className="td oculto-mobile tx-data-esq">{u.telefone}</td>
                      <td className="td th-direita">
                        <button className="botao-pequeno" onClick={function () { aoEditar(u); }}>Editar</button>
                        <button className="botao-pequeno botao-perigo" onClick={function () { aoExcluir(u.idUsuario); }}>Excluir</button>
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

export default Usuarios;
