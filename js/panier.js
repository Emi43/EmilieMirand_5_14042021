let read = JSON.parse(localStorage.getItem("panier"));
console.log(read);
let article;
for (let article of read){
    document.getElementById("container_teddy_selectionne").innerHTML +=
        "<div>" +
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