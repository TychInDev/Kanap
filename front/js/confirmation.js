
document.title = `Commande validée - Kanap`

// Afficher le numéro de commande

let orderId = document.getElementById("orderId");
orderId.textContent = new URLSearchParams(window.location.search).get("orderId");



