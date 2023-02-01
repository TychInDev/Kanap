// Modification du titre de la page

document.title = "Votre panier - Kanap";

// Constante pour l'emplacement des produits

const cartItems = document.getElementById("cart__items");

let totalPrice = 0;
document.getElementById("totalPrice").textContent = totalPrice;

// Récupération du panier dans le localStorage

let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

// Récupération des produits dans l'API

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    productsContent = data;
    console.log(productsContent);

    for (let i = 0; i < cart.length; i++) {
      let productIdCart = cart[i].id;
      console.log(productIdCart);

      let productColorCart = cart[i].color;
      console.log(productColorCart);

      let productQuantityCart = cart[i].quantity;
      console.log(productQuantityCart);

      // Recherche de l'id des produits dans l'API
      const fullProduct = data.find((element) => element._id === productIdCart);

      // Création des éléments HTML
      let newArticle = document.createElement("article");
      newArticle.setAttribute("class", "cart__item");
      newArticle.setAttribute("data-id", productIdCart);
      newArticle.setAttribute("data-color", productColorCart);
      cartItems.appendChild(newArticle);

      let newDivForImg = document.createElement("div");
      newDivForImg.setAttribute("class", "cart__item__img");
      newArticle.appendChild(newDivForImg);

      let newImg = document.createElement("img");
      newImg.setAttribute("src", fullProduct.imageUrl);
      newImg.setAttribute("alt", fullProduct.altTxt);
      newDivForImg.appendChild(newImg);

      let newDivInfo = document.createElement("div");
      newDivInfo.setAttribute("class", "cart__item__content");
      newArticle.appendChild(newDivInfo);

      let newDivInfoDescription = document.createElement("div");
      newDivInfoDescription.setAttribute(
        "class",
        "cart__item__content__description"
      );
      newDivInfo.appendChild(newDivInfoDescription);

      let newH2 = document.createElement("h2");
      newH2.textContent = fullProduct.name;
      newDivInfoDescription.appendChild(newH2);

      let newPforColor = document.createElement("p");
      newPforColor.textContent = productColorCart;
      newDivInfoDescription.appendChild(newPforColor);

      let newPforPrice = document.createElement("p");
      newPforPrice.setAttribute("id", "itemPrice");
      newPforPrice.textContent = `${fullProduct.price}€`;
      newDivInfoDescription.appendChild(newPforPrice);

      let newDivForContentSettings = document.createElement("div");
      newDivForContentSettings.setAttribute(
        "class",
        "cart__item__content__settings"
      );
      newDivInfo.appendChild(newDivForContentSettings);

      let newDivForQuantity = document.createElement("div");
      newDivForQuantity.setAttribute(
        "class",
        "cart__item__content__settings__quantity"
      );
      newDivForContentSettings.appendChild(newDivForQuantity);

      let newPforQuantity = document.createElement("p");
      newPforQuantity.textContent = "Qté : ";
      newDivForQuantity.appendChild(newPforQuantity);

      let newInput = document.createElement("input");
      newInput.setAttribute("type", "number");
      newInput.setAttribute("class", "itemQuantity");
      newInput.setAttribute("name", "itemQuantity");
      newInput.setAttribute("min", "1");
      newInput.setAttribute("max", "100");
      newInput.setAttribute("value", productQuantityCart);
      newDivForQuantity.appendChild(newInput);

      let newDivForDelete = document.createElement("div");
      newDivForDelete.setAttribute(
        "class",
        "cart__item__content__settings__delete"
      );
      newDivForContentSettings.appendChild(newDivForDelete);

      let newPforDelete = document.createElement("p");
      newPforDelete.setAttribute("class", "deleteItem");
      newPforDelete.textContent = "Supprimer";
      newDivForDelete.appendChild(newPforDelete);
    }
  });

// Calcul du nombre d'articles dans le panier
let totalQuantity = 0;
document.getElementById("totalQuantity").textContent = totalQuantity;

for (let i = 0; i < cart.length; i++) {
  let productQuantityCart = cart[i].quantity;
  totalQuantity += parseInt(productQuantityCart);
  console.log(totalQuantity);

  let totalQuantityCart = document.getElementById("totalQuantity");
  totalQuantityCart.textContent = totalQuantity;
}
// Calcul du prix total du panier

// let totalPrice = 0;

for (let i = 0; i < cart.length; i++) {
  let productIdCart = cart[i].id;
  let productQuantityCart = cart[i].quantity;

  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      const fullProduct = data.find((element) => element._id === productIdCart);
      totalPrice += fullProduct.price * productQuantityCart;
      console.log(totalPrice);

      let totalPriceCart = document.getElementById("totalPrice");
      totalPriceCart.textContent = totalPrice;
    });
}

// Fonction pour modifier la quantité d'un article

addEventListener("change", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("itemQuantity")) {
    let product = e.target.closest(".cart__item");
    let productId = product.dataset.id;
    let productColor = product.dataset.color;
    let productQuantity = e.target.value;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId && cart[i].color === productColor) {
        cart[i].quantity = productQuantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateChange();
  }
});

function updateChange() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  let totalQuantity = 0;
  for (let i = 0; i < itemQuantity.length; i++) {
    totalQuantity += parseInt(itemQuantity[i].value);
  }
  let totalQuantityBis = document.getElementById("totalQuantity");
  totalQuantityBis.innerHTML = totalQuantity;

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    let productIdCart = cart[i].id;
    let productQuantityCart = cart[i].quantity;

    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const fullProduct = data.find((element) => element._id === productIdCart);
        totalPrice += fullProduct.price * productQuantityCart;
        console.log(totalPrice);

        let totalPriceCart = document.getElementById("totalPrice");
        totalPriceCart.textContent = totalPrice;
      });
  }
}

// Fonction pour supprimer un article du panier

addEventListener("click", (deleteItem) => {
  if (deleteItem.target.classList.contains("deleteItem")) {
    let product = deleteItem.target.closest(".cart__item");
    let productId = product.dataset.id;
    let productColor = product.dataset.color;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId && cart[i].color === productColor) {
        cart.splice(i, 1);
      }
    }
    product.remove();
    updateChange();
    let totalPrice = 0;
    document.getElementById("totalPrice").textContent = totalPrice;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});

// Passer la commande avec le formulaire

let orderForm = document.querySelector("form");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  console.log(contact);

  let products = [];
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i].id);
  }

  let order = {
    contact,
    products,
  };
  console.log(order);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.location.href = "confirmation.html?orderId=" + data.orderId;
    });

  localStorage.clear(cart);
});
