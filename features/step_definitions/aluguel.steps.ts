import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Dialog } from '@playwright/test';


When('alugo o filme {string}', async function(titulo: string) {

  const page = this.page;

  const filmeId = (this as any).filmeId;

  if (!filmeId) {
    throw new Error('filmeId não encontrado');
  }

  const row = page.locator(`#${filmeId}`);

  await expect(row).toBeVisible();

  page.once('dialog', async (dialog: Dialog)=> {

  // guarda a mensagem para o Then usar depois
    (this as any).mensagemAluguel = dialog.message();

    console.log(`Mensagem: ${(this as any).mensagemAluguel}`);

    // segura 4 segundos para visualizar
    await page.waitForTimeout(4000);

    await dialog.accept();

  });

   await row
    .getByRole('button', { name: 'ALUGAR' })
    .click();


  // espera atualizar o status na tela
  await page.waitForTimeout(4000);

});

Then('deve aparecer a confirmação de aluguel', async function() {

  const mensagem = (this as any).mensagemAluguel;

  expect(mensagem).toBeTruthy();

  console.log(`✅ Confirmação exibida: ${mensagem}`);

});

Then('o status do filme {string} deve ser {string}', async function(titulo: string, status: string) {

  const page = this.page;

  const filmeId = (this as any).filmeId;

  const row = page.locator(`#${filmeId}`);

  await expect(row).toContainText(status);

  console.log(`✅ Filme "${titulo}" está com status ${status}`);

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
