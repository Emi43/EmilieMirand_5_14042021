//page produit//
const apiUrl = "http://localhost:3000/api/teddies";
//récupération de l'Id//
let search = new URLSearchParams(window.location.search);
let productId = search.get("id");
//fonction getTeddy pour récuperer les données de l'ID de chaque Teddy
function getTeddy(){
    fetch(apiUrl + '/' + productId)
        .then(response => {
            console.log(response)
            return response.json();
 })            
        .then(response => {
            console.log(response)
            displayTeddy(response);
})        
        .catch(error => {   
        console.log(error);
})
}   
window.onload = getTeddy();
//affiche les données de l'object//
function displayTeddy(response){
    document.getElementById("affich_product").innerHTML +=
        "<div>" +
        "<h2>" +
         response.name +
        "</h2>" +
        "<img width=100% src='" +
         response.imageUrl + "'>" +
        "<p>" +
         response.description +
        "</p>" +
        "<select id='select'>" +
        "</select>" +
        "<p>Prix : " + 
        response.price / 100 + "€" +
        "</p>" +
        "<button id='button'>Ajoutez au panier </button>" +
        "<p id = 'alerte_ajout_panier'></p>" +
        "</div>";

//menu déroulant colors//
    for (let i = 0; i < response.length; i++) {
        document.getElementById('select').innerHTML +=
        "<option value = '' + response.colors[i] + ''>" + "</option>"
        console.log(option);
    }

        document.getElementById('button').addEventListener("click",function(){
        //function addTeddyToBasket pour récuperer le panier et son contenu//
            addTeddyToBasket();
        document.getElementById('alerte_ajout_panier').innerHTML = "Le produit a été ajouté au panier";
    });
};
//localstorage//
function addTeddyToBasket(){

}