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
        var regionShort = rCountsArray[i][0];
        for(var j=1; j <= rCountsArray[i][1]; ++j){
            var image = document.createElement("img");
            var idNum = padZeros_s(j.toString(),3);
            image.setAttribute("src", "Resources/Card_Images/01" + regionShort + idNum + ".png");
            image.setAttribute("id", regionShort+idNum);
            image.setAttribute("class", "card " + regionShort);
            image.setAttribute("onerror", "this.parentNode.removeChild(this)");
            document.getElementById("cards").appendChild(image);
        }
    }
}

function displayRegionCards(region, show=true){
    if(region == "all"){
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
        var rCount = regionCounts[region][1];
        var regionShort = regionCounts[region][0];
        for(var i=1; i<rCount; ++i){
            var card = document.getElementById(regionShort+padZeros_s(i.toString(),3));
            console.log(card);
            try{
                if(show){
                    card.style.display = "inline";
                }
                else{
                    card.style.display = "none";
                }
            }
            catch{};
        }
    }
}

function filter(region){
    var all = document.getElementById("all");
    if(region == "all"){
        var activeRegions = document.querySelectorAll(".regionImagePressed");
        for(var i=0; i<activeRegions.length; ++i){
            setHeader(activeRegions[i],false);
        }
        setHeader(all,true);
    }
    else{
        if(all.getAttribute("class") == "regionImagePressed"){
            setHeader(all,false);
            displayRegionCards("all",false);
        }
        var activeRegion = document.getElementById(region);
        setHeader(activeRegion,true);
    }
    displayRegionCards(region);
}

function unfilter(region){
    var regionButton = document.getElementById(region);
    if(isDown(regionButton)){
        displayRegionCards(region,false);
        setHeader(regionButton,false);
    }
    if(document.querySelectorAll(".regionImagePressed").length == 0){
        var all = document.getElementById("all");
        setHeader(all,true);
        displayRegionCards("all");
    }
}

function isDown(regionButton){
    return regionButton.getAttribute("class") == "regionImagePressed";
}

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



function padZeros_s(num, zeros){
    return "0".repeat(zeros - num.length) + num;
}