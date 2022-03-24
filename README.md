# Backend Alma 🐦

Esse é o repositório da REST API do projeto alma. Leia a documentação para mais detalhes:

## Como rodar o projeto

Copie o `.env.example` e renomeie para `.env`

```bash
cp .env.example .env
```

Configure a string de conexão do banco com as suas credenciais:

```text
DATABASE_URL="postgresql://usuario:senha@localhost:5432/banco?schema=public"
```

Instale as dependências com yarn:

```bash
yarn
```

ou use o NPM:

```bash
npm install
```

Inicie o servidor com:

```bash
yarn dev

# Equivalente a npm run dev
```

## Commits:

Tarefas: 
```bash
👷 chore: Descrição da tarefa
```

Documentação: 
```bash
📚 docs: Descrição das alterações
```
Build: 
```bash
⛏️ build: Descrição das alterações para build
```
