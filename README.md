# 🎬 Catálogo Sessão da Tarde - Automação de Testes E2E

Este repositório contém uma aplicação de catálogo de filmes com uma suíte de testes automatizados End-to-End (E2E).
O projeto foi desenvolvido com foco em práticas de QA, validando fluxos de negócio completos da aplicação, desde o cadastro de filmes até o processo de aluguel.
A automação foi construída inicialmente utilizando Playwright e posteriormente evoluída para uma abordagem BDD (Behavior Driven Development) utilizando Gherkin + Cucumber, aproximando os cenários automatizados da linguagem de negócio.


## 🚀 Sobre o Projeto

O objetivo deste projeto é aplicar as melhores práticas de Engenharia de QA em uma aplicação moderna. Como **especialista em QA**, este trabalho reflete minha transição e expansão de habilidades para a **automação moderna**, utilizando ferramentas de ponta e explorando o potencial da **IA (Inteligência Artificial)** para otimizar a escrita de scripts, geração de massa de dados e análise de cobertura.
Este projeto envolve:
- Interface web
- API backend
- Banco de dados
- Testes automatizados E2E
- Cenários orientados a comportamento (BDD)

## 🛠️ Tecnologias Utilizadas

### Aplicação
- HTML / CSS / JavaScript
- Node.js
- Express
- SQL Server
- Docker

### Automação de Testes

- Playwright (Testes E2E)
- Cucumber
- Gherkin (BDD)

### Outros

- GitHub Actions (CI/CD)
- Git
- npm


# 📋 Funcionalidades Testadas

A suíte automatizada valida os principais fluxos da aplicação:

## Cadastro de Filmes

Validação da criação de novos filmes:

- Título
- Ano
- Gênero
- Diretor

## Listagem de Filmes

Validação de:

- Exibição dos filmes cadastrados
- Persistência dos dados no banco
- Status atual do filme

## Exclusão de Filmes

Validação da remoção de registros.

## Aluguel de Filmes

Validação do fluxo:

- Seleção do filme disponível
- Confirmação do aluguel
- Atualização do status para "Alugado"
- Persistência da alteração

---

# 🧪 Estratégia de Automação

O projeto possui dois tipos de automação:

## 1. Playwright E2E

Primeira implementação de automação utilizando Playwright.

Objetivo:

- Validar o fluxo completo da aplicação
- Interagir com a interface
- Garantir funcionamento ponta a ponta

Execução:

```bash
npx playwright test
```

## 2. BDD com Cucumber + Gherkin

Evolução da automação utilizando cenários escritos em linguagem próxima ao negócio.

```gherkin
Funcionalidade: Aluguel de filmes
  Cenário: Alugar um filme disponível
    Dado que existe um filme liberado para aluguel
    Quando o usuário confirma o aluguel
    Então o status do filme deve ser alterado para alugado
```

Execução:
```bash
npm run test:cucumber
```

## 🔧 Configuração e Execução

### Pré-requisitos
- Node.js (LTS)
- Docker
- SQL Server
- Git

### Instalação

1. Instalar dependências:

```bash
npm install
```

2. Instalar navegadores Playwright:

```bash
npx playwright install
```

### Executando a aplicação

1. **Subir o banco:** Docker Desktop
2. **Iniciar backend:**

```bash
npm run dev
```

3. **Iniciar frontend:**

```bash
http-server -p 5500
```

📈 Continuous Integration

O projeto possui integração com GitHub Actions para execução automática dos testes em cada alteração do código.

O pipeline ajuda a garantir que novas funcionalidades não quebrem comportamentos existentes.



## 🧑‍💻 Sobre Mim

Sou uma especialista em QA dedicada a elevar o padrão de qualidade de software através da automação inteligente. Atualmente, foco em unir a experiência em testes manuais e estratégicos com tecnologias emergentes de automação e IA para entregar ciclos de feedback mais rápidos e precisos.

---
*Desenvolvido para fins de estudo e aprimoramento profissional.*
