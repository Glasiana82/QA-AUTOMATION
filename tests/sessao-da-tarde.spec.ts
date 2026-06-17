import { test, expect } from '@playwright/test';

test('deve fazer login e cadastrar um filme com sucesso', async ({ page }) => {
    // ABRE O SITE USANDO O ENDEREÇO DO LIVE SERVER
    await page.goto('http://localhost:5500/index.html');
    await page.waitForTimeout(1000);

    // ===== GERAR TÍTULO ÚNICO PARA ESTE TESTE =====
    const randomId = Math.random().toString(36).substring(7);
    const filmeTitle = `Teste-${randomId}`;
    const filmeAno = '2024';
    const filmeGenero = 'Drama';
    const filmeDiretor = 'Test Director';

    // ===== FAZER LOGIN =====
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

    // ===== AGORA ESTÁ NA TELA INICIAL (COM PROJETOR) =====
    // Clicar no botão "CADASTRAR FILME" para ir para a tela de cadastro
    await page.getByRole('button', { name: 'CADASTRAR FILME' }).click();
    await page.waitForTimeout(1500);

    // ===== PREENCHER FORMULÁRIO DE CADASTRO =====
    await page.getByRole('textbox', { name: 'Título do Filme' }).click();
    await page.getByRole('textbox', { name: 'Título do Filme' }).fill(filmeTitle);
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Ano de Lançamento').click();
    await page.getByPlaceholder('Ano de Lançamento').fill(filmeAno);
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Gênero' }).click();
    await page.getByRole('textbox', { name: 'Gênero' }).fill(filmeGenero);
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Diretor' }).click();
    await page.getByRole('textbox', { name: 'Diretor' }).fill(filmeDiretor);
    await page.waitForTimeout(500);
    
    // ===== CADASTRAR FILME =====
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => {});
    });
    
    // Botão agora é "CADASTRAR FILME" (não "ADICIONAR À LISTA")
    await page.getByRole('button', { name: 'CADASTRAR FILME' }).click();
    await page.waitForTimeout(2000);

    // ===== APÓS CADASTRAR, O SISTEMA VAI AUTOMATICAMENTE PARA A LISTA =====
    // Não precisa clicar "LISTAR FILMES" - já está na lista!

    // ===== VERIFICAR QUE O FILME APARECEU NA LISTA =====
    const filmeRow = page.getByRole('row', { name: `${filmeTitle} ${filmeAno} ${filmeGenero} ${filmeDiretor} Liberado ` });
    await expect(filmeRow).toBeVisible();
    
    console.log(`✅ Filme "${filmeTitle}" apareceu na lista!`);
    
    // ESPERA 2 SEGUNDOS PARA VER O FILME CADASTRADO NA LISTA
    await page.waitForTimeout(2000);

    // ===== EXTRAIR O ID DO FILME PELA LINHA ENCONTRADA =====
    const filmeRowElement = await filmeRow.first();
    const filmeId = await filmeRowElement.evaluate((element) => element.id);
    console.log(`📍 ID do filme encontrado: ${filmeId}`);

    // ===== DELETAR O FILME =====
    page.once('dialog', dialog => dialog.accept());
    
    // Usar o seletor de ID para encontrar e deletar
    await page.locator(`#${filmeId}`).getByRole('button', { name: 'DELETAR' }).click();
    
    await page.waitForTimeout(1500);

    // ===== VERIFICAR QUE O FILME FOI DELETADO =====
    await expect(page.locator(`#${filmeId}`)).not.toBeVisible({ timeout: 5000 });
    
    console.log(`✅ Filme "${filmeTitle}" foi deletado com sucesso!`);
    console.log('✅ Teste concluído com sucesso!');
});