//names of all regions
var regionNames = ["all", "demacia","freljord","ionia","noxus","piltoverzuan","shadowisles"];

//Num of cards in each region and their file shorthand
var regionCounts = {
    "demacia" : ["DE",56],
    "freljord" : ["FR",57],
    "ionia" : ["IO",57],
    "noxus" : ["NX",56],
    "piltoverzuan" : ["PZ",60],
    "shadowisles" : ["SI",58]    
};

initializeAll();


function initializeAll(){
    displayRegionHeader();
    initializeAllCards();
}

function displayRegionHeader(){
    for(var i=0; i< regionNames.length; ++i){
        var region = regionNames[i];
        var image = document.createElement("img");
        image.setAttribute("src", "Resources/Region_images/icon-" + region + ".png");
        if(region == "all"){
                image.setAttribute("class", "regionImagePressed");
        }
        else{
                image.setAttribute("class", "regionImage");
        }
        document.getElementById("regions").appendChild(image);
    }
}

function initializeAllCards(){
    var rCountsArray = Object.values(regionCounts);
    for(var i=0; i < rCountsArray.length; ++i){
        var region = rCountsArray[i][0];
        for(var j=1; j <= rCountsArray[i][1]; ++j){
            var image = document.createElement("img");
            image.setAttribute("src", "Resources/Card_Images/01" + region + "0" + j.toString() + ".png");
            image.setAttribute("id", region+j.toString());
            image.setAttribute("class", "card "+region);
            image.setAttribute("onerror", "this.parentNode.removeChild(this)");
            document.getElementById("cards").appendChild(image);
        }
    }
}

function displayRegionCards(region){
    if(region == "all"){
        var allCards = document.getElementsByClassName("card");
        allCards.forEach(function(card){
                card.style.display = "inline";
            }
        );
    }
    else{
        var rCount = regionCounts[region];
        for(var i=1; i<rCount; ++i){
            var card = document.getElementById(region+i.toString());
            card.style.display = "in-line";
        }
    }
}

function filter(region){
    var all = document.getElementById("all");
    if(region == all){
        var activeRegions = document.getElementsByClassName("regionImagePressed");
        activeRegions.forEach(function(region) {
                region.setAttribute("class","regionImage");
            }
        );
        region.setAttribute("class", "regionImagePressed");
    }
    else{
        if(all.getAttribute("class") == "regionImagePressed"){
            all.setAttribute("class", "regionImage");
            var cards = document.getElementsByClassName("card");
            for(var i=0; i < cards.length; ++i){
                    cards[i].style.display = "none";
            }
        }
        else{

        }
    }
    displayRegionCards(region);
}


