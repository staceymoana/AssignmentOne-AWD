function showVowels() {
    //Get name entered by user
    const inputChars = document.vowel.vowelInput.value;
    var vowel = "aeiouAEIOU";
    var check = false;

    let output = document.getElementById("vowelMsg");


    for(var i = 0; i < inputChars.length; i++) {
        var position = vowel.indexOf(inputChars[i]);

        if (position >= 0) {
            check = true;
        } else {
            check = false;
            break;
        }
    }

    if (check != true) {
        output.innerHTML = "False";
    } else {
        output.innerHTML = "True";
    }
}

function showImage() {
    var checkbox = document.getElementById("pictureCheck");
    var output = document.getElementById("checkboxImg");

    if (checkbox.checked == true) {
        output.style.display = "initial";
    } else {
        output.style.display = "none";
    }
}

function showGST() {
    var inputNum = parseInt(document.GST.GSTInput.value);
    var output = document.getElementById("GSTcalc");
    if(!isNaN(inputNum)) {
        var GST = inputNum * 0.15;

        output.innerHTML = "GST = $" + GST;
    } else {
        output.innerHTML = "Please enter a valid number."
    }
}

function displayDate() {
    var dateInput = document.showDate.inputDate.value;
    var output = document.getElementById("outputDate");
    var date = new Date(dateInput);

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var formattedDate = date.getDate() + " " +  months[date.getMonth()] + " " + date.getFullYear();
    if(formattedDate.includes(NaN)) {
        output.innerHTML = "Please enter date correctly."
    } else {
        output.innerHTML = formattedDate;
    }
    //output.innerHTML = date.getDate() + " " +  months[date.getMonth()] + " " + date.getFullYear();
}

function loadRSS() {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = "https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss"
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", proxy + url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            processRSS(this);
        }
    };
}

function processRSS(rss) {

    const items = rss.responseXML.getElementsByTagName("item");

    var rssDiv = document.getElementById('rssContent');

    var itemData;
     
    for(var i=0; i < items.length; i++) {

        itemData = items[i].children;
        let title, description, link, pubDate;

        for(var j=0; j < itemData.length; j++) {

            if (itemData[j].tagName == "title") {
                title = itemData[j].innerHTML;
            } else if (itemData[j].tagName == "link") {
                link = itemData[j].innerHTML;
            } else if (itemData[j].tagName == "description") {
                description = itemData[j].innerHTML;
            } else if (itemData[j].tagName == "pubDate") {
                pubDate = itemData[j].innerHTML;
            }
        }
   
        rssDiv.innerHTML += "<div class='articlecontainer' id='article'>" + "<p id='title'><a href='" + link + "'><b>" + title + "</b></a></p>" + "<br>" + description + "<br><br>" + pubDate + "</div>";
    }
}