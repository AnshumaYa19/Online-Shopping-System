const baseURL = "http://localhost:5000";

// Fetch and display customers
async function fetchCustomers() {
  const res = await fetch(`${baseURL}/customers`);
  const data = await res.json();
  const tbody = document.querySelector("#customerTable tbody");
  tbody.innerHTML = "";
  data.forEach(c => {
    const row = `<tr>
      <td>${c.customer_id}</td>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone || "-"}</td>
      <td>${c.address || "-"}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Fetch and display products
async function fetchProducts() {
  const res = await fetch(`${baseURL}/products`);
  const data = await res.json();
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";
  data.forEach(p => {
    const row = `<tr>
      <td>${p.product_id}</td>
      <td>${p.name}</td>
      <td>${p.description || "-"}</td>
      <td>${p.price}</td>
      <td>${p.stock}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Handle add customer form
document.getElementById("addCustomerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const res = await fetch(`${baseURL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, address })
  });

  const result = await res.json();
  alert(result.message || "Customer added!");
  fetchCustomers();
  e.target.reset();
});
// Handle add product form
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("pname").value;
  const description = document.getElementById("pdesc").value;
  const price = parseFloat(document.getElementById("pprice").value);
  const stock = parseInt(document.getElementById("pstock").value);

  const res = await fetch(`${baseURL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, stock })
  });

  const result = await res.json();
  alert(result.message || "Product added!");
  fetchProducts();
  e.target.reset();
});


// Initial load
fetchCustomers();
fetchProducts();
