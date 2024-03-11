// Invocation du mode strict
"use strict";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsb2dpbiI6IkRlWGlscyIsImV4cCI6MTcxMDIzMjYzMywiaWF0IjoxNzEwMTQ2MjMzfQ.Unipv8B9JjgN7wZHeHr_DrH9omiPf2dq_SUZuPTLQqs"


// ### Initialisation du modèle ###
let satisfactory = new Satisfactory();

/* (La vue est initialisée dans le fichier "view.js"
    et accessible via la constante "view") */

// ### Initialisation des listeners ###
// Récupération saisi du clavier
view.btnSearch.addEventListener("click", ()=>{
    satisfactory.setSearch(view.searchBar.value);
    getAllNamesOfAllCategoriesApi()
        .then(data =>{
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

});

function getAllNamesOfAllCategoriesApi() {
    return fetch("https://dexils.dyndns.org:58000/api/item/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}