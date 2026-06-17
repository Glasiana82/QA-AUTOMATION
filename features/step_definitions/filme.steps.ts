import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Dialog } from '@playwright/test';

Given('que estou logado como administrador', async function() {
  const page = this.page;

  await page.goto('http://localhost:5500/index.html');
  await page.waitForTimeout(1000);

  await page.locator('#email').fill('admin@sessao.com');
  await page.waitForTimeout(200);
  await page.locator('#senha').fill('1234');
  await page.waitForTimeout(200);
  await page.locator('#btn-login').click();
  await page.waitForTimeout(2000);

  // Agora deve estar na tela inicial com o projetor
  await expect(page.locator('#btn-cadastrar-novo')).toBeVisible();
});

When('faço login com email {string} e senha {string}', async function(email: string, senha: string) {
  const page = this.page;
  
  await page.goto('http://localhost:5500/index.html');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'E-mail ( )' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'E-mail ( )' }).fill(email);
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'E-mail ( )' }).press('Tab');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Senha (1234)' }).fill(senha);
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Senha (1234)' }).press('Tab');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'ENTRAR' }).click();
  await page.waitForTimeout(2000);

  // Verificar que está na tela inicial (com botão "CADASTRAR FILME")
  await expect(page.locator('#btn-cadastrar-novo')).toBeVisible();
});

When('vou para a tela de cadastro de filmes', async function() {
  const page = this.page;
  
  // Clicar no botão "CADASTRAR FILME" na tela inicial
  await page.locator('#btn-cadastrar-novo').click();
  await page.waitForTimeout(1000);

  // Verificar que está na tela de cadastro
  await expect(page.locator('#btn-cadastrar')).toBeVisible();
});

When('cadastro um filme com:', async function(dataTable: DataTable) {
  const page = this.page;
  const dados = dataTable.rowsHash();

  await page.waitForSelector('#titulo', { state: 'visible', timeout: 30000 });
  await page.locator('#titulo').click();
  await page.locator('#titulo').fill(dados['título']);
  await page.waitForTimeout(500);

  await page.locator('#ano').click();
  await page.locator('#ano').fill(dados['ano']);
  await page.waitForTimeout(500);

  await page.locator('#genero').click();
  await page.locator('#genero').fill(dados['gênero']);
  await page.waitForTimeout(500);

  await page.locator('#diretor').click();
  await page.locator('#diretor').fill(dados['diretor']);
  await page.waitForTimeout(500);

  //await page.locator('#status').click();
  //await page.locator('#status').fill(dados['status']);
  //await page.waitForTimeout(500);

  page.once('dialog', (dialog: Dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  await page.locator('#btn-cadastrar').click();
  await page.waitForTimeout(1000);
  
  // Após cadastro, o sistema redireciona automaticamente para a lista de filmes
  // Esperar que a tabela de filmes fique visível (confirma que o cadastro foi realizado)
  await page.locator('tbody#tabela-filmes-lista').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(1000);
  
  // armazenar o identificador do filme para uso posterior (deletar)
  (this as any).lastMovie = `${dados['título']} ${dados['ano']} ${dados['gênero']} ${dados['diretor']}`;
});

Then('o filme deve aparecer na lista com:', async function(dataTable: DataTable) {
  const page = this.page;
  const dados = dataTable.rowsHash();
  
  const rowName = `${dados['título']} ${dados['ano']} ${dados['gênero']} ${dados['diretor']}`;
  
  // DEBUG: Verificar quantas linhas existem na tabela
  const allRows = await page.locator('tbody#tabela-filmes-lista tr').count();
  console.log(`[DEBUG] Encontradas ${allRows} linhas na tabela`);
  console.log(`[DEBUG] Procurando por: "${rowName}"`);
  
  // DEBUG: Screenshot para visualizar o estado da página
  await page.screenshot({ path: 'debug-filme-lista.png' });
  console.log(`[DEBUG] Screenshot salvo em: debug-filme-lista.png`);
  
  const rowLocator = page.locator(
  'tbody#tabela-filmes-lista tr',
  { hasText: rowName }
).first();


// valida que o filme apareceu na lista
await expect(rowLocator).toBeVisible({ timeout: 10000 });


// valida status se informado no Gherkin
if (dados['status']) {
  await expect(rowLocator).toContainText(dados['status']);
}

  // ===== EXTRAIR O ID DO FILME PELA LINHA ENCONTRADA =====
  const filmeId = await rowLocator.first().evaluate((element: any) => element.id);
  console.log(`📍 ID do filme encontrado: ${filmeId}`);
  
  // Armazenar o ID para uso posterior
  (this as any).filmeId = filmeId;

  await page.waitForTimeout(3000);
});

When('vou para a lista de filmes', async function() {
  const page = this.page;
  
  // Clicar no botão "LISTAR FILMES" na tela de cadastro
  await page.locator('#btn-listar').click();
  await page.waitForTimeout(2000);

  // Verificar que está na tela de lista
  await expect(page.locator('#btn-voltar')).toBeVisible();
});

Then('posso deletar o filme da lista', async function() {
  const page = this.page;

  page.once('dialog', (dialog: Dialog) => {
    dialog.accept();
  });

  const filmeId = (this as any).filmeId;

  if (!filmeId) {
    throw new Error('filmeId não definido — certifique-se que o filme foi encontrado antes');
  }

  console.log(`🗑️ Deletando filme com ID: ${filmeId}`);

  // Localiza a linha pelo ID
  const row = page.locator(`#${filmeId}`);

  await expect(row).toBeVisible();

  // Garante que o botão está disponível
  const deleteButton = row.locator('button', { hasText: 'DELETAR' });

  await deleteButton.waitFor({
    state: 'visible',
    timeout: 10000
  });

  await deleteButton.click();

  await page.waitForTimeout(1000);


  // valida que sumiu
  await expect(row).not.toBeVisible({
    timeout: 5000
  });

  console.log(`✅ Filme ${filmeId} deletado com sucesso!`);
});
  

Then('saio da aplicação', async function(this: any) {
  const page = this.page;
  
  // Clicar no botão SAIR
  await page.locator('#btn-logout').click();
  await page.waitForTimeout(2000);
  
  // Verificar que voltou para a tela de login
  await expect(page.locator('#login-container')).toBeVisible();
  
  console.log(`✅ Saída realizada com sucesso!`);
});
