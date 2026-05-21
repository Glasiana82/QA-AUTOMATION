import { test, expect } from '@playwright/test';

test('deve fazer login e cadastrar um filme com sucesso', async ({ page }) => {
    // ABRE O SITE USANDO O ENDEREÇO DO LIVE SERVER
    await page.goto('http://localhost:5500/index.html');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'E-mail ( )' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'E-mail ( )' }).fill('admin@sessao.com');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'E-mail ( )' }).press('Tab');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Senha (1234)' }).fill('1234');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Senha (1234)' }).press('Tab');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'ENTRAR' }).click();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', { name: 'Título do Filme' }).click();
    await page.getByRole('textbox', { name: 'Título do Filme' }).fill('A Busca');
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Ano de Lançamento').click();
    await page.getByPlaceholder('Ano de Lançamento').fill('1986');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Gênero' }).click();
    await page.getByRole('textbox', { name: 'Gênero' }).fill('Romance');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Diretor' }).click();
    await page.getByRole('textbox', { name: 'Diretor' }).fill('John Hughes');
    await page.waitForTimeout(500);
    
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => {});
    });
    
    await page.getByRole('button', { name: 'ADICIONAR À LISTA' }).click();

    await expect(page.getByRole('row', { name: 'A Busca 1986 Romance John Hughes' })).toBeVisible();
    
    // ESPERA 3 SEGUNDOS PARA VER O FILME CADASTRADO NA LISTA
    await page.waitForTimeout(3000);

  page.once('dialog', dialog => dialog.accept());
  await page
    .getByRole('row', { name: 'A Busca 1986 Romance John Hughes' })
    .getByRole('button', { name: 'DELETAR' })
    .click();

  await page.waitForTimeout(1500); // espera para ver a mensagem de exclusão
  await expect(page.getByRole('row', { name: 'A Busca 1986 Romance John Hughes' })).toHaveCount(0);

    // ESPERA 7 SEGUNDOS (7000 milissegundos)
    await page.waitForTimeout(7000);

});