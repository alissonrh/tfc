<h1 align="center">Projeto Trybe Futebol Clube</h1>

## Descrição

O projeto Trybe Futebol Clube é um site informativo sobre partidas e classificações de futebol. Para adiconar partidas e editar goals é necessário ter um `token`, portanto o usuario precisa estar logado para fazer as alterações. 

## Tecnologias e Ferramentas

Este projeto **FullStack** foi desenvolvido em ambiente `Docker`, para que atravez do *docker-compose* as aplicações funcionem consumindo um banco de dados `MySQL`. A API foi desenvolvida utilizando o método TDD (_Test Driven Development_), utilizando `Mocha`, `Chai` e `Sinon`. A escrito do código foi de acordo com o paradgmada da _Programação Orientada a Objetos_. O back-end foi construido utilizando `TypeScript`, `Node.js`, `Express`, a biblioteca `JWT` para gerar o token de usuario e a biblioteca `Bcrypt` criptografar senha do usuario no banco de dados. A para modelagem dos dados foi feita através do `Sequelize`. O desenvolvimento respeitou regras de negócio providas no projeto, com a finalidade da API ser capaz de ser consumida pelo front-end provido nesse projeto pela [Trybe](https://www.betrybe.com/).

## Preview 

O deploy do projeto foi feito usando Railway.app + Vercel e pode ser encontrado [clicando aqui](https://tfc-vercel.vercel.app/leaderboard). Para interagir editando partidas e goals utilize: 

```
 Login: admin@admin.com
 Senha: secret_admin
```

## Instalando e executando o aplicativo com Docker

```
 git clone git@github.com:alissonrh/tfc
 cd tfc
 npm run compose:up
```


<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->