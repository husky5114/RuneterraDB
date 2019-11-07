var regionNames = ["all", "demacia","freljord","ionia","noxus","piltoverzuan","shadowisles"];
regionNames.forEach(displayRegion);

var regionCounts = [
    ["DE",56],
    ["FR",57]    
]
displayCards(regionCounts);





function displayRegion(name){
    var image = document.createElement("img");
    image.setAttribute("src", "Resources/Region_images/icon-" + name + ".png");
    image.setAttribute("class", "regionImage");
    document.getElementById("regions").appendChild(image);
}

function displayCards(rCounts){
    for(var i=0; i < rCounts.length; ++i){
        var region = rCounts[i][0];
        for(var j=1; j <= rCounts[i][1]; ++j){
            var image = document.createElement("img");
            image.setAttribute("src", "Resources/Card_Images/01" + region + "0" + j.toString() + ".png");
            image.setAttribute("class", "card");
            image.setAttribute("onerror", "this.style.display='none'")
            document.getElementById("cards").appendChild(image);
        }
    }
}

