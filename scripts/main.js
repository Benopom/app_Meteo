import tabEnOrdre from './Utilitaire/gestionTemps.js'; 

console.log("Depuis main.js" + tabEnOrdre);

const CLEAPI = '62d1f56bbafa870092f9b432e4b7912b';
let resultatsAPI;

const temps = document.querySelector('.meteo');
const temperature = document.querySelector('.temp');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure');
const temperaturePourHeure = document.querySelectorAll('.temperaturePourHeure');
const jourDiv = document.querySelectorAll('.jour'); //Renvoi un tableau 
const tempJourDIV = document.querySelectorAll('.temperature');
const imgIcone = document.querySelector('.image');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);
    }, () => {
        alert(`Vous n'avez pas autorisé la géolocalisation, l'application ne peut pas fonctionner. Veuillez l'activer !`)
    
    })
}

function AppelAPI(long, lat) {
   // console.log(long, lat);
/*
   const myPromesse = new Promise((resolve, reject) => {

    resolve("cpicpi");
   })

   myPromesse.then((result) =>{
       console.log(result);
   })
*/
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`) //retourne une promesse, se résoud lorsque les données vont vraiment être présentes
    .then((response) => { //réponse de l'API, de la promesse juste au dessous
        //console.log(response);
        return response.json(); // réponse de l'API pas directement lisible, il faut la transformer en Javascript object notation plus facilement manipulable
    
    })
    .then((data) => { //COMMENT IL SAIT CE QU'EST DATA ? --> Il prend la réponse à la promesse précédente .then
       console.log(data);
        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = Math.round(resultatsAPI.current.temp) + " ºC";
        localisation.innerText = resultatsAPI.timezone;

        // Les heures par tranche de trois avec leurs temperatures 

        let heureActuelle = new Date().getHours();

        for (let i = 0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i*3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`
            } else if(heureIncr === 24) {
                heure[i].innerText = "00 h";
            } else {

            heure[i].innerText = heureIncr + "h";
            }
        }

        //temp pour 3h

        for (let j = 0; j < temperaturePourHeure.length; j++) {


                temperaturePourHeure[j].innerText = `${Math.round(resultatsAPI.hourly[j*3].temp)} ºC`
        
            }




        //trois premières lettres des jours 

        for(let k = 0; k < tabEnOrdre.length; k++) {
            jourDiv[k].innerText = tabEnOrdre[k].slice(0, 3); 
        }

        //Temp par jour 

        for(let l = 0; l < 7 ; l++) {
            tempJourDIV[l].innerText = `${Math.round(resultatsAPI.daily[l+1].temp.day)} ºC`;
        }


        //Icone dynamique 
        if (heureActuelle >= 6 && heureActuelle <21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        }
        else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');
    })

}

