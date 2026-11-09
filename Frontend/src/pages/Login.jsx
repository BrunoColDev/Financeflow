// Página de Login.
//
// ATENÇÃO: este é um LOGIN SIMPLIFICADO.
// O backend ainda não tem um endpoint de login, então fazemos assim:
//   1) buscamos os usuários em GET /usuarios;
//   2) procuramos um que tenha o mesmo e-mail e senha digitados.
// Para um sistema real, essa verificação deveria ser feita no backend.
import { useState } from "react";
import { listar } from "../api";

function Login(props) {
  // STATE: o que o usuário digita e mensagens da tela
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(evento) {
    evento.preventDefault(); // não deixa o formulário recarregar a página
    setErro("");
    setCarregando(true);

    try {
      const usuarios = await listar("usuarios");

      const encontrado = usuarios.find(function (u) {
        return u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha;
      });

      if (!encontrado) {
        setErro("E-mail ou senha incorretos.");
      } else {
        // Guardamos o usuário SEM a senha
        props.onLogin({
          idUsuario: encontrado.idUsuario,
          nome: encontrado.nome,
          email: encontrado.email,
          telefone: encontrado.telefone,
        });
      }
    } catch (e) {
      setErro(e.message);
    }

    setCarregando(false);
  }

  return (
    <main className="login-pagina">
      <div className="card login-card">
        <div className="logo login-logo">
          <span className="logo-icone">F</span>
          <span className="logo-texto login-logo-texto">FinanceFlow</span>
        </div>

        <p className="login-subtitulo">Entre com seu e-mail e senha</p>

        <form onSubmit={aoEnviar}>
          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={function (e) { setEmail(e.target.value); }}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={function (e) { setSenha(e.target.value); }}
              required
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="botao botao-total" type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
