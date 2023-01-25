var wgID;

var hashtags = [];

holeUserSki();

holeAlleHashtags();

function neueSki(){


    let titel = document.querySelector("#titel").value;
    let adresse = document.querySelector("#adresse").value;
    let bild = document.querySelector("#bild").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let status = document.querySelector("input[name='status']:checked").value;
    let zeitraum_anfang = document.querySelector("#zeitraum_anfang").value;
    let zeitraum_ende = document.querySelector("#zeitraum_ende").value;
    console.log(zeitraum_anfang)

    let formData = new FormData();
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('bild', bild);
    formData.append('beschreibung', beschreibung);
    formData.append('zeitraum_anfang', zeitraum_anfang)
    formData.append('zeitraum_ende', zeitraum_ende)
    formData.append('status', status);

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('user', userID);

    fetch("https://650627-1.web.fhgr.ch/php/neueSki.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

        document.querySelector('#nachricht').innerHTML = data;

        document.querySelector('#button-neue').classList.add("hidden");
        document.querySelector('#button-aktualisieren').classList.remove("hidden");
        document.querySelector('#button-loeschen').classList.remove("hidden");

        })

}

function holeUserSki() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://650627-1.web.fhgr.ch/php/holeUserSki.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            console.log(data);

            // falls es noch keine WG zu diesem User gibt
            // falls es noch keine WG zu diesem User gibt
            // falls es noch keine WG zu diesem User gibt
            if (data.length == 0) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um deine Ski aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-neue').classList.remove("hidden");

            } else {

                skiID = data[0].ID;

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du deine Ski bearbeiten:"

                // zeige den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bild-vorschau').src = data[0].bild;
                document.querySelector('#zeitraum_anfang').value = data[0].zeitraum_anfang;
                document.querySelector('#zeitraum_ende').value = data[0].zeitraum_ende;

                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }

                holeHashtagsVonWG(skiID);

            }
        })
}

function aktualisiereSki() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let zeitraum_anfang = document.querySelector('#zeitraum_anfang').value;
    let zeitraum_ende = document.querySelector('#zeitraum_ende').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;


    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('zeitraum_anfang', zeitraum_anfang);
    formData.append('zeitraum_ende', zeitraum_ende);
    formData.append('status', status);
    formData.append('bild', bild);


    formData.append('skiID', skiID);

    fetch("https://650627-1.web.fhgr.ch/php/aktualisiereSki.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            document.querySelector('#nachricht').innerHTML = data;

        })
}

function loescheSki() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    console.log(skiID);
    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('skiID', skiID);

    fetch("https://650627-1.web.fhgr.ch/php/loescheSki.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            console.log(data);
            
            document.querySelector('#nachricht').innerHTML = data;

            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#zeitraum_anfang').value = "";
            document.querySelector('#zeitraum_ende').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

            document.querySelector('#bild-vorschau').src = "";

            hashtags = [];
            skiID = "";



        })
};



function logout(){

    localStorage.clear();
    window.location = "/login.html";

}
