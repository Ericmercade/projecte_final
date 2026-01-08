


// EXERCICI 2.1

function exercici01() {
  let div = document.getElementById("resultats");
  div.innerHTML = "";

  let p = document.createElement("p");
  p.textContent = "Nombre total d'accidents: " + obj.length;
  div.appendChild(p);
}


// EXERCICI 2.2

function exercici02() {
  let div = document.getElementById("resultats");
  div.innerHTML = "";

  let compta = {};

  for (let i = 0; i < obj.length; i++) {
    let dia = obj[i].diaSet;
    if (compta[dia] === undefined) {
      compta[dia] = 1;
    } else {
      compta[dia]++;
    }
  }

  let maxDia = "";
  let max = 0;

  for (let dia in compta) {
    if (compta[dia] > max) {
      max = compta[dia];
      maxDia = dia;
    }
  }

  let p = document.createElement("p");
  p.textContent = "Dia amb més accidents: " + maxDia + " (" + max + ")";
  div.appendChild(p);
}


// EXERCICI 2.3

function exercici03() {
  let div = document.getElementById("resultats");
  div.innerHTML = "";

  let compta = {};
  compta[-1] = 0;
  for (let i = 1; i <= 10; i++) compta[i] = 0;

  for (let i = 0; i < obj.length; i++) {
    let d = obj[i].nDist;
    if (compta[d] === undefined) {
      compta[-1]++;
    } else {
      compta[d]++;
    }
  }

  let ul = document.createElement("ul");

  let liAltres = document.createElement("li");
  liAltres.textContent = "Altres (-1): " + compta[-1];
  ul.appendChild(liAltres);

  for (let i = 1; i <= 10; i++) {
    let li = document.createElement("li");
    li.textContent = "Districte " + i + ": " + compta[i];
    ul.appendChild(li);
  }

  div.appendChild(ul);
}


// EXERCICI 2.4

function exercici04() {
  creaFormulari();

  let select = document.getElementById("districtes");
  let div = document.getElementById("resultats");

  let p = document.createElement("p");
  p.textContent = "Selecciona un districte";
  div.appendChild(p);

  select.addEventListener("change", function () {
    let nom = select.value;
    let contador = 0;

    for (let i = 0; i < obj.length; i++) {
      if (obj[i].districte === nom) {
        contador++;
      }
    }

    p.textContent = "Accidents al districte " + nom + ": " + contador;
  });
}


// EVENTS DEL MENÚ

document.getElementById("exer01").addEventListener("click", exercici01);
document.getElementById("exer02").addEventListener("click", exercici02);
document.getElementById("exer03").addEventListener("click", exercici03);
document.getElementById("exer04").addEventListener("click", exercici04);
