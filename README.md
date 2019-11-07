<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 5: Primeiro projeto com ReactJS
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-05?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

# repo-finder
Single Page Application para conectar com a API do GitHub, listar e detalhar informações de repositórios.

Desenvolvida com ReactJS, utilizando as seguintes tecnologias:

- **axios**: realizar requisições para a API;
- **prop-types**: checagem de tipos;
- **react-dom**: renderizar elementos do React no DOM;
- **react-icons**: utilização e ícones;
- **react-router-dom**: roteamento;
- **styled-components**: estilização de componentes;
- **react-toastify**: pop-ups para tratamendo de requisições, validação de campos ou mesmo informar ao usuário que algo está acontecendo; **[PLUS]**

## :rocket: O desafio

Adicionar novas funcionalidades na aplicação desenvolvida ao longo do módulo.

### Funcionalidades

#### 1. Captando erros

- [ ] Adicione um `try/catch` por volta do código presente na função `handleSubmit` presente no componente `Main` e caso um repositório não seja encontrado na API do Github adicione uma borda vermelha por volta do input em que o usuário digitou o nome do repositório.

#### 2. Repositório duplicado

- [ ] Antes de fazer a chamada à API na função `handleSubmit` faça uma verificação para ver se o repositório não está duplicado, ou seja, se ele ainda não existe no estado de `repositories`.

Caso exista, dispare um erro, e com isso o código cairá no `catch` do `try/catch` criado na funcionalidade anterior.

```js
throw new Error('Repositório duplicado');
```

#### 3. Filtro de estado

- [ ] Adicione um filtro de estado na listagem de Issues que criamos no detalhe do repositório. O estado representa se a issue está em aberto, fechada ou uma opção para exibir todas.

Exemplos de requisição:

```
https://api.github.com/repos/rocketseat/unform/issues?state=all
https://api.github.com/repos/rocketseat/unform/issues?state=open
https://api.github.com/repos/rocketseat/unform/issues?state=closed
```

Você pode encontrar a documentação [nesse link](https://developer.github.com/v3/issues/#parameters-1);

#### 4. Paginação

- [ ] Adicione paginação nas issues listadas no detalhe do repositório. A API do Github lista no máximo 30 issues por página e você pode controlar o número da página atual por um parâmetro no endereço da requisição:

```
https://api.github.com/repos/rocketseat/unform/issues?page=2
```

Adicione apenas um botão de próxima página e página anterior. O botão de página anterior deve ficar desativado na primeira página.


## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.


