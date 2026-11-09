// Cabeçalho com logo, menu de navegação e dados do usuário.
// Props recebidas: usuario (objeto) e onSair (função).
import { NavLink } from "react-router-dom";
import { pegarIniciais } from "../utils";

function Header(props) {
  const usuario = props.usuario;

  // NavLink é um link do React Router: troca de página SEM recarregar o site.
  // A classe "ativo" destaca a página atual.
  function classeDoLink({ isActive }) {
    return isActive ? "nav-link ativo" : "nav-link";
  }

  return (
    <header className="cabecalho">
      <div className="container">
        <div className="cabecalho-inner">
          {/* Logo */}
          <div className="logo">
            <span className="logo-icone">F</span>
            <span className="logo-texto">FinanceFlow</span>
          </div>

          {/* Menu */}
          <nav className="nav">
            <NavLink to="/" end className={classeDoLink}>Home</NavLink>
            <NavLink to="/usuarios" className={classeDoLink}>Usuários</NavLink>
            <NavLink to="/receitas" className={classeDoLink}>Receitas</NavLink>
            <NavLink to="/despesas" className={classeDoLink}>Despesas</NavLink>
            <NavLink to="/investimentos" className={classeDoLink}>Investimentos</NavLink>
          </nav>

          {/* Usuário */}
          <div className="usuario">
            <span className="usuario-nome">Olá, {usuario.nome}</span>
            <div className="avatar">{pegarIniciais(usuario.nome)}</div>
            <button className="botao-sair" onClick={props.onSair}>Sair</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
