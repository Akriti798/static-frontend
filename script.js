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
