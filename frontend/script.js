document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById("product");

  fetch("http://localhost:3000/api/products")
    .then((res) => {
      if (!res.ok) throw new Error("Kunde inte hämta produktlistan.");
      return res.json();
    })
    .then((products) => {
      products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.articleNumber;
        option.textContent = `${product.name} – ${product.articleNumber}`;
        productSelect.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Fel vid hämtning av produkter:", err);
      const errorOption = document.createElement("option");
      errorOption.textContent = "Kunde inte ladda produkter";
      errorOption.disabled = true;
      productSelect.appendChild(errorOption);
    });
});

const form = document.getElementById("order-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const orderData = {
    name: form.name.value,
    email: form.email.value,
    address: form.address.value,
    product: form.product.value,
    quantity: parseInt(form.quantity.value),
  };

  if (!orderData.product || orderData.quantity < 1) {
  alert("Välj en giltig produkt och ett antal större än 0.");
  return;
  }

  fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Kunde inte skicka beställning.");
      return res.json();
    })
    .then((data) => {
      alert("Beställning skickad!");
      form.reset();
    })
    .catch((err) => {
      console.error("Fel vid beställning:", err);
      alert("Något gick fel. Försök igen.");
    });
});
