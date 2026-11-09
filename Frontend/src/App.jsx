// App.jsx: define as ROTAS (qual página aparece em cada endereço)
// e guarda o usuário logado.
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Investimentos from "./pages/Investimentos";
import NotFound from "./pages/NotFound";

// Se não houver usuário logado, manda para /login.
// "children" é a página que está dentro da tag (veja as rotas abaixo).
function RotaProtegida({ usuario, children }) {
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Lê o usuário salvo no navegador (para continuar logado ao recarregar a página).
function lerUsuarioSalvo() {
  try {
    const salvo = localStorage.getItem("usuarioLogado");
    return salvo ? JSON.parse(salvo) : null;
  } catch (erro) {
    return null;
  }
}

function App() {
  // STATE: usuário logado (null = ninguém logado)
  const [usuario, setUsuario] = useState(lerUsuarioSalvo);

  function fazerLogin(dadosUsuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
    setUsuario(dadosUsuario);
  }

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
  }

  return (
    <>
      {/* O cabeçalho só aparece depois do login. Recebe dados por PROPS. */}
      {usuario && <Header usuario={usuario} onSair={sair} />}

      <Routes>
        <Route
          path="/login"
          element={usuario ? <Navigate to="/" replace /> : <Login onLogin={fazerLogin} />}
        />

        <Route
          path="/"
          element={
            <RotaProtegida usuario={usuario}>
              <Home usuario={usuario} />
            </RotaProtegida>
          }
        />
        <Route
          path="/usuarios"
          element={
            <RotaProtegida usuario={usuario}>
              <Usuarios usuario={usuario} />
            </RotaProtegida>
          }
        />
        <Route
          path="/receitas"
          element={
            <RotaProtegida usuario={usuario}>
              <Receitas usuario={usuario} />
            </RotaProtegida>
          }
        />
        <Route
          path="/despesas"
          element={
            <RotaProtegida usuario={usuario}>
              <Despesas usuario={usuario} />
            </RotaProtegida>
          }
        />
        <Route
          path="/investimentos"
          element={
            <RotaProtegida usuario={usuario}>
              <Investimentos usuario={usuario} />
            </RotaProtegida>
          }
        />

        {/* Qualquer outro endereço cai na página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
