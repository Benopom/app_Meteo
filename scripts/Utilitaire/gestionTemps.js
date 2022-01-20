let tableauJours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date(); // Auourd'hui
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabEnOrdre = tableauJours.slice(tableauJours.indexOf(jourActuel)).concat(tableauJours.slice(0, tableauJours.indexOf(jourActuel)));

//console.log(tabEnOrdre);


export default tabEnOrdre;
