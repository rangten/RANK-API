const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/rank", async (req, res) => {
    const { q } = req.query;
    try {
        const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=10`;
        const response = await axios.get(url);
        const items = response.data.results.map(item => ({
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            seller: item.seller?.nickname || "Desconhecido",
            listing_type_id: item.listing_type_id,
            shipping: item.shipping?.logistic_type || "Padrão",
            permalink: item.permalink
        }));
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar dados." });
    }
});

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
});