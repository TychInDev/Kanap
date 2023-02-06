
document.title = `Commande validée - Kanap`

// Affichage du numéro de commande

let orderId = document.getElementById("orderId");
orderId.textContent = new URLSearchParams(window.location.search).get("orderId");



