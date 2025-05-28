const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/ranking', (req, res) => {
  const { produto } = req.query;
  if (!produto) {
    return res.status(400).json({ erro: 'Parâmetro "produto" é obrigatório.' });
  }

  // Mock de resposta de 50 anúncios
  const resultado = Array.from({ length: 50 }, (_, i) => ({
    posicao: i + 1,
    titulo: `${produto} Modelo ${i + 1}`,
    preco: `R$ ${(Math.random() * 100 + 20).toFixed(2)}`,
    vendas: Math.floor(Math.random() * 1000),
    tipo: i % 2 === 0 ? 'Clássico' : 'Premium',
    entrega: i % 3 === 0 ? 'Full' : 'Normal',
    catalogo: i % 4 === 0 ? 'Sim' : 'Não',
    data: new Date(Date.now() - i * 86400000).toLocaleDateString('pt-BR')
  }));

  res.json({ resultados: resultado });
});

app.get('/api/posicao', (req, res) => {
  const { produto, url } = req.query;
  if (!produto || !url) {
    return res.status(400).json({ erro: 'Parâmetros "produto" e "url" são obrigatórios.' });
  }

  // Mock de posição
  const posicao = Math.floor(Math.random() * 200) + 1;
  res.json({ produto, url, posicao });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});