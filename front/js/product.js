// Récuperation de l'id du produit dans l'url

const idProduct = new URLSearchParams(window.location.search).get("id");
console.log(idProduct);

// Récuperation des données du produit

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => response.json())
  .then((productPage) => {
    console.log(productPage);

    // Implémentation des données du produit sur la page produit

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

    let productColors = document.querySelector("select");
    console.log(productColors);
    for (let i = 0; i < productColors.length; i++) {
      productColors[i].innerHTML = productPage.colors[i];

    if (productColors[i].innerHTML == "undefined") {
      productColors[i].style.display = "none";
    }
    }

    // Recuperation des données du produit ( id, couleur, prix et quantité)

    let addToCart = document.querySelector("#addToCart");
    console.log(addToCart);

    addToCart.addEventListener("click", (event) => {

      let productQuantity = document.querySelector("#quantity");
      console.log(productQuantity);

      let product = {
        id: productPage._id,
        price: productPage.price,
        quantity: productQuantity.value,
        color: productPage.colors[colors.selectedIndex],
      };
      console.log(product);

      // Ajout au panier dans le local storage

      let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
      console.log(productsInCart);

      if (productsInCart) {
        productsInCart.push(product);
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      } else {
        productsInCart = [];
        productsInCart.push(product);
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

      }
    });

  });
