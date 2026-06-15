# language: pt
Funcionalidade: Cadastro de Filmes
  Como um usuário autenticado
  Quero cadastrar um novo filme no sistema
  Para manter meu catálogo de filmes atualizado
  # Background temporarily removed to keep login inside the scenario

  Cenário: Fazer login e cadastrar um filme com sucesso
    Quando faço login com email "admin@sessao.com" e senha "1234"
    E cadastro um filme com:
      | campo   | valor        |
      | título  | A Busca pela Vida      |
      | ano     | 1986         |
      | gênero  | Romance      |
      | diretor | John Hughes  |
    Então o filme deve aparecer na lista com:
      | campo   | valor        |
      | título  | A Busca pela Vida     |
      | ano     | 1986         |
      | gênero  | Romance      |
      | diretor | John Hughes  |
    # Removido passo de deletar para teste simplificado
