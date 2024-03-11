// Invocation du mode strict
"use strict";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsb2dpbiI6IkRlWGlscyIsImV4cCI6MTcxMDIzNjQ0MCwiaWF0IjoxNzEwMTUwMDQwfQ.xSvesXz867X74zhzgQ6gIp7fI_i3rcYfs5jDIaD-Aws"


// ### Initialisation du modèle ###
let satisfactory = new Satisfactory();

/* (La vue est initialisée dans le fichier "view.js"
    et accessible via la constante "view") */

// ### Initialisation des listeners ###
// Récupération saisi du clavier
view.btnSearch.addEventListener("click", ()=>{
    satisfactory.setSearch(view.searchBar.value);
    getAllNamesofItems()
        .then(data =>{
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

});

async function getAllNamesOfAllCategoriesApi() {
    try {
        const [items, buildings, fauna, transport, fuel] = await Promise.all([
            getAllNamesofItems(),
            getAllNamesofBuildings(),
            getAllNamesofFauna(),
            getAllNamesofTransport(),
            getAllNamesofFuel()
        ]);

        return {
            items,
            buildings,
            fauna,
            transport,
            fuel
        };
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données');
    }
}


async function getAllNamesofItems() {
    return fetch("https://dexils.dyndns.org:58000/api/item/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

async function getAllNamesofBuildings() {
    return fetch("https://dexils.dyndns.org:58000/api/building/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

async function getAllNamesofFauna() {
    return fetch("https://dexils.dyndns.org:58000/api/fauna/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

async function getAllNamesofTransport() {
    return fetch("https://dexils.dyndns.org:58000/api/transportation/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

async function getAllNamesofFuel() {
    return fetch("https://dexils.dyndns.org:58000/api/fuel/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}