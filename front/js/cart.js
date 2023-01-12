// Modification du titre de la page

document.title = "Votre panier Kanap";

const cartItem = document.getElementById("cart__items");

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

      // Recherche du produit présent dans le panier dans l'API
      const fullCart = data.find((element) => element._id === productIdCart);

      // Création des éléments HTML
      let newArticle = document.createElement("article");
      newArticle.setAttribute("class", "cart__item");
      newArticle.setAttribute("data-id", `${productIdCart}`);
      newArticle.setAttribute("data-color", `${productColorCart}`);
      cartItem.appendChild(newArticle);

      let newDivForImg = document.createElement("div");
      newDivForImg.setAttribute("class", "cart__item__img");
      newArticle.appendChild(newDivForImg);

      let newImg = document.createElement("img");
      newImg.setAttribute("src", fullCart.imageUrl);
      newImg.setAttribute("alt", fullCart.altTxt);
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
      newH2.textContent = fullCart.name;
      newDivInfoDescription.appendChild(newH2);

      let newPforColor = document.createElement("p");
      newPforColor.textContent = productColorCart;
      newDivInfoDescription.appendChild(newPforColor);

      let newPforPrice = document.createElement("p");
      newPforPrice.textContent = fullCart.price + " €";
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

 //  <div class="cart__price">
 // <p>Total (<span id="totalQuantity">2</span> articles) : <span id="totalPrice">84,00 </span> €</p>
 // </div>

 // Calcul du prix total du panier


