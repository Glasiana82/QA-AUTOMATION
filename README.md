# 🎬 Cine Nostalgia - Playwright Automation Lab

Este repositório é um projeto de portfólio focado em automação de testes de ponta a ponta (E2E) utilizando **Playwright** e **TypeScript**. O cenário de testes baseia-se em um sistema de "Catálogo de Filmes da Sessão da Tarde", desenvolvido com uma estética retrô dos anos 80/90.

## 🎯 Objetivo do Projeto
O foco principal é demonstrar a aplicação de boas práticas de automação, como o uso de seletores semânticos, validações de fluxo completo (Input -> Processamento -> UI Output) e a implementação de uma pipeline de Integração Contínua (CI).

## 👨‍💻 Sobre o Autor
Sou um **Especialista em QA com foco em Dynamics 365**, com sólida experiência em garantir a qualidade em implementações complexas de CRM e ERP no ecossistema Microsoft. 

Atualmente, estou expandindo meu toolkit técnico para dominar frameworks de automação modernos e arquiteturas baseadas em código (Testing as Code), unindo minha expertise em processos de negócios do Dynamics com a agilidade e escalabilidade do Playwright.

## 🛠️ Tecnologias e Ferramentas

- **Playwright:** Framework principal para automação multi-browser (Chromium, Firefox, WebKit).
- **TypeScript:** Garantia de tipagem estática e código de teste mais robusto e manutenível.
- **GitHub Actions:** Execução automatizada dos testes a cada commit, garantindo feedback rápido.
- **HTML5/CSS3:** Aplicação customizada com IDs otimizados para testes.

## 🏗️ Estrutura do Projeto

- `index.html`: Web App de catálogo de filmes com visual Nostálgico.
- `tests/`: Scripts de teste organizados por contexto.
  - `catalogo-filmes.spec.ts`: Valida o fluxo de cadastro e listagem na tabela.
  - `sauce-demo.spec.ts`: Demonstração de interação com aplicações externas.
- `.github/workflows/`: Configuração da pipeline de CI.

## 🚀 Como Executar os Testes

1. **Clonar o repositório:**
   ```bash
   git clone [url-do-seu-repositorio]
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Instalar os navegadores do Playwright:**
   ```bash
   npx playwright install
   ```

4. **Executar todos os testes:**
   ```bash
   npx playwright test
   ```

5. **Abrir o relatório de testes:**
   ```bash
   npx playwright show-report
   ```

---
*Projetado para unir a paixão pelos clássicos com a precisão da engenharia de qualidade moderna.*
