var regionNames = ["all", "DE","FR","IO","NX","PZ","SI"];
regionNames.forEach(displayRegionHeader);

//Num of cards in each region
var regionCounts = {
    "DE":56,
    "FR":57,
    "IO":57,
    "NX":56,
    "PZ":60,
    "SI":58    
};

initializeAllCards();




function displayRegionHeader(region){
    var image = document.createElement("img");
    image.setAttribute("src", "Resources/Region_images/icon-" + region + ".png");
    image.setAttribute("class", "regionImage");
    document.getElementById("regions").appendChild(image);
}

function initializeAllCards(){
    var rCountsArray = Object.entries(regionCounts);
    for(var i=0; i < rCountsArray.length; ++i){
        var region = rCountsArray[i][0];
        for(var j=1; j <= rCountsArray[i][1]; ++j){
            var image = document.createElement("img");
            image.setAttribute("src", "Resources/Card_Images/01" + region + "0" + j.toString() + ".png");
            image.setAttribute("id", region+j.toString());
            image.setAttribute("class", "card");
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

        }
        document.getElementById("all").setAttribute("class", "regionImage");
        if(region.getAttribute("class") == "regionImage"){
            region.setAttribute("class","regionImagePressed");
    
        }
        else{
            region.setAttribute("class", "regionImage");
        }
    }




}

