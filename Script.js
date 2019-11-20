//names of all regions
var regionNames = ["All", "Demacia","Freljord","Ionia","Noxus","PiltoverZaun","ShadowIsles"];

console.log(card_data);

initializeHTML();


function initializeHTML(){
    initializeHeader();
    initializeAllCards();
}

//Creates a image button element in the DOM for each region. Called when page is first opened
function initializeHeader(){
    var parent = document.getElementById("regions");
    for(var i=0; i< regionNames.length; ++i){
        var region = regionNames[i];
        var image = document.createElement("img");
        image.setAttribute("src", "Resources/Region_images/icon-" + region.toLowerCase() + ".png");
        image.setAttribute("id", region);
        image.setAttribute("onclick", "filter('"+region+"')");
        //The all regions button is pressed by default
        if(region == "All"){ 
            setHeader(image,true);
        }
        else{ 
            setHeader(image,false);
        }
        parent.appendChild(image);
    }

    createSortMenu();
}

function createSortMenu(){
    var sortMenu = document.createElement("select");
    sortMenu.setAttribute("id", "sortMenu");
    sortMenu.setAttribute("onchange", "sort()");
    
    var costAsc = document.createElement("option");
    costAsc.innerText = "Cost (Asc)";

    var costDesc = document.createElement("option");
    costDesc.innerText = "Cost (Desc)";

    sortMenu.appendChild(costAsc);
    sortMenu.appendChild(costDesc);

    document.getElementById("regions").appendChild(sortMenu);
}


//Creates an image element in the DOM for every card. Called when page is first opened
function initializeAllCards(){
    var parent =  document.getElementById("cards");
    for(var i=0; i < card_data.length; ++i){
        var card = card_data[i];
        var card_html = document.createElement("img");
        card_html.setAttribute("src", "Resources/Card_images/"+card.cardCode+".png");
        card_html.setAttribute("class", "card " + card.regionRef);
        card_html.setAttribute("id", card.name);
        card_html.setAttribute("data-attack", card.attack);
        card_html.setAttribute("data-health", card.health);
        card_html.setAttribute("data-cost", card.cost);
        card_html.setAttribute("data-supertype",card.supertype);
        card_html.setAttribute("data-collectible", card.collectible);

        insertionSort(card_html,parent);
    }
}


//Sets all cards of a region to display "inline" or "none". Called by filter()/unfilter()
function displayRegionCards(region, show=true){
    if(region == "All"){
        var allCards = document.querySelectorAll(".card");
        for(var i=0; i<allCards.length; ++i){
            if(show){
                allCards[i].style.display = "inline";
            }
            else{
                allCards[i].style.display = "none";
            }
        }
    }
    else{
        var regionCards = document.querySelectorAll("."+region);
        for(var i=0; i<regionCards.length; ++i){
            if(show){
                regionCards[i].style.display = "inline";
            }
            else{
                regionCards[i].style.display = "none";
            }
        }
    }
}

//Card filter logic. Called on region image button press
function filter(region){
    var allButton = document.getElementById("All");
    if(region == "All"){
        var activeRegions = document.querySelectorAll(".regionImagePressed");
        for(var i=0; i<activeRegions.length; ++i){
            setHeader(activeRegions[i],false);
        }
        setHeader(allButton,true);
    }
    else{
        if(isDown(allButton)){
            setHeader(allButton,false);
            displayRegionCards("All",false);
        }
        var activeRegion = document.getElementById(region);
        setHeader(activeRegion,true);
    }
    displayRegionCards(region);
}

//Opposite of filter(). Called on an already pressed region button
function unfilter(region){
    var regionButton = document.getElementById(region);
    if(isDown(regionButton)){
        displayRegionCards(region,false);
        setHeader(regionButton,false);
    }
    if(document.querySelectorAll(".regionImagePressed").length == 0){
        var all = document.getElementById("All");
        setHeader(all,true);
        displayRegionCards("All");
    }
}

//Checks if a region button is pressed or not
function isDown(regionButton){
    return regionButton.getAttribute("class") == "regionImagePressed";
}

//Sets a region button to be pressed or unpressed
function setHeader(regionButton, bool){
    if(bool){
        regionButton.setAttribute("class", "regionImagePressed");
        regionButton.setAttribute("onclick", "unfilter('"+regionButton.getAttribute("id")+"')");
    }
    else{
        regionButton.setAttribute("class","regionImage");
        regionButton.setAttribute("onclick", "filter('"+regionButton.getAttribute("id")+"')");
    }
}

//Adds extra zeroes to a number. Returns a String
function padZeros_s(num, zeros){
    return "0".repeat(zeros - num.length) + num;
}

function insertionSort(newItem, parentContainer){
    var currentCards = document.querySelectorAll(".card");
    if(currentCards.length == 0){parentContainer.appendChild(newItem);}
    for(i=0; i<currentCards.length; ++i){
        if(newItem.getAttribute("data-supertype") == "Champion" && currentCards[i].getAttribute("data-supertype") != "Champion"){
            console.log("added champion");
            parentContainer.insertBefore(newItem,currentCards[i]);
        }
        else{
            parentContainer.appendChild(newItem);
        }
    }
}