// Página 404 personalizada: aparece quando o endereço não existe.
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container main">
      <div className="card nao-encontrado">
        <p className="nao-encontrado-codigo">404</p>
        <h2 className="nao-encontrado-titulo">Página não encontrada</h2>
        <p className="card-detalhe">O endereço que você tentou acessar não existe no FinanceFlow.</p>
        <Link to="/" className="botao botao-link">Voltar para o início</Link>
      </div>
    </main>
  );
}

export default NotFound;
