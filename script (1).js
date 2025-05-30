
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!query) return;

  try {
    const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=50`);
    const data = await res.json();
    if (data.results.length === 0) {
      resultsContainer.innerHTML = "<p class='col-span-full text-center text-gray-500'>Nenhum resultado encontrado.</p>";
      return;
    }

    data.results.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-lg shadow-md p-4";
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-48 object-contain mb-2">
        <h2 class="text-lg font-semibold mb-1">${product.title}</h2>
        <p class="text-green-600 font-bold mb-1">R$ ${product.price.toFixed(2)}</p>
        <p class="text-sm text-gray-600 mb-2">Vendedor: ${product.seller.nickname || "N/A"}</p>
        <a href="${product.permalink}" target="_blank" class="text-blue-600 hover:underline">Ver no Mercado Livre</a>
      `;
      resultsContainer.appendChild(card);
    });
  } catch (error) {
    resultsContainer.innerHTML = "<p class='col-span-full text-center text-red-500'>Erro ao buscar dados.</p>";
  }
});
