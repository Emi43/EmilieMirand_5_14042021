const api = "http://localhost:3000/api/teddies";

//création d'une fonction pour récupérer tous les produits "teddies" de l'api"
function getAllTeddies(){
        fetch(api)
//format de reponse souhaitée en json//
            .then(response => response.json())
//quand le traitement est terminé//
            .then(response => {
            console.log(data);
            displayTeddies(response);

})
//quand une erreur se produit//
            .catch(error => {   
            console.log(error);
})
}
window.onload = getAllTeddies();
//permet l'affichage des éléments passés en paramètre (response)//
function displayTeddies(response){
    let section = document.getElementById("teddies");
    for(let i = 0; i < response.lenght; i++) {
        //mise en place d'une balise article pour la mise en page des produits//
        let teddy = document.createElement("article")
            teddy.innerHTML += "<h2>" +
                response[i].name +
                "</h2>" +
                "<img width='100%' src='" + response[i].imageUrl + "'>" +
                "<p>" +
                response[i].description +
                "</p>"
                "<p>" +
                response[i].price / 100 + "€" +
                "</p>" +
                "<a href='produit.html?id=" + response[i]._id + "'>Voir le produit</a>"
            section.appendChild(teddy);    
        }
}