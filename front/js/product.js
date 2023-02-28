// Récupération de l'id du produit dans l'URL

const idProduct = new URLSearchParams(window.location.search).get("id");

// Récupération des données du produit

fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données du produit");
    }
    return response.json();
  })
  .then((productPage) => {
    // Implémentation des données du produit sur la page

    document.title = productPage.name;

    let productImg = document.querySelector(".item__img img");
    productImg.setAttribute("src", productPage.imageUrl);
    productImg.setAttribute("alt", productPage.altTxt);

    let productName = document.getElementById("title");
    productName.textContent = productPage.name;

    let productPrice = document.getElementById("price");
    productPrice.textContent = productPage.price;

    let productDescription = document.getElementById("description");
    productDescription.textContent = productPage.description;

    let choiceColors = document.getElementById("colors");
    choiceColors.innerHTML = productPage.colors.map(
      (color) => `<option value="${color}">${color}</option>`
    );
  })
  .catch((error) => {
    let addToCartButton = document.getElementById("addToCart");
    addToCartButton.remove();
   
    alert("Ce produit n'existe pas");
  });

// Récupération des données du produit (id, couleur, prix et quantité)

let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", (event) => {
  let productQuantity = document.getElementById("quantity");

  let productColor = document.getElementById("colors");

  let product = {
    id: idProduct,
    color: productColor.value,
    quantity: productQuantity.value,
  };

  if (product.quantity < 1 || product.quantity > 100) {
    alert("La quantité doit être comprise entre 1 et 100.");
    return;
  }

  // Création du panier dans le local storage et ajout des produits au panier
  let cart = JSON.parse(localStorage.getItem("cart"));

  // Vérification si le produit est déjà dans le panier et ajout de la quantité si le produit est déjà présent
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
  document.location.href = "cart.html";
});
