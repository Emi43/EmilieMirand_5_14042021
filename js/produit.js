//page produit//
const apiUrl = "http://localhost:3000/api/teddies";
//récupération de l'Id//
let search = newURLSearchParams(window.location.search);
let productId = search.get("Id");
//fonction getTeddy pour récuperer les données de l'ID de chaque Teddy
function getTeddy(){
    fetch(apiUrl + productId)
        .then(response => response(JSON))
        .then(response =>{
            displayTeddy(response);
            console.log(Id);
})        
        .catch(error => {   
        console.log(error);
})
}   
window.onload = getTeddy();
//affiche les données de l'object//
function displayTeddy(response){
    document.getElementById('affich_product').innerHTML +=
        "<div>" +
        "<h2>" + response.name +
        "</h2>" +
        "<img width=100% src='" + response.image.Url + "'>" +
        "<p>" + response.description +
        "</p>" +
        "<select id ='select'>" +
        "</select>" +
        "<p>Prix : " + response.price / 100 + "€" +
        "</p>" +
        "<button id='button'>Ajoutez au panier </button>" +
        "<p id = 'alerte_ajout_panier'></p>" +
        "</div>";
}