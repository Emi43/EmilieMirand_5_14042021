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
        "<h2>"  +
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
 let selectOption = ""
    for (let i = 0; i < response.colors.length; i++) {
        selectOption +="<option value=\""+response.colors[i]+"\">"+response.colors[i]+"</option>";
    }    
        console.log(selectOption);
        document.getElementById('select').innerHTML = selectOption

        document.getElementById('button').addEventListener("click", function(){
        //function addProduct pour récuperer le panier et son contenu//
            addProduct();
        document.getElementById('alerte_ajout_panier').innerHTML = "Le produit a été ajouté au panier";
    });
};
//localstorage//
function addProduct(){
    //transformation la chaine JSON(string) en objet JS//
    let card = JSON.parse(localStorage.getItem('card'));
    //si le tableau n'existe pas je le crée//
    if (card === null){
        card = []
    }
    //les produits sélectionnés s'ajoutent//    
        card.push(productId);
        //transformation de l'objet JS en chaine de charactère//
        localStorage.setItem("card",JSON.stringify(card));
    
};
//sauvegarde la valeur JSON.stringify//
let write = localStorage.getItem('card');
console.log(write);
//lit la valeur dans le localstorage//
let read = JSON.parse(write);
console.log(read);