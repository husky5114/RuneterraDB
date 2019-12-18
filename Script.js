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
        image.setAttribute("src", "Resources/Region_Images/icon-" + region.toLowerCase() + ".png");
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

    //createSortMenu();
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
        var card_html = document.createElement("a");
        card_html.setAttribute("href", "Resources/Card_Images/"+card.cardCode+".png");
        card_html.setAttribute("class", "card " + card.regionRef);
        card_html.setAttribute("id", card.name);
        card_html.setAttribute("data-attack", card.attack);
        card_html.setAttribute("data-health", card.health);
        card_html.setAttribute("data-cost", card.cost);
        card_html.setAttribute("data-supertype",card.supertype);
        card_html.setAttribute("data-collectible", card.collectible);
        card_html.setAttribute("data-lightbox", "cardImages");

        var thumbnail = document.createElement("img");
        thumbnail.setAttribute("src", "Resources/Card_Images/"+card.cardCode+" (CardOptimized).png");
        thumbnail.setAttribute("class", "thumbnail");

        card_html.appendChild(thumbnail);
        insertionSort(card_html,parent);
    }
    console.log("done");
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

//I am so sorry
function insertionSort(newItem, parentContainer){
    var currentCards = document.querySelectorAll(".card");
    if(currentCards.length != 0){
        var index = currentCards.length-1;
        while(compareAttributes(newItem,currentCards[index],"data-supertype","<")){
            if(index > 0){--index;}
            else{
                parentContainer.insertBefore(newItem,currentCards[index]);
                return;
            }
        }
        while(compareAttributes(newItem,currentCards[index],"data-cost","<") && compareAttributes(newItem,currentCards[index],"data-supertype","==")){
            if(index > 0){--index;}
            else{
                parentContainer.insertBefore(newItem,currentCards[index])
                return;
            }
        }
        while(compareAttributes(newItem,currentCards[index],"data-attack","<") && compareAttributes(newItem,currentCards[index],"data-cost","==") && compareAttributes(newItem,currentCards[index],"data-supertype","==")){
            if(index > 0){--index;}
            else{
                parentContainer.insertBefore(newItem,currentCards[index])
                return;
            }
        }
        while(compareAttributes(newItem,currentCards[index],"data-health","<") && compareAttributes(newItem,currentCards[index],"data-attack","==") && compareAttributes(newItem,currentCards[index],"data-cost","==") && compareAttributes(newItem,currentCards[index],"data-supertype","==")){
            if(index > 0){--index;}
            else{
                parentContainer.insertBefore(newItem,currentCards[index])
                return;
            }
        }
        parentContainer.insertBefore(newItem,currentCards[index+1]);
    }
    else{parentContainer.appendChild(newItem);}
}


function compareAttributes(A,B,attribute,comparison){
    var valueA = A.getAttribute(attribute);
    var valueB = B.getAttribute(attribute);
    if(attribute == "data-supertype"){
        if(comparison == "<"){
            return valueA == "Champion" && valueB != "Champion";
        }
        if(comparison == ">"){
            return valueA != "Champion" && valueB == "Champion";
        }
        if(comparison == "=="){
            return valueA === valueB;
        }
    }
    return eval(valueA +  comparison  + valueB);
}