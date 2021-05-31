//page produit//
const apiUrl = "http://localhost:3000/api/teddies";
//récupération de l'Id//
//récupérer les paramètres de l'URL//
let search = new URLSearchParams(window.location.search);
//récupérer l'id présent dans l'URL//
let productId = search.get("id");
let article;
//fonction getTeddy pour récuperer les données de l'ID de chaque Teddy
function getTeddy(){
    fetch(apiUrl + '/' + productId)
        .then(response => {
            return response.json();
 })            
        .then(data => {
            //appel de la fonction pour afficher le produit//
            article = data
            displayTeddy();
})        
        .catch(error =>{
            //si erreur//
            console.log(error);
        })
}  
//permet le chargement et execution de la fonction// 
window.onload = getTeddy();

//affiche les données de l'objet//
function displayTeddy(){
    document.getElementById("affich_product").innerHTML +=
        "<div>" +
        "<h2>"  +
         article.name +
        "</h2>" +
        "<img width=100% src='" +
         article.imageUrl + "'>" +
        "<p>" +
         article.description +
        "</p>" +
        "<select id='select'>" +
        "</select>" +
        "<p>Prix : " + 
        article.price / 100 + "€" +
        "</p>" +
        "<button id='button'>Ajoutez au panier </button>" +
        "<p id = 'alerte_ajout_panier'></p>" +
        "</div>";


//menu déroulant colors//
 let selectOption = ""
    for (let i = 0; i < article.colors.length; i++) {
        selectOption +="<option value=\""+ article.colors[i]+"\">"+ article.colors[i]+"</option>";
    }    
        document.getElementById('select').innerHTML = selectOption
//récupération des teddies sélectionnés par l'écouteur d'événement//
        document.getElementById('button').addEventListener("click", function(){
            const optionValue = document.getElementById('select').value
            article.option = optionValue
        //function addProduct pour récuperer le panier et son contenu//
            addProduct(article);
        document.getElementById('alerte_ajout_panier').innerHTML = "Le produit a été ajouté au panier";
    });
};

//localstorage//
function addProduct(article){
     const panier = read()
   //pour chaque article, on pousse les infos suivantes dans le panier//
        panier.push(article); 
        write(panier);
    }        
// Cette fonction s'occupe d'écrire dans le panier//
let write = (valeur) => 
//mise à jour du "panier" et transformation de l'objet JS en chaîne de caractère JSON//
    localStorage.setItem('panier' , JSON.stringify(valeur));

//lit la valeur dans le localstorage//
let read = () => 
//transformation de la chaîne JSON(string) en objet JS pour pouvoir l'exploiter//
    JSON.parse(localStorage.getItem("panier")) || [];
