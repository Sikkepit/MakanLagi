let shoppingCart = [];
let orderOverview = document.getElementById('order-overview');

function checkForCartInLocalStorage(){
    if(localStorage.getItem("shoppingCart")){
        let savedCart = localStorage.getItem("shoppingCart").split(",");

        for(let i=0;i<savedCart.length;i++) {
            shoppingCart.push(savedCart[i])
       }   
    } 
}


function convertToCurrency(amount) {
    let newPrice = new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'});
    return newPrice.format(amount);
}

checkForCartInLocalStorage();

function displayOrderContents(){
    let uniqueItems = new Set(shoppingCart);
    let total = 0;
    let content = '<table style="width:100%">\n';
    const counts = {};

    shoppingCart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    uniqueItems.forEach(element => {
        let id = element.split("_")[0];
        let suffix = element.split("_")[1];

        content +="<tr>\n";
        switch (element.charAt(0)){
            case "m":
                content += "\t<td>" + counts[element] + " x</td><td>" + menus[id]['Name'] + " <br>" + menus[id]['Basis'][suffix.charAt(0)] + " " + menus[id]['Gerecht'][suffix.charAt(1)] + " " + menus[id]['Groente'][suffix.charAt(2)];
                content += "</td><td>" + convertToCurrency(counts[element] * menus[id]['Price']) + "</td>";
                total += counts[element] * menus[id]['Price'];
                break;
            case "d":
                content += "\t<td>" + counts[element] + " x</td><td>" + drinks[id]['Name'] + "</td><td>" + convertToCurrency(counts[element] * drinks[id]['Price']) + "</td>";
                total += counts[element] * drinks[id]['Price'];
                break;
            case "s":
                content += "\t<td>" + counts[element] + " x</td><td>" + desserts[id]['Name'] + "</td><td>" + convertToCurrency(counts[element] * desserts[id]['Price']) + "</td>";
                total += counts[element] * desserts[id]['Price'];
                break;
        }
        content +="\n</tr>\n";
    });
    content += "<tr>\n\t<td></td><td>Totaal:</td><td>" + convertToCurrency(total) + "</td>\n</tr>\n</table>"
    document.getElementById('bestelling-hidden-field').value = content;
    orderOverview.innerHTML = content;
}


if (shoppingCart.length>0){
displayOrderContents();
}
else {
    document.getElementById('wrapper-checkout').innerHTML = 
    '<h1>Uw winkelwagentje is leeg!</h1>\n' +
    '<p>Vermoedelijk bent u per ongeluk op deze pagina beland. Ga terug naar de menukaart, vul uw winkelwagentje en probeer het opnieuw. Indien het een fout op de website betreft, neem dan telefonisch contact met ons op.</p>\n' +
    '<a href="index.html">Terug naar het menu</a>\n';
}
