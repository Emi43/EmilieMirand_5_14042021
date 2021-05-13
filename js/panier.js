let read = JSON.parse(localStorage.getItem("panier"));
console.log(read);
let article;

//message pour informer que le panier est vide//
if (read === null){
    document.getElementById("panier_vide").innerHTML +="Votre panier est vide"
    console.log("je suis vide");
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
    console.log(prixTotalCalcul)
}
//additionner les prix du tableau de la variable"prixTotalCalcul"avec la methode reduce//
const reducer = (accumulator,currentValue)=> accumulator + currentValue
const prixTotal = prixTotalCalcul.reduce(reducer,0);
console.log(prixTotal);
//code html du prix à afficher//
 document.getElementById("result_order").innerHTML = "TOTAL de la commande : " + prixTotal / 100 + " €" ;
