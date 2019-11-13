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
        image.setAttribute("id", region);
        image.setAttribute("onclick", "filter('"+region+"')");
        if(region == "all"){
                setHeader(image,true);
        }
        else{
                setHeader(image,false);
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
        for(var i=0; i<allCards.length; ++i){
            allCards[i].style.display = "inline";
        }
    }
    else{
        var rCount = regionCounts[region][0];
        for(var i=1; i<rCount; ++i){
            var card = document.getElementById(region+i.toString());
            console.log(card);
            card.style.display = "inline";
        }
    }
}

function filter(region){
    var all = document.getElementById("all");
    if(region == "all"){
        var activeRegions = document.getElementsByClassName("regionImagePressed");
        console.log(activeRegions);
        for(var i=0; i<activeRegions.length; ++i){
            console.log(activeRegions[i]);
            setHeader(activeRegions[i],false);
            console.log(activeRegions);
        }
        setHeader(all,true);
    }
    else{
        if(all.getAttribute("class") == "regionImagePressed"){
            setHeader(all,false);
            var cards = document.getElementsByClassName("card");
            for(var i=0; i < cards.length; ++i){
                    cards[i].style.display = "none";
            }
        }
        var activeRegion = document.getElementById(region);
        setHeader(activeRegion,true);
        
    }
    displayRegionCards(region);
}

function setHeader(region, bool){
    if(bool){
        region.setAttribute("class", "regionImagePressed");
    }
    else{
        region.setAttribute("class","regionImage");
    }
}
