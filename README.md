# 🎬 Catálogo Sessão da Tarde - Automação de Testes E2E

Este repositório contém a suíte de automação de testes End-to-End (E2E) desenvolvida para o sistema **Catálogo Sessão da Tarde**. O projeto foca em garantir a qualidade e a integridade do fluxo de gerenciamento de filmes clássicos, abrangendo desde a autenticação até operações de CRUD.

## 🚀 Sobre o Projeto

O objetivo deste projeto é aplicar as melhores práticas de Engenharia de QA em uma aplicação moderna. Como **especialista em QA**, este trabalho reflete minha transição e expansão de habilidades para a **automação moderna**, utilizando ferramentas de ponta e explorando o potencial da **IA (Inteligência Artificial)** para otimizar a escrita de scripts, geração de massa de dados e análise de cobertura.

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework de Testes:** [Playwright](https://playwright.dev/)
- **Backend:** Node.js com Express
- **Banco de Dados:** SQL Server (Executado via Docker)
- **CI/CD:** GitHub Actions

## 📋 Cenários de Teste Implementados

A suíte de testes valida os seguintes requisitos de negócio:
1.  **Autenticação:** Login seguro no portal administrativo.
2.  **Cadastro de Filmes:** Inclusão de novos títulos (Título, Ano, Gênero, Diretor).
3.  **Validação de Listagem:** Garantia de que os dados persistidos no banco de dados são exibidos corretamente na UI.
4.  **Exclusão de Registros:** Remoção de filmes com limpeza de estado.

## 🔧 Configuração e Execução

### Pré-requisitos
*   Node.js (LTS)
*   Docker (para o banco de dados SQL Server)
*   Extensão do Playwright (opcional, para VS Code)

### Instalação

```bash
# Instalar dependências
npm install

# Instalar navegadores do Playwright
npx playwright install
```

### Executando os Testes

```bash
# Executar todos os testes em modo headless
npx playwright test

# Executar testes com interface visual (UI Mode)
npx playwright test --ui
```

## 📈 Continuous Integration

O projeto está integrado ao **GitHub Actions**, executando a suíte de testes automaticamente a cada `push` ou `pull_request` nos branches principais. O pipeline garante que as novas funcionalidades não quebrem o comportamento existente.

---

## 🧑‍💻 Sobre Mim

Sou uma especialista em QA dedicada a elevar o padrão de qualidade de software através da automação inteligente. Atualmente, foco em unir a experiência em testes manuais e estratégicos com tecnologias emergentes de automação e IA para entregar ciclos de feedback mais rápidos e precisos.

---
*Desenvolvido para fins de estudo e aprimoramento profissional.*
