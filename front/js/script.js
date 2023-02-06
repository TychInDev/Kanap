// Selection de l'emplacement ou les produits vont s'afficher 
const itemsList = document.querySelector("#items");

// Récupération des différents élements que contient un produit sur la page d'accueil
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    for (const product of data) {
      
      // Création des éléments HTML
      let newA = document.createElement("a");
      newA.setAttribute("href", `./product.html?id=` + product._id);
      itemsList.appendChild(newA);

      let newArticle = document.createElement("article");
      newA.appendChild(newArticle);

      let newImg = document.createElement("img");
      newImg.setAttribute("src", product.imageUrl);
      newImg.setAttribute("alt", product.altTxt);
      newArticle.appendChild(newImg);

      let newH3 = document.createElement("h3");
      newH3.setAttribute("class", "productName");
      newH3.textContent = product.name;
      newArticle.appendChild(newH3);

      let newP = document.createElement("p");
      newP.setAttribute("class", "productDescription");
      newP.textContent = product.description;
      newArticle.appendChild(newP);
    }
  })
  .catch((error) => {
    alert("Une erreur s'est produite: " + error);
  });
