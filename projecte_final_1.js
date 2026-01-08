// Funció auxiliar per escriure els errors vermells
function posarError(id, text) {
    document.getElementById(id).innerHTML = text;
}

// 1. CHECKBOX: Veure contrasenya
document.getElementById("veureContra").onchange = function() {
    var camp = document.getElementById("contrasenya");
    if (document.getElementById("veureContra").checked) {
        camp.type = "text";
    } else {
        camp.type = "password";
    }
};

// 2. CHECKBOX: Veure contrasenya repetida
document.getElementById("veureRepetir").onchange = function() {
    var camp = document.getElementById("repetir");
    if (document.getElementById("veureRepetir").checked) {
        camp.type = "text";
    } else {
        camp.type = "password";
    }
};

// 3. BOTÓ ESBORRAR
document.getElementById("btnEsborrar").onclick = function() {
    document.getElementById("elMeuFormulari").reset(); // Neteja els camps
    
    // Neteja els textos vermells d'error
    posarError("errorNom", "");
    posarError("errorEdat", "");
    posarError("errorCP", "");
    posarError("errorEmail", "");
    posarError("errorContra", "");
    posarError("errorRepetir", "");
    posarError("errorAcceptar", "");

    // Amaga el missatge final
    document.getElementById("missatgeFinal").className = "ocult";
};

// 4. BOTÓ ENVIAR (LA PART IMPORTANT)
// Aquí és on fem TOTA la validació de cop
document.getElementById("elMeuFormulari").onsubmit = function(event) {
    event.preventDefault(); // Evita que s'enviï si hi ha errors

    // Variable per saber si trobem algun problema. Comencem pensant que no n'hi ha (false).
    var hiHaErrors = false;

    // --- VALIDACIÓ NOM ---
    var nom = document.getElementById("nom").value;
    if (nom === "") {
        posarError("errorNom", "El nom és obligatori.");
        hiHaErrors = true;
    } else {
        // Si hi ha nom, posem les majúscules (ho fem aquí ja que hem tret el blur)
        var paraules = nom.split(" ");
        var nomArreglat = "";
        for (var i = 0; i < paraules.length; i++) {
            var p = paraules[i];
            if (p.length > 0) {
                nomArreglat = nomArreglat + p[0].toUpperCase() + p.slice(1) + " ";
            }
        }
        document.getElementById("nom").value = nomArreglat.trim();
        posarError("errorNom", ""); // Esborrem error
    }

    // --- VALIDACIÓ EDAT ---
    var edat = document.getElementById("edat").value;
    if (edat === "") {
        posarError("errorEdat", "Has de seleccionar una edat.");
        hiHaErrors = true;
    } else {
        posarError("errorEdat", "");
    }

    // --- VALIDACIÓ CODI POSTAL ---
    var cp = document.getElementById("codipostal").value;
    if (cp === "") {
        posarError("errorCP", "El Codi Postal és obligatori.");
        hiHaErrors = true;
    } else if (cp.length !== 5 || isNaN(cp)) {
        posarError("errorCP", "Ha de tenir 5 números.");
        hiHaErrors = true;
    } else {
        posarError("errorCP", "");
    }

    // --- VALIDACIÓ EMAIL ---
    var email = document.getElementById("email").value;
    var posArrova = email.indexOf("@");
    var posPunt = email.lastIndexOf(".");
    
    if (email === "") {
        posarError("errorEmail", "L'email és obligatori.");
        hiHaErrors = true;
    } else if (posArrova === -1 || posPunt <= posArrova) {
        // Si no té @ O el punt està abans de l'@
        posarError("errorEmail", "Falta l'@ o el punt està malament.");
        hiHaErrors = true;
    } else {
        posarError("errorEmail", "");
    }

    // --- VALIDACIÓ CONTRASENYA ---
    var pass = document.getElementById("contrasenya").value;
    
    // Lògica dels requisits (comptadors)
    var majuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var minuscules = "abcdefghijklmnopqrstuvwxyz";
    var numeros = "0123456789";
    var simbols = "$!(a#%*()_+[]-={};:|,.<>/?@&"; 
    
    var teMaj = false; 
    var teMin = false; 
    var numCount = 0; 
    var teSim = false;

    for (var i = 0; i < pass.length; i++) {
        var lletra = pass[i];
        if (majuscules.indexOf(lletra) !== -1) teMaj = true;
        else if (minuscules.indexOf(lletra) !== -1) teMin = true;
        else if (numeros.indexOf(lletra) !== -1) numCount++;
        else if (simbols.indexOf(lletra) !== -1) teSim = true;
    }

    if (pass === "") {
        posarError("errorContra", "La contrasenya és obligatòria.");
        hiHaErrors = true;
    } else if (pass.length < 8) {
        posarError("errorContra", "Mínim 8 caràcters.");
        hiHaErrors = true;
    } else if (!teMaj || !teMin || numCount < 2 || !teSim) {
        posarError("errorContra", "Falten requisits (Maj, Min, 2 nums, símbol).");
        hiHaErrors = true;
    } else {
        posarError("errorContra", "");
    }

    // --- VALIDACIÓ REPETIR CONTRASENYA ---
    var repetir = document.getElementById("repetir").value;
    if (repetir === "") {
        posarError("errorRepetir", "Has de repetir la contrasenya.");
        hiHaErrors = true;
    } else if (repetir !== pass) {
        posarError("errorRepetir", "Les contrasenyes no coincideixen.");
        hiHaErrors = true;
    } else {
        posarError("errorRepetir", "");
    }

    // --- VALIDACIÓ CHECKBOX ---
    var acceptat = document.getElementById("acceptar").checked;
    if (acceptat === false) {
        posarError("errorAcceptar", "Has d'acceptar la política.");
        hiHaErrors = true;
    } else {
        posarError("errorAcceptar", "");
    }

    // --- RESULTAT FINAL ---
    if (hiHaErrors === true) {
        // Si hem trobat algun error pel camí, avisem i NO mostrem el resultat
        alert("Hi ha errors o camps buits. Revisa el formulari.");
    } else {
        // Si tot està perfecte
        var caixa = document.getElementById("missatgeFinal");
        caixa.className = ""; // Fem visible la caixa verda
        
        document.getElementById("resultatText").innerHTML = 
            "Nom: " + document.getElementById("nom").value + "<br>" +
            "Edat: " + document.getElementById("edat").value + "<br>" +
            "Email: " + document.getElementById("email").value;
    }
};