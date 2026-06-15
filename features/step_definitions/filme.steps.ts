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

  await expect(page.locator('#btn-cadastrar')).toBeVisible();
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

  page.once('dialog', (dialog: Dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  await page.locator('#btn-cadastrar').click();
  await page.waitForTimeout(1000);
  // armazenar o identificador do filme para uso posterior (deletar)
  (this as any).lastMovie = `${dados['título']} ${dados['ano']} ${dados['gênero']} ${dados['diretor']}`;
});

Then('o filme deve aparecer na lista com:', async function(dataTable: DataTable) {
  const page = this.page;
  const dados = dataTable.rowsHash();
  
  const rowName = `${dados['título']} ${dados['ano']} ${dados['gênero']} ${dados['diretor']}`;
  
  const rowLocator = page.locator('tbody#tabela-filmes-lista tr', { hasText: rowName }).first();
  await expect(rowLocator).toBeVisible();

  await page.waitForTimeout(3000);
});

Then('posso deletar o filme da lista', async function() {
  const page = this.page;
  page.once('dialog', (dialog: Dialog) => dialog.accept());

  const rowName = (this as any).lastMovie;
  if (!rowName) {
    throw new Error('lastMovie não definido — certifique-se que o filme foi cadastrado anteriormente');
  }

  const row = page.locator('tbody#tabela-filmes-lista tr', { hasText: rowName }).first();
  await expect(row).toBeVisible();

  // clicar no botão DELETAR dentro da linha específica
  await row.locator('button', { hasText: 'DELETAR' }).click();
  await page.waitForTimeout(1000);
});
