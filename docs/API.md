# API do Restaurante Dona Cida — Documentação de Endpoints

    Base URL (produção): `...`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senha` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

## Usuários Administrativos

  ### GET /user

    Lista todos os usuários administrativos.

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    [
      {
        "id": 1,
        "login": "maria12345",
        "nome": "Maria Cristina",
        "email": "maria12345@gmail.com",
        "criadoEm": "2026-07-11T20:04:14.382Z"
      },
      {
        "id": 2,
        "login": "joao67890",
        "nome": "João Ferreira",
        "email": "joao67890@gmail.com",
        "criadoEm": "2026-07-11T20:42:44.562Z"
      },
      {
        "id": 3,
        "login": "pedro02468",
        "nome": "Pedro Augusto",
        "email": "pedro02468@gmail.com",
        "criadoEm": "2026-07-11T20:04:14.382Z"
      }
    ]
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (usuário não autenticado)


  ### GET /user/:id

    Busca um usuário administrativo pelo ID.

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "login": "maria12345",
      "nome": "Maria Cristina",
      "email": "maria12345@gmail.com",
      "criadoEm": "2026-07-11T20:04:14.382Z"
    }
    ```

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Usuário não encontrado (usuário com ID não existe)


  ### POST /user

    Cria um novo usuário administrativo.

    - **Autenticação:** Bearer token (admin)
    - **Body:**

    ```json
    {
      "login": "maria12345",
      "nome": "Maria Cristina",
      "email": "maria12345@gmail.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "login": "maria12345",
      "nome": "Maria Cristina",
      "email": "maria12345@gmail.com",
      "criadoEm": "2026-07-11T20:04:14.382Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `409` — Login e/ou email já cadastrado


  ### PUT /user/:id

    Atualiza um usuário administrativo pelo ID.

    - **Autenticação:** Bearer token (admin)
    - **Body:**

    ```json
    {
      "login": "maria13579",
      "senha": "minhasenha123",
      "email": "maria13579@gmail.com"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "login": "maria13579",
      "nome": "Maria Cristina",
      "email": "maria13579@gmail.com",
      "criadoEm": "2026-07-11T20:04:14.382Z"
    }
    ```

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Usuário não encontrado (usuário com ID não existe)
      - `409` — Login e/ou email já cadastrado


  ### DELETE /user/:id

    Deleta um usuário administrativo pelo ID.

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `204 Deleted`

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Usuário não encontrado (usuário com ID não existe)


  ### POST /user/login

    Autentica um usuário administrativo e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "login": "maria13579",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `401` — Credenciais inválidas (login não existe ou senha incorreta)

## Produtos
  
  ### GET /produtos

    Lista todos os produtos (em ordem alfabética).

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    [
      {
        "id": 1,
        "nome": "Água Mineral 500ml",
        "foto": "agua.png",
        "destaque": false,
        "categoria": "BEBIDA",
        "preco": 1.25,
        "descricao": "Água Mineral 500ml Grão Mogol sem Gás"
      },
      {
        "id": 2,
        "nome": "Chiclete",
        "foto": "chic.png",
        "destaque": false,
        "categoria": "UNITARIO",
        "preco": 0.75,
        "descricao": "Chiclete Salibalas Sabor Morango"
      },
      {
        "id": 4,
        "nome": "Churrasco",
        "foto": "churrasco.png",
        "destaque": true,
        "categoria": "PRATO_QUILO",
        "preco": 29.9,
        "descricao": "Churrasco com carne bovina, frango e linguiça"
      },
      {
        "id": 5,
        "nome": "Coca-Cola 350ml",
        "foto": "coca.jpg",
        "destaque": true,
        "categoria": "BEBIDA",
        "preco": 6.5,
        "descricao": "Refrigerante Coca-Cola 350ml com Açúcar"
      },
      {
        "id": 3,
        "nome": "Feijoada",
        "foto": "feijoada.png",
        "destaque": false,
        "categoria": "PRATO_FEITO",
        "preco": 19.99,
        "descricao": "Feijoada completa com arroz, farofa, couve e laranja"
      }
    ]
    ```
  
  ### GET /produtos/:id

    Busca um produto pelo ID.

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 5,
      "nome": "Coca-Cola 350ml",
      "foto": "coca.jpg",
      "destaque": true,
      "categoria": "BEBIDA",
      "preco": 6.5,
      "descricao": "Refrigerante Coca-Cola 350ml com Açúcar",
      "avaliacoes": [
        {
          "id": 5,
          "descricao": "Muito gelada e saborosa!",
          "quantEstrelas": 5,
          "midia": null,
          "nomeCliente": "Cristina Alves",
          "fotoCliente": null,
          "criadoEm": "2026-08-07T21:59:49.538Z"
        }
      ]
    }
    ```

    - **Erros:**
      - `400` — ID inválido
      - `404` — Produto não encontrado (produto com ID não existe)
    
  ### POST /produtos

    Cria um novo produto.

    - **Autenticação:** Bearer token (admin)
    - **Body:**

    ```json
    {
      "nome": "Água Mineral 500ml",
      "foto": "agua.png",
      "categoria": "BEBIDA",
      "preco": 1.25,
      "descricao": "Água Mineral 500ml Grão Mogol sem Gás"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Água Mineral 500ml",
      "foto": "agua.png",
      "destaque": false,
      "categoria": "BEBIDA",
      "preco": 1.25,
      "descricao": "Água Mineral 500ml Grão Mogol sem Gás",
      "avaliacoes": []
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes ou preço inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `409` — Nome inválido (duplicado)
    
  ### PUT /produtos/:id

    Atualiza um produto.

    - **Autenticação:** Bearer token (admin)
    - **Body:**

    ```json
    {
      "nome": "Água Mineral 500ml com Gás",
      "descricao": "Água Mineral 500ml Grão Mogol com Gás"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Água Mineral 500ml com Gás",
      "foto": "agua.png",
      "destaque": false,
      "categoria": "BEBIDA",
      "preco": 1.25,
      "descricao": "Água Mineral 500ml Grão Mogol com Gás",
      "avaliacoes": []
    }
    ```

    - **Erros:**
      - `400` — Preço inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Produto não encontrado (produto com ID não existe)
      - `409` — Nome inválido (duplicado)
    
  ### DELETE /produtos/:id

    Deleta um produto pelo ID.

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `204 Deleted`

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Produto não encontrado (produto com ID não existe)

## Avaliações

  ### GET /avaliacoes

    Lista todas as avaliações de produtos (ordena avaliações mais recentes).

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    [
      {
        "id": 5,
        "descricao": "Muito gelada e saborosa!",
        "quantEstrelas": 5,
        "midia": null,
        "destaque": true,
        "nomeCliente": "Cristina Alves",
        "fotoCliente": null,
        "criadoEm": "2026-08-07T21:59:49.538Z",
        "produto": {
          "id": 5,
          "nome": "Coca-Cola 350ml",
          "categoria": "BEBIDA"
        }
      },
      {
        "id": 4,
        "descricao": "Água gelada mas com muito gás.",
        "quantEstrelas": 3,
        "midia": null,
        "destaque": false,
        "nomeCliente": "Pedro Neves",
        "fotoCliente": "pedro.png",
        "criadoEm": "2026-08-07T21:43:26.916Z",
        "produto": {
          "id": 1,
          "nome": "Água Mineral com Gás",
          "categoria": "BEBIDA"
        }
      },
      {
        "id": 3,
        "descricao": "Não há muitas opções de sabores e tem preço alto.",
        "quantEstrelas": 2,
        "midia": "chiclete.png",
        "destaque": false,
        "nomeCliente": "Fabrício Ferreira",
        "fotoCliente": null,
        "criadoEm": "2026-08-07T21:41:55.020Z",
        "produto": {
          "id": 2,
          "nome": "Chiclete",
          "categoria": "UNITARIO"
        }
      },
      {
        "id": 2,
        "descricao": "Feijoada bem temperadinha e completa.",
        "quantEstrelas": 4,
        "midia": null,
        "destaque": true,
        "nomeCliente": "Beatriz Oliveira",
        "fotoCliente": null,
        "criadoEm": "2026-08-07T21:39:58.028Z",
        "produto": {
          "id": 3,
          "nome": "Feijoada",
          "categoria": "PRATO_FEITO"
        }
      },
      {
        "id": 1,
        "descricao": "Ótimo churrasco, carne bem passada!",
        "quantEstrelas": 5,
        "midia": "carne.png",
        "destaque": true,
        "nomeCliente": "João da Silva",
        "fotoCliente": "joao.png",
        "criadoEm": "2026-08-07T21:23:41.898Z",
        "produto": {
          "id": 4,
          "nome": "Churrasco",
          "categoria": "PRATO_QUILO"
        }
      }
    ]
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (usuário não autenticado)
  
  ### GET /avaliacoes/destaque

    Lista as avaliações em destaque (ordena avaliações mais recentes).

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    [
      {
        "id": 5,
        "descricao": "Muito gelada e saborosa!",
        "quantEstrelas": 5,
        "midia": null,
        "destaque": true,
        "nomeCliente": "Cristina Alves",
        "fotoCliente": null,
        "criadoEm": "2026-08-07T21:59:49.538Z",
        "produto": {
          "id": 5,
          "nome": "Coca-Cola 350ml",
          "categoria": "BEBIDA"
        }
      },
      {
        "id": 2,
        "descricao": "Feijoada bem temperadinha e completa.",
        "quantEstrelas": 4,
        "midia": null,
        "destaque": true,
        "nomeCliente": "Beatriz Oliveira",
        "fotoCliente": null,
        "criadoEm": "2026-08-07T21:39:58.028Z",
        "produto": {
          "id": 3,
          "nome": "Feijoada",
          "categoria": "PRATO_FEITO"
        }
      },
      {
        "id": 1,
        "descricao": "Ótimo churrasco, carne bem passada!",
        "quantEstrelas": 5,
        "midia": "carne.png",
        "destaque": true,
        "nomeCliente": "João da Silva",
        "fotoCliente": "joao.png",
        "criadoEm": "2026-08-07T21:23:41.898Z",
        "produto": {
          "id": 4,
          "nome": "Churrasco",
          "categoria": "PRATO_QUILO"
        }
      }
    ]
    ```
    
  ### GET /avaliacoes/:id

    Busca uma avaliação de produto pelo ID.

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 2,
      "descricao": "Feijoada bem temperadinha e completa.",
      "quantEstrelas": 4,
      "midia": null,
      "destaque": true,
      "nomeCliente": "Beatriz Oliveira",
      "fotoCliente": null,
      "criadoEm": "2026-08-07T21:39:58.028Z",
      "produto": {
        "id": 3,
        "nome": "Feijoada",
        "categoria": "PRATO_FEITO"
      }
    }
    ```

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Avaliação não encontrada (avaliação com ID não existe)
    
  ### POST /avaliacoes

    Cria uma nova avaliação de um produto.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "descricao": "Ótimo churrasco, carne bem passada!",
      "quantEstrelas": 5,
      "midia": "carne.png",
      "nomeCliente": "João da Silva",
      "fotoCliente": "joao.png",
      "produtoId": 4
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "descricao": "Ótimo churrasco, carne bem passada!",
      "quantEstrelas": 5,
      "midia": "carne.png",
      "destaque": false,
      "nomeCliente": "João da Silva",
      "fotoCliente": "joao.png",
      "criadoEm": "2026-08-07T21:23:41.898Z",
      "produto": {
        "id": 4,
        "nome": "Churrasco",
        "categoria": "PRATO_QUILO"
      }
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes, ID ou quantidade de estrelas inválido(s)
      - `404` — Produto não encontrado (produto com produtoId não existe)
    
  ### PUT /avaliacoes/:id

    Altera uma avaliação de um produto (muda apenas destaque).

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "descricao": "Ótimo churrasco, carne bem passada!",
      "quantEstrelas": 5,
      "midia": "carne.png",
      "destaque": true,
      "nomeCliente": "João da Silva",
      "fotoCliente": "joao.png",
      "criadoEm": "2026-08-07T21:23:41.898Z",
      "produto": {
        "id": 4,
        "nome": "Churrasco",
        "categoria": "PRATO_QUILO"
      }
    }
    ```

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Avaliação não encontrada (avaliação com ID não existe)
    
  ### DELETE /avaliacoes/:id
    
    Deleta uma avaliação pelo ID.

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `204 Deleted`

    - **Erros:**
      - `400` — ID inválido
      - `401` — Credenciais inválidas (usuário não autenticado)
      - `404` — Avaliação não encontrada (avaliação com ID não existe)

## CORS

Esta API tem CORS habilitado para qualquer origem. Você pode consumi-la de qualquer domínio (localhost, Vercel, etc.) sem configuração adicional no cliente.