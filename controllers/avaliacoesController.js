import prisma from '../prisma/client.js';

export async function listarAvaliacoes(req, res) {
  try {
      const avaliacoes = await prisma.avaliacao.findMany({
            include: { produto: { select: { id: true, nome: true } } },
                  orderBy: { criadoEm: 'desc' },
                      });

                          return res.status(200).json(avaliacoes);
                            } catch (erro) {
                                return res.status(500).json({ erro: 'Erro interno do servidor' });
                                  }
                                  }

                                  export async function buscarAvaliacaoPorId(req, res) {
                                    try {
                                        const id = Number(req.params.id);

                                            const avaliacao = await prisma.avaliacao.findUnique({
                                                  where: { id },
                                                        include: { produto: { select: { id: true, nome: true } } },
                                                            });

                                                                if (!avaliacao) {
                                                                      return res.status(404).json({ erro: 'Avaliação não encontrada' });
                                                                          }

                                                                              return res.status(200).json(avaliacao);
                                                                                } catch (erro) {
                                                                                    return res.status(500).json({ erro: 'Erro interno do servidor' });
                                                                                      }
                                                                                      }

                                                                                      export async function criarAvaliacao(req, res) {
                                                                                        try {
                                                                                            const { descricao, quantEstrelas, midia, destaque, nomeCliente, fotoCliente, produtoId } = req.body;

                                                                                                if (!descricao || quantEstrelas === undefined || !nomeCliente || !produtoId) {
                                                                                                      return res.status(400).json({ erro: 'Campos obrigatórios: descricao, quantEstrelas, nomeCliente, produtoId' });
                                                                                                          }

                                                                                                              const avaliacao = await prisma.avaliacao.create({
                                                                                                                    data: {
                                                                                                                            descricao,
                                                                                                                                    quantEstrelas,
                                                                                                                                            midia,
                                                                                                                                                    destaque: destaque ?? false,
                                                                                                                                                            nomeCliente,
                                                                                                                                                                    fotoCliente,
                                                                                                                                                                            produtoId,
                                                                                                                                                                                  },
                                                                                                                                                                                      });

                                                                                                                                                                                          return res.status(201).json(avaliacao);
                                                                                                                                                                                            } catch (erro) {
                                                                                                                                                                                                return res.status(500).json({ erro: 'Erro interno do servidor' });
                                                                                                                                                                                                  }
                                                                                                                                                                                                  }

                                                                                                                                                                                                  export async function atualizarAvaliacao(req, res) {
                                                                                                                                                                                                    try {
                                                                                                                                                                                                        const id = Number(req.params.id);
                                                                                                                                                                                                            const { descricao, quantEstrelas, midia, destaque, nomeCliente, fotoCliente, produtoId } = req.body;

                                                                                                                                                                                                                const avaliacaoExistente = await prisma.avaliacao.findUnique({ where: { id } });
                                                                                                                                                                                                                    if (!avaliacaoExistente) {
                                                                                                                                                                                                                          return res.status(404).json({ erro: 'Avaliação não encontrada' });
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                  const avaliacao = await prisma.avaliacao.update({
                                                                                                                                                                                                                                        where: { id },
                                                                                                                                                                                                                                              data: { descricao, quantEstrelas, midia, destaque, nomeCliente, fotoCliente, produtoId },
                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                      return res.status(200).json(avaliacao);
                                                                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                                                                            return res.status(500).json({ erro: 'Erro interno do servidor' });
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                              export async function deletarAvaliacao(req, res) {
                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                    const id = Number(req.params.id);

                                                                                                                                                                                                                                                                        const avaliacaoExistente = await prisma.avaliacao.findUnique({ where: { id } });
                                                                                                                                                                                                                                                                            if (!avaliacaoExistente) {
                                                                                                                                                                                                                                                                                  return res.status(404).json({ erro: 'Avaliação não encontrada' });
                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                          await prisma.avaliacao.delete({ where: { id } });

                                                                                                                                                                                                                                                                                              return res.status(204).send();
                                                                                                                                                                                                                                                                                                } catch (erro) {
                                                                                                                                                                                                                                                                                                    return res.status(500).json({ erro: 'Erro interno do servidor' });
                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                      }