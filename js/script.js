console.log("HAllo Welt");

holeUser();

holeSki();

function holeUser() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://650627-1.web.fhgr.ch/php/holeUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            // console.log(data);

            // console.log(data[0].name);

            document.querySelector("#username").innerHTML = data[0].name;

        })
}


function holeSki(){

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://650627-1.web.fhgr.ch/php/holeSki.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            console.log(data);

            SkiAnzeigen(data);

            // console.log(data[0].name);

        })



}

function SkiAnzeigen(data){

    data.forEach(ski => {


        if (parseInt(ski.status)) {

            ski.status = '🟢';

        } else {

            ski.status = "🔴"

        }


        let skiContainer = document.createElement("div");
        skiContainer.innerHTML =

            '<div class="ski">' +
            '<h2>' + ski.status + ' ' + ski.titel + '</h2>' +
            '<img class="ski-image" src="' + ski.bild + '">' +
            '<p>' + ski.beschreibung + '</p>' +
            '📍 <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=' + ski.adresse + '">' + ski.adresse + '</a> <br>' +
            '👉 <a target="_blank" href="mailto:' + ski.email + '">' + ski.email + '</a>' +
            '<p> <b> <span id="WG-' + ski.ID + '">  </span> <b> </p>' +
            '<p>' + ski.zeitraum_anfang + ' - ' + ski.zeitraum_ende + '</p>'
            + '</div>';

        document.getElementById("liste-ski").appendChild(skiContainer);

        holeHashtagsVonWG(ski.ID);

    });

}


function logout(){

    localStorage.clear();
    window.location = "/login.html";

}