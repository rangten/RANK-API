
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 RankML API está no ar!");
});

app.post("/ranking", async (req, res) => {
  const { termo } = req.body;
  // Simulando retorno de API com base no termo de busca
  const mockResults = Array.from({ length: 5 }, (_, i) => ({
    titulo: `${termo} ${i + 1}`,
    preco: `R$ ${(Math.random() * 100 + 50).toFixed(2)}`,
    vendas: Math.floor(Math.random() * 1000),
    tipo: "Clássico",
    entrega: "Full",
    catalogo: "Sim",
    data: new Date().toLocaleDateString("pt-BR")
  }));
  res.json(mockResults);
});

app.post("/posicao", async (req, res) => {
  const { termo, titulo } = req.body;
  const lista = Array.from({ length: 50 }, (_, i) => ({
    titulo: `${termo} ${i + 1}`,
  }));
  const posicao = lista.findIndex(item => item.titulo === titulo);
  res.json({
    posicao: posicao >= 0 ? posicao + 1 : null,
    total: lista.length
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
