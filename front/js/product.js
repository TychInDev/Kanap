// Récuperation de l'id du produit dans l'url

const idProduct = new URLSearchParams(window.location.search).get("id");
console.log(idProduct);

// Récuperation des données du produit

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => response.json())
  .then((productPage) => {
    console.log(productPage);

    // Implémentation des données du produit sur la page

    document.title = productPage.name;

    let productImg = document.querySelector(".item__img img");
    console.log(productImg);
    productImg.setAttribute("src", productPage.imageUrl);
    productImg.setAttribute("alt", productPage.altTxt);

    let productName = document.querySelector(".item__content h1");
    console.log(productName);
    productName.textContent = productPage.name;

    let productPrice = document.querySelector("#price");
    console.log(productPrice);
    productPrice.textContent = productPage.price;

    let productDescription = document.querySelector("#description");
    console.log(productDescription);
    productDescription.textContent = productPage.description;

    let choiceColors = document.querySelector("#colors");
    console.log(choiceColors);
    choiceColors.innerHTML = productPage.colors.map(
      (color) => `<option value="${color}">${color}</option>`
    );
  });

// Recuperation des données du produit ( id, couleur, prix et quantité)

let addToCart = document.querySelector("#addToCart");
console.log(addToCart);

addToCart.addEventListener("click", (event) => {
  let productQuantity = document.querySelector("#quantity");
  console.log(productQuantity.value);

  let productColor = document.querySelector("#colors");
  console.log(productColor.value);

  let product = {
    id: idProduct,
    color: productColor.value,
    quantity: productQuantity.value,
  };
  console.log(product);

  if (product.quantity > 100) {
    alert("La quantité ne peut pas dépasser 100.");
    return;
  }

  // Création du panier dans le local storage et ajout des produits au panier 
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);

  // Verification si le produit est déjà dans le panier et ajout de la quantité si le produit est déjà présent
  if (cart) {
    let productInCart = cart.find(
      (item) => item.id === product.id && item.color === product.color
    );
    if (productInCart) {
      productInCart.quantity =
        parseInt(productInCart.quantity) + parseInt(product.quantity);
    } else {
      cart.push(product);
    }
  } else {
    cart = [product];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  document.location.href = "cart.html";
});
