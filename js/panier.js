//récupération des données produits du localstorage//
let read = JSON.parse(localStorage.getItem("panier"));
let article;
//message pour informer que le panier est vide//
if (read === null){
    document.getElementById("panier_vide").innerHTML +="Votre panier est vide"
}
else{
    console.log("articles dans panier");
}
//affichage du contenu du panier//
for (let article of read){
    document.getElementById("container_teddy_selectionne").innerHTML +=
        "<div id='teddy_selectionne'>" +
        "<h2>"  +
         article.name +
        "</h2>" +
        "<img width=150px src='" +
         article.imageUrl  + "'>"+ 
         "<p>Couleur : "+
         article.option +
        "</p>" +
        "<p>Prix : " + 
        article.price /100 + "€" +
        "</p>" +
        "</div>"
}
//...........bouton pour vider le panier.............//
document.getElementById("vider_panier").addEventListener('click', function () {
    //permet de supprimer tous les éléments du panier dans le localStorage
    localStorage.removeItem("panier");
    //Permet le rechargement de la page
    document.location.reload(true);
})
//...........bouton pour vider le panier.............//

//...........montant total du panier.............//
//aller chercher les prix dans le panier//
let prixTotalCalcul= [];
for (k = 0; k < read.length; k++ ){
    let prixProduitDansLePanier = read[k].price;
    //mettre les prix du panier dans la variable prixTotalCalcul//
    prixTotalCalcul.push(prixProduitDansLePanier)
}
//additionner les prix du tableau de la variable"prixTotalCalcul"avec la methode reduce//
const reducer = (accumulator,currentValue)=> accumulator + currentValue
const prixTotal = prixTotalCalcul.reduce(reducer,0);

//code html du prix à afficher//
 document.getElementById("result_order").innerHTML = "TOTAL de la commande : " + prixTotal / 100 + " €" ;

//...........formulaire.............//
let products = []; // données de la commande
let contact; // données du contact
let submit = document.getElementById("submit");//bouton d'envoi "procéder au paiement"//
submit.addEventListener("click", function(event){
    event.preventDefault(); 
    if(read){
    for(let article of read){
        products.push(article._id);
    }
    contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value,
    } 
}
if(products.length > 0){//si au moins un produit dans le panier//
    fetch("http://localhost:3000/api/teddies/order", {
       method:"POST",
       //corps de la requête transformé en format JSON//
       body: JSON.stringify({products, contact}),
       //informations sur le type de contenu de la requête(JSON)//
       headers: {
        'content-type' : 'application/json'  
       } 
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //ouverture de la page commande si le backend renvoie un id de commande//
        if(data.orderId){
            //stockage de données dans localstorage pour les utiliser sur la page commande//
            let confirmOrder = {
                name: document.getElementById("firstName").value,
                price: prixTotal /100 +"€",
                id: data.orderId
            }
            //stockage des données de commande dans le localstorage//
            localStorage.setItem("forConfirmOrder", JSON.stringify(confirmOrder)) 
            window.open(`commande.html`, "commande");

        } 
        else {
            window.alert("Chaque champ du formulaire doit être complété")
        }
    })
    .catch(error => console.log(error));
}
})   