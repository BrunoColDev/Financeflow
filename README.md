# FinanceFlow

Projeto **Fintech** desenvolvido com **React + JavaScript** no frontend e **Java + Spring Boot** no backend, utilizando **Oracle FIAP** como banco de dados.

O frontend utiliza **Create React App**, sem Vite e sem TypeScript.

## Como executar

### 1. Backend

Primeiro, abra o projeto backend em uma IDE, como o IntelliJ IDEA.

O backend utiliza **Spring Boot** e deve estar conectado à instância Oracle da FIAP.

Antes de iniciar, configure a variável de ambiente:

```text
FINTECH_DB_PASSWORD
```

Essa variável deve conter a senha da sua conta Oracle FIAP.

Depois, execute a aplicação Spring Boot.

O backend será iniciado em:

```text
http://localhost:8080
```

### 2. Frontend

Requisitos:

- Node.js 18 ou superior
- Recomendado: Node.js 20 LTS

Dentro da pasta do frontend, execute:

```bash
npm install
npm start
```

O projeto será executado em:

```text
http://localhost:3000
```

Se o navegador não abrir automaticamente, acesse o endereço manualmente.

## Como o React roda

O projeto utiliza **Create React App** através do `react-scripts`.

O comando `npm start` inicia o servidor de desenvolvimento na porta 3000, compila os arquivos React e atualiza a aplicação quando os arquivos são alterados.

O HTML principal está em:

```text
public/index.html
```

O arquivo `src/index.js` inicializa o React e renderiza o componente principal da aplicação.

## Como o frontend conversa com o backend

As chamadas para o backend são feitas utilizando `fetch` e estão centralizadas no arquivo:

```text
src/api.js
```

As principais operações disponíveis são:

- `GET` — listar registros
- `POST` — cadastrar registros
- `PUT` — atualizar registros
- `DELETE` — excluir registros

O projeto utiliza um proxy através do arquivo:

```text
src/setupProxy.js
```

As chamadas do frontend utilizam o prefixo `/api`, por exemplo:

```text
/api/usuarios
/api/receitas
/api/despesas
/api/investimentos
```

O proxy encaminha essas requisições para o backend Spring Boot em:

```text
http://localhost:8080
```

## Login

O login foi implementado de forma simplificada para atender à atividade.

O backend não possui um endpoint específico de autenticação. Por isso, a aplicação:

1. Busca os usuários através da API.
2. Compara o e-mail e a senha informados com os dados retornados.
3. Se encontrar um usuário correspondente, realiza o login.

> **Importante:** essa abordagem é utilizada apenas para fins acadêmicos. Em uma aplicação real, a autenticação deveria ser realizada no backend utilizando uma estratégia segura de armazenamento e validação de senhas.

### Credenciais para teste

**E-mail:**

```text
teste.fintech@example.com
```

**Senha:**

```text
senha_teste
```

## Estrutura do projeto

```text
public/
  index.html

src/
  index.js
  App.jsx
  api.js
  setupProxy.js
  utils.js

  components/
    Header.jsx
    Footer.jsx
    Card.jsx

  pages/
    Login.jsx
    Home.jsx
    Usuarios.jsx
    Receitas.jsx
    Despesas.jsx
    Investimentos.jsx
    NotFound.jsx
```

## Requisitos implementados

### React

- **Componentização:** utilização de componentes reutilizáveis como `Header`, `Footer` e `Card`.
- **Rotas SPA:** navegação entre páginas utilizando React Router.
- **Props:** comunicação de dados entre componentes.
- **State e Hooks:** utilização de `useState` e `useEffect`.
- **Login:** tela de autenticação simplificada.
- **Home:** página inicial com resumo financeiro e transações.
- **Página de erro:** página personalizada para rotas inexistentes.

### CRUD

A aplicação possui operações de CRUD para quatro entidades:

- Usuários
- Receitas
- Despesas
- Investimentos

Cada entidade possui:

- Listagem (`GET`)
- Cadastro (`POST`)
- Atualização (`PUT`)
- Exclusão (`DELETE`)

### Backend

O frontend consome uma API REST desenvolvida em **Spring Boot**.

As entidades utilizadas são:

- `Usuario`
- `Receita`
- `Despesa`
- `Investimento`

Cada entidade possui as camadas:

- Model
- Repository
- Service
- Controller

### Banco de dados

O sistema utiliza a instância **Oracle da FIAP**.

Os dados cadastrados pelo frontend são persistidos no banco de dados e podem ser consultados novamente pela aplicação.

## Testes realizados

Foram realizados testes de ponta a ponta entre frontend, backend e banco de dados, incluindo:

- Login com usuário cadastrado.
- Cadastro de usuário.
- Edição de usuário.
- Exclusão de usuário.
- Cadastro de receita.
- Edição de receita.
- Exclusão de receita.
- Cadastro de despesa.
- Edição de despesa.
- Exclusão de despesa.
- Cadastro de investimento.
- Edição de investimento.
- Exclusão de investimento.

Também foi validada a compilação do frontend através do comando:

```bash
npm run build
```

O projeto foi compilado com sucesso.

Os testes confirmaram o funcionamento da comunicação entre **React, API Spring Boot e Oracle FIAP**.
