//page produit//
const apiUrl = "http://localhost:3000/api/teddies";
//récupération de l'Id//
let search = new URLSearchParams(window.location.search);
let productId = search.get("id");
let article;
//fonction getTeddy pour récuperer les données de l'ID de chaque Teddy
function getTeddy(){
    fetch(apiUrl + '/' + productId)
        .then(response => {
            console.log(response)
            return response.json();
 })            
        .then(data => {
            //appel de la fonction pour afficher le produit//
            article = data
            displayTeddy()
            console.log(article);
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
        console.log(selectOption);
        document.getElementById('select').innerHTML = selectOption

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
        console.log(read())
        console.log("Le produit a été ajouté au panier"); 
    }        
// Cette fonction s'occupe d'écrire dans le panier//
// Elle set la valeur du localstorage pour la clé panier à JSON.stringify(valeur)//
let write = (valeur) => 
    localStorage.setItem('panier' , JSON.stringify(valeur));
    console.log(write);
//lit la valeur dans le localstorage//
let read = () => 
    JSON.parse(localStorage.getItem("panier")) || [];
    console.log(read);