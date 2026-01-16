/* ---------------- PAGE LOAD ---------------- */
window.addEventListener("load", () => {
  const hero = document.getElementById("heroSection");
  if (hero) hero.classList.remove("loading");
});

/* ---------------- SEARCH ---------------- */
function searchProducts() {
  const input = document.getElementById("productSearch").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const name = product.getAttribute("data-name");
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

/* ---------------- AUTH (MOCK OTP) ---------------- */
let isLogin = false;

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("formTitle").innerText =
    isLogin ? "Login" : "Register";

  document.getElementById("name").classList.toggle("hidden", isLogin);
  document.getElementById("email").classList.toggle("hidden", isLogin);

  document.querySelector(".toggle-text").innerText =
    isLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login";
}

function sendOtp() {
  const phone = document.getElementById("phone").value;
  if (!phone) {
    alert("Please enter phone number");
    return;
  }

  alert("OTP sent successfully! (Use 123456)");
  document.getElementById("otpSection").classList.remove("hidden");
}

function verifyOtp() {
  const otp = document.getElementById("otp").value;
  const phone = document.getElementById("phone").value;

  if (otp !== "123456") {
    alert("Invalid OTP");
    return;
  }

  const user = {
    name: document.getElementById("name")?.value || "User",
    email: document.getElementById("email")?.value || "",
    phone,
    role: "customer"
  };

  localStorage.setItem("token", "MOCK_JWT_TOKEN");
  localStorage.setItem("user", JSON.stringify(user));

  window.location.href = "home.html";
}

/* ---------------- ADD TO CART ---------------- */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name,
      price,
      qty: 1,
      image
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}


/* ---------------- USER MENU ---------------- */
function toggleMenu() {
  const menu = document.getElementById("userMenu");
  if (!menu) return;

  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

/* ---------------- CART PAGE ---------------- */
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const totalDiv = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    totalDiv.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

   container.innerHTML += `
  <div class="cart-item">
    <img src="${item.image}" alt="${item.name}" class="cart-img"/>

    <div class="cart-info">
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>
    </div>

    <div class="qty-control">
      <button onclick="changeQty(${index}, -1)">−</button>
      <span>${item.qty}</span>
      <button onclick="changeQty(${index}, 1)">+</button>
    </div>
  </div>
`;


  });

  totalDiv.innerText = `Total: ₹${total}`;
}

function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  alert("Proceeding to payment...");
}

function continueShopping() {
  window.location.href = "products.html";
}
const msg = document.createElement("span");
msg.className = "added-msg";
msg.innerText = "✔ Added to cart";
event.target.after(msg);

setTimeout(() => msg.remove(), 1500);
