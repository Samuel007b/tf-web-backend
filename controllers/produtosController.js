import prisma from '../prisma/client.js';

const selectProduto = {
  id: true,
  nome: true,
  foto: true,
  destaque: true,
  categoria: true,
  preco: true,
  descricao: true
}

const selectProdutoAvaliacao = {
  ...selectProduto,
  avaliacoes: {
    select: {
      id: true,
      descricao: true,
      quantEstrelas: true,
      midia: true,
      nomeCliente: true,
      fotoCliente: true,
      criadoEm: true
    }
  }
}

// GET /produtos - lista todos os produtos
export async function listarProdutos(req, res, next) {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { nome: 'asc' },
      select: selectProduto
    });
    return res.status(200).json(produtos);
  } catch (erro) {
    next(erro); 
  }
};

// GET /produtos/:id - busca um produto pelo id
export async function buscarProduto(req, res, next) {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id)<=0) {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      select: selectProdutoAvaliacao
    });
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    return res.status(200).json(produto);
  } catch (erro) {
    next(erro);
  }
};

// POST /produtos - cria uma novo produto
export async function criarProduto(req, res, next){
  try {
    const { nome, foto, categoria, preco, descricao } = req.body;
    if (!nome || !foto || !categoria || preco == null || preco === '' || !descricao) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }
    if (Number.isNaN(Number(preco)) || Number(preco)<=0) {
      return res.status(400).json({ erro: "Preço inválido" });
    }
    const novoProduto = await prisma.produto.create({
      data: {
        nome: nome,
        foto: foto,
        destaque: false,
        categoria: categoria,
        preco: Number(preco),
        descricao: descricao
      },
      select: selectProdutoAvaliacao
    });
    return res.status(201).json(novoProduto);
  } catch (erro) {
    if(erro.code === "P2002"){
       return res.status(409).json({ erro: "Nome de produto já existente" });
    }
    next(erro);
  }
};

// PUT /produtos/:id - atualiza um produto pelo id
export async function atualizarProduto(req, res, next){
  try {
    const { id } = req.params;
    const { nome, foto, destaque, categoria, preco, descricao } = req.body;
    if (!Number.isInteger(Number(id)) || Number(id)<=0) {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: Number(id) },
      select: selectProduto
    });
    if (!produtoExistente) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    if (preco != null && preco !== '' && (Number.isNaN(Number(preco)) || Number(preco)<=0)) {
      return res.status(400).json({ erro: 'Preço inválido' });
    }
    const novoPreco = (preco != null && preco !== '') ? preco : produtoExistente.preco;
    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome: nome,
        foto: foto,
        destaque: destaque,
        categoria: categoria,
        preco: Number(novoPreco),
        descricao: descricao
      },
      select: selectProdutoAvaliacao
    });
    return res.status(200).json(produtoAtualizado);
  } catch (erro) {
    if (erro.code === "P2025"){
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    if(erro.code === "P2002"){
      return res.status(409).json({ erro: "Nome de produto já existente" });
    }
    next(erro);
  }
};

// DELETE /produtos/:id - deleta um produto pelo id
export async function deletarProduto(req, res, next){
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id)<=0) {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: Number(id) },
      select: selectProdutoAvaliacao
    });
    if (!produtoExistente) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    for(const avaliacao of produtoExistente.avaliacoes){
      await prisma.avaliacao.delete({
        where: { id: Number(avaliacao.id) },
      });
    }
    await prisma.produto.delete({
      where: { id: Number(id) }
    });
    return res.status(204).send(); 
  } catch (erro) {
    if (erro.code === "P2025"){
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    next(erro);
  }
};