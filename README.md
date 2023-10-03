# My Wallet API

## Sobre

My Wallet é um aplicativo web que permite aos usuários controlar suas finanças pessoais. Possui front-end, back-end e banco de dados implantado na nuvem. O projeto foi separado em dois repositórios diferentes, um para front-end e outro para back-end, utilizando Git para versionamento. O back-end foi arquitetado em controllers, routers e middlewares, enquanto o front-end foi construído utilizando ReactJS. Foi implementado o cadastro de usuários, capaz de criar uma conta através da validação de campos e senhas. O aplicativo também permite que os usuários façam login, visualizem suas transações e adicionem novas.

<p align="center">
  <img width="790" alt="My Wallet Project" src="https://user-images.githubusercontent.com/95102911/236885662-c365187c-1202-4f10-aaf1-40912291500b.png">
</p>

<hr/>

🔸 Frontend Repository: https://github.com/FellipeLimaT/my_wallet

<hr/>

## Features

- O projeto é separado em dois repositórios diferentes, um para front-end e outro para back-end, e foi usado Git para versionamento.
- O front-end foi implementado utilizando HTML, CSS, JS e React, rodando sempre na porta 8000.
- O back-end foi arquitetado em controllers, routers e middlewares, usando dotenv para gerenciar variáveis ​​de ambiente. O servidor deve rodar na porta 5000.
- Cadastrar usuários no banco de dados através de uma solicitação POST, validando todos os campos e retornando a mensagem de erro correspondente em caso de falha.
- Os usuários podem fazer login, visualizar suas transações e adicionar novas.

<hr/>

## Motivação

O Projeto My Wallet foi desenvolvido para fornecer um aplicativo web que ajuda as pessoas a gerenciar suas finanças e que fosse fácil de usar. A inspiração veio da necessidade de ter uma ferramenta única que pudesse fornecer uma visão abrangente da situação financeira, incluindo um resumo de despesas, receitas e investimentos.

<hr/>

## Tecnologias

<p align='rigth'>
<img style='margin: 2px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white'>
<img style='margin: 2px; width:70px' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white/'>
</p>

<hr/>

## ⚙️ Rotas

#### <span style='font-weight:bold;'>POST</span> /signUp

Rota que cria uma nova conta de usuário. Se já houver um participante com este e-mail cadastrado, será retornado um erro de código de status 409. Se for bem-sucedido, ele retornará um código de status 201. O corpo da solicitação deve conter:
```
{
  {
  "name": "johnDoe",
  "email": "john@doe.com",
  "password": "123456"
}
}
```

#### <span style='font-weight:bold;'>POST</span> /signIn

Rota que permitirá ao usuário fazer login. Se não houver nenhum usuário com o e-mail cadastrado retornará um erro de código de status 404, se a senha não corresponder às fornecidas no cadastro, retornará um erro de código de status 401. Ele dará um token como resposta.

Todas as rotas após o login precisarão de um token de autenticação:
```
headers: { Authorization: `Bearer ${token}` }
```

#### <span style='font-weight:bold;'>POST</span> /transactions

Cria uma nova transação de receita ou despesa. Todos os campos são obrigatórios e não podem ficar vazios. A solicitação deve incluir um token como cabeçalho. Se algum dos campos estiver vazio, a API retornará um erro de código de status 422 e uma mensagem de erro indicando que todos os campos são obrigatórios e não podem ficar vazios. Ele retorna um código de status 401 se o token não existir ou se não houver nenhuma conta com esse token. O corpo da solicitação deve conter o seguinte:

```
The request body should be:
    {
        {
        "description": "salario",
        "amount": 1500
        }
    }
Note that if the amount is a whole number that ends with two zeros (e.g., 1200), do not include a decimal point. Otherwise, if it is a floating-point number or has one zero at the end (e.g., 275.5), include the decimal point.
```

#### <span style='font-weight:bold;'>GET</span> /transactions

Recupera uma lista das transações de receitas e despesas do usuário. Se não houver transações, ele retornará um array vazio. O corpo da resposta é assim:

```
The date format is: (DD/MM)
[
    {
        "_id": "644438f94af2cf105bd042b5",
        "userId": "64443438f3722b44d6394f74",
        "description": "salário",
        "type": "entrada",
        "amount": 1500.89,
        "date": "10/06"
    },
    {
        "_id": "644439144af2cf105bd042b6",
        "userId": "64443438f3722b44d6394f74",
        "description": "conta de luz",
        "type": "saída",
        "amount": 150.1,
        "date": "12/06"
    }
]
```

<hr/>

## Funcionamento:

Para baixar e configurar o projeto, siga estas etapas:

1. Clone o repositório front-end: git clone https://github.com/FellipeLimaT/my_wallet.git
2. Clone o repositório back-end: git clone https://github.com/FellipeLimaT/my_wallet_API.git
3. Instale as dependências para ambos os repositórios usando *npm install*
4. Crie um arquivo *.env* na raiz do diretório back-end, contendo as seguintes variáveis:
    `
      MONGO_URI=<your-mongodb-uri>
      PORT=5000
    `
5. Inicie o servidor backend executando npm start no diretório backend.
6. Inicie o servidor front-end executando npm start no diretório front-end.
7. Acesse o aplicativo em seu navegador em http://localhost:8000

Nota: Este projeto requer que o MongoDB esteja instalado e em execução. Se você não o tiver instalado, siga as instruções no site (https://www.mongodb.com/try/download/community).

  

