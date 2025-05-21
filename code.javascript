card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/150?text=No+Image';" />
    <button class="favorite-btn${isFavorite(product.id) ? ' active' : ''}" aria-label="Toggle favorite" data-id="${product.id}">&hearts;</button>
    <div class="product-name">${product.name}</div>
    <div class="product-price">RM ${product.price.toFixed(2)}</div>
    <button class="add-btn" data-id="${product.id}">Add to Cart</button>
`;
productsContainer.appendChild(card);
