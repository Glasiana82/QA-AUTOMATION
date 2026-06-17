# language: pt
Funcionalidade: Cadastro e Aluguel de Filmes
  Como um usuário autenticado
  Quero cadastrar um novo filme no sistema
  Para manter meu catálogo de filmes atualizado
  # Background temporarily removed to keep login inside the scenario

  Cenário:Fazer login e cadastrar e alugar um filme com sucesso
    Quando faço login com email "admin@sessao.com" e senha "1234"
    E vou para a tela de cadastro de filmes
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
      | status  | Liberado           |
    
    Quando alugo o filme "A Busca pela Vida"

    Então deve aparecer a confirmação de aluguel

    E o status do filme "A Busca pela Vida" deve ser "Alugado"

    E saio da aplicação


