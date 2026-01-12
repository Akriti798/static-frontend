window.addEventListener("load", () => {
  const hero = document.getElementById("heroSection");
  hero.classList.remove("loading");
});
function searchProducts() {
  const input = document.getElementById("productSearch").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const name = product.getAttribute("data-name");

    if (name.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
let quantity = 1;
const pricePerItem = 30; // price of 1 bread

function openCart() {
  quantity = 1;
  updateSummary();
  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function increaseQty() {
  quantity++;
  updateSummary();
}

function decreaseQty() {
  if (quantity > 1) {
    quantity--;
    updateSummary();
  }
}

function updateSummary() {
  document.getElementById("qty").innerText = quantity;

  // Item text: 1 Bread / 2 Breads
  document.getElementById("itemSummary").innerText =
    quantity === 1 ? "1 Bread" : `${quantity} Breads`;

  // Total amount
  document.getElementById("totalAmount").innerText =
    `Total: ₹${quantity * pricePerItem}`;
}
