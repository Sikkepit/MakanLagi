const overlay = document.getElementById('overlay');
const amountNumber = document.getElementById('amount-number');
const addButton = document.getElementById('add-button');
const menusDiv = document.getElementById('menus');
const drinksDiv = document.getElementById('dranken');
const dessertsDiv = document.getElementById('desserts');
const overlayItemBasis = document.getElementById('overlay-item-basis');
const overlayItemGerecht = document.getElementById('overlay-item-gerecht');
const overlayItemGroente = document.getElementById('overlay-item-groente');
const shoppingCartContents = document.getElementById('shopping-cart-contents');

let shoppingCart = [];


function checkForCartInLocalStorage(){
    if(localStorage.getItem("shoppingCart")){
        let savedCart = localStorage.getItem("shoppingCart").split(",");

        for(let i=0;i<savedCart.length;i++) {
        shoppingCart.push(savedCart[i])
        }
        updateShoppingCart();
    } 
}



function addDetailsToItems(id) {
    if(id.includes('m')){
        overlay.style.display = "flex";
        amountNumber.innerHTML = 1;
        addButton.innerHTML = convertToCurrency(menus[id]['Price']);

        document.getElementById('overlay-item-name').innerHTML = menus[id]['Name'];
        // document.getElementById('overlay-item-desc').innerHTML = menus[id]['Description'];
        document.getElementById('overlay-item-desc').innerHTML = "Stel uw menu samen:";

        overlayItemBasis.innerHTML = "";
        overlayItemGerecht.innerHTML = "";
        overlayItemGroente.innerHTML = "";

        menus[id]['Basis'].forEach((element,index) => {
            overlayItemBasis.innerHTML += '<option value="'+index+'">'+element+'</option>';    
        });
        menus[id]['Gerecht'].forEach((element,index) => {
            overlayItemGerecht.innerHTML += '<option value="'+index+'">'+element+'</option>';    
        });
        menus[id]['Groente'].forEach((element,index) => {
            overlayItemGroente.innerHTML += '<option value="'+index+'">'+element+'</option>';    
        });
    }
    document.getElementById('meal-id').value = id;
    if(!id.includes('m')) {
        addToCart()
    }
}
function closeDetailsPopUp() {
    overlay.style.display = "none";
}
function changeAmountOnPopup(mutation, price) {

    let newAmount = parseInt(amountNumber.innerHTML) + parseInt(mutation);

    if(newAmount > 0){
    amountNumber.innerHTML = newAmount;

    let newPrice = new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'});
    addButton.innerHTML = newPrice.format(newAmount * price);
    }
}
function convertToCurrency(amount) {
    let newPrice = new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'});
    return newPrice.format(amount);
}

function createMenuView (itemsDiv, itemsList){
    for (let item in itemsList) {
        let newDiv = '<article class="food-item">\n';
        newDiv += '<div class="food-item-info">\n';
        newDiv += '<header><h2>'+itemsList[item]['Name']+'</h2></header>\n';
        newDiv += '<p>'+itemsList[item]['Description']+'</p>\n';
        newDiv += '<p class="food-item-price">'+convertToCurrency(itemsList[item]['Price'])+'\n';
        newDiv += '</div>\n';
        newDiv += '<a href="javascript:void(0);" onclick="addDetailsToItems(\''+item+'\')"><span class="food-item-add">+</span></a>\n';
        newDiv += '</article>\n';
        itemsDiv.innerHTML+=newDiv;
    };
}

function generateMenu() {
    createMenuView(menusDiv, menus);
    createMenuView(drinksDiv, drinks);
    createMenuView(dessertsDiv, desserts);
}

function addToCart() {
    overlay.style.display = "none";
    let mealID = document.getElementById('meal-id').value;
    if(mealID.includes('m')) {
        let suffix = "_" + overlayItemBasis.value + overlayItemGerecht.value + overlayItemGroente.value;

        for(let i=parseInt(amountNumber.innerHTML);i>0;i--) {
            shoppingCart.push(mealID + suffix);
        }
    }
    else {
        shoppingCart.push(mealID);
    }
    updateShoppingCart();
}

function updateShoppingCart() {
    let contents = "";
    let shoppingSet = new Set(shoppingCart)
    const counts = {};

    shoppingCart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    // Store
    localStorage.setItem("shoppingCart", shoppingCart);

    let total = 0;

    shoppingSet.forEach(element => {
        let id = element.split("_")[0];
        let suffix = element.split("_")[1];

        switch(element.charAt(0)) {
            case "m":
                contents += '<div class="shopping-cart-product-header">\n';
                contents += "<h3>" + menus[id]['Name'] + "</h3>\n";
                contents += '<span class="shopping-cart-price">' + convertToCurrency(counts[element] * menus[id]['Price']) + "</span>\n";
                contents += '</div>\n';
                contents += "<p>" + menus[id]['Basis'][suffix.charAt(0)] + ", " +  menus[id]['Gerecht'][suffix.charAt(1)];
                contents += ", " + menus[id]['Groente'][suffix.charAt(2)] + "</p>\n";
                contents += '<div class="overlay-buttons-amount-info">';
                contents += '<a href="javascript:void(0)" class="food-item-add" onclick="editCart(\'' + element + '\',-1)">-</a>';
                contents += '<h3 class="amount-number">' + counts[element] + '</h3>';
                contents += '<a href="javascript:void(0)" class="food-item-add" onclick="editCart(\'' + element + '\',1)">+</a>';
                contents += '</div>\n';
                total += counts[element] * menus[id]['Price'];
                break;
            case "d":
                contents += '<div class="shopping-cart-product-header">\n';
                contents += "<h3>" + drinks[id]['Name'] + "</h3>";
                contents += '<span class="shopping-cart-price">' + convertToCurrency(counts[element] * drinks[id]['Price']) + "</span>\n";
                contents += '</div>\n';
                contents += '<p>' + drinks[id]['Description'] + '</p>';
                contents += '<div class="overlay-buttons-amount-info">';
                contents += '<a href="javascript:void(0)" class="food-item-add" onclick="editCart(\'' + element + '\',-1)">-</a>';
                contents += '<h3 class="amount-number">' + counts[element] + '</h3>';
                contents += '<a href="javascript:void(0)" class="food-item-add" onclick="editCart(\'' + element + '\',1)">+</a>';
                contents += '</div>\n';
                total += counts[element] * drinks[id]['Price'];
                break;
            case "s":
                contents += '<div class="shopping-cart-product-header">\n';
                contents += "<h3>" + desserts[id]['Name'] + "</h3>";
                contents += '<span class="shopping-cart-price">' + convertToCurrency(counts[element] * desserts[id]['Price']) + "</span>\n";
                contents += '</div>\n';
                contents += '<p>' + desserts[id]['Description'] + '</p>';
                contents += '<div class="overlay-buttons-amount-info">';
                contents += '<a href="javascript:void(0)" class="food-item-add" onclick="editCart(\'' + element + '\',-1)">-</a>';
                contents += '<h3 class="amount-number">' + counts[element] + '</h3>';
                contents += '<a href="javascript:void(0)" class="food-item-add" onclick="editCart(\'' + element + '\',1)">+</a>';
                contents += '</div>\n';
                total += counts[element] * desserts[id]['Price'];
        }
    });
    if(total>0){
        document.getElementById('mobile-checkout-button').href = "checkout.html";
    contents += '<a id="checkout-button" class="btn btn-primary btn-lg" href="checkout.html">Afrekenen ('+ convertToCurrency(total) + ')</a>';
    }
    else {
        contents = '<p style="text-align:center">Je winkelmandje is nog leeg</p>';
        document.getElementById('mobile-checkout-button').href = "javascript:;";
    }
    shoppingCartContents.innerHTML = contents;
    document.getElementById('mobile-checkout-button').innerHTML = "Afrekenen (" + convertToCurrency(total) + ')';
}
function editCart(item, mutation) {
    if(mutation===1) {
        shoppingCart.push(item);
    }
    else {
        let index = shoppingCart.lastIndexOf(item);
        shoppingCart.splice(index,1);
    }
    updateShoppingCart()
}
generateMenu();
checkForCartInLocalStorage();
