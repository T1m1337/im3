console.log("Hello Registrierung");

function registrieren(){

    let benutzername = document.querySelector("#benutzername").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    //console.log(benutzername + email + password);




    let formData = new FormData();
    formData.append('benutzername', benutzername);
    formData.append('email', email);
    formData.append('password', password);

    fetch("https://650627-1.web.fhgr.ch/php/registrieren.php",
        {
            body: formData,
            method: "post",
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

        // console.log(data);
        document.querySelector('#nachricht').innerHTML = data;
        if(data == 'Registrierung erfolgreich.'){
            location.href = './login.html';
        }
        
        })
}