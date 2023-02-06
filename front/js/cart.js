// Modification du titre de la page

document.title = "Votre panier - Kanap";

// Selection de l'emplacement des produits

const cartItems = document.getElementById("cart__items");

let totalPrice = 0;
document.getElementById("totalPrice").textContent = totalPrice;

// Récupération du panier dans le localStorage

let cart = JSON.parse(localStorage.getItem("cart"));

// Récupération des produits dans l'API

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    productsContent = data;

    for (let i = 0; i < cart.length; i++) {
      let productIdCart = cart[i].id;

      let productColorCart = cart[i].color;

      let productQuantityCart = cart[i].quantity;

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

// Affichage du nombre d'articles dans le panier

let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.textContent = 0;

function cartQuantity() {
  let cartQuantity = document.getElementById("totalQuantity");

  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += parseInt(cart[i].quantity);
  }
  cartQuantity.textContent = totalQuantity;
}
cartQuantity();

// Affichage du prix total du panier

function cartTotalPrice() {
  let cartTotalPrice = document.getElementById("totalPrice");
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        productsContent = data;

        let productIdCart = cart[i].id;

        const fullProduct = data.find(
          (element) => element._id === productIdCart
        );
        totalPrice += fullProduct.price * cart[i].quantity;

        cartTotalPrice.textContent = totalPrice;
      });
  }
}
cartTotalPrice();

// Modification de la quantité d'un article 

let basket = document.querySelector(".cart");

basket.addEventListener("change", updateQuantity);

function updateQuantity(event) {
  if (!event.target.classList.contains("itemQuantity")) return;

  let quantity = event.target.value;
  let article = event.target.closest(".cart__item");
  let id = article.dataset.id;
  let color = article.dataset.color;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id && cart[i].color === color) {
      cart[i].quantity = quantity;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartQuantity();
  cartTotalPrice();
}

// Suppression d'un article du panier

basket.addEventListener("click", deleteItemInBasket);

function deleteItemInBasket(event) {
  if (!event.target.classList.contains("deleteItem")) return;

  let article = event.target.closest(".cart__item");
  let id = article.dataset.id;
  let color = article.dataset.color;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id && cart[i].color === color) {
      cart.splice(i, 1);
    }
    if (cart.length === 0) {
      let totalPrice = document.getElementById("totalPrice");
      totalPrice.textContent = 0;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  article.remove();
  cartQuantity();
  cartTotalPrice();
}

// Validation du formulaire et envoi de la commande

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
firstNameErrorMsg.textContent = "";

let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validFirstName(form.firstName) &&
    validLastName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)
  ) {
    let contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    };

    let products = [];
    for (let i = 0; i < cart.length; i++) {
      products.push(cart[i].id);
    }

    let order = {
      contact,
      products,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.location.href = "confirmation.html?orderId=" + data.orderId;
        localStorage.clear(cart);
      });
  } else {
    alert("Veuillez remplir correctement le formulaire");
  }
});

form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

const validFirstName = function (inputfirstName) {
  const firstNameRegex = /^[a-zA-Z]+$/;

  let testFirstName = firstNameRegex.test(inputfirstName.value);
  let firstNameErrorMsg = inputfirstName.nextElementSibling;

  if (testFirstName) {
    firstNameErrorMsg.textContent = "";
    return true;
  } else {
    firstNameErrorMsg.textContent = "Le prénom n'est pas valide";
    return false;
  }
};

form.lastName.addEventListener("change", function () {
  validLastName(this);
});

const validLastName = function (inputlastName) {
  const lastNameRegex = /^[a-zA-Z]+$/;

  let testLastName = lastNameRegex.test(inputlastName.value);
  let lastNameErrorMsg = inputlastName.nextElementSibling;

  if (testLastName) {
    lastNameErrorMsg.textContent = "";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Le nom n'est pas valide";
    return false;
  }
};

form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAddress) {
  const addressRegex = /^[0-9]+\s[a-zA-Z\s]+$/;

  let testAddress = addressRegex.test(inputAddress.value);
  let addressErrorMsg = inputAddress.nextElementSibling;

  if (testAddress) {
    addressErrorMsg.textContent = "";
    return true;
  } else {
    addressErrorMsg.textContent = "L'adresse n'est pas valide";
    return false;
  }
};

form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  const cityRegex = /^[a-zA-Z]+$/;

  let testCity = cityRegex.test(inputCity.value);
  let cityErrorMsg = inputCity.nextElementSibling;

  if (testCity) {
    cityErrorMsg.textContent = "";
    return true;
  } else {
    cityErrorMsg.textContent = "La ville n'est pas valide";
    return false;
  }
};

form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let testEmail = emailRegex.test(inputEmail.value);
  let emailErrorMsg = inputEmail.nextElementSibling;

  if (testEmail) {
    emailErrorMsg.textContent = "";
    return true;
  } else {
    emailErrorMsg.textContent = "L'email n'est pas valide";
    return false;
  }
};
