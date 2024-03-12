// Invocation du mode strict
"use strict";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsb2dpbiI6IkRlWGlscyIsImV4cCI6MTcxMjgyNjg2OCwiaWF0IjoxNzEwMjM0ODY4fQ.Z6oOlkJb1xTqNCgkPBDL8ZjG0UlxNLXwj_WAYfmll9U"
let searchList = document.getElementById("searchList");
let responseSearch = document.getElementById("responseSearch");


// ### Initialisation du modèle ###
let satisfactory = new Satisfactory();

/* (La vue est initialisée dans le fichier "view.js"
    et accessible via la constante "view") */

// ### Chargement des noms lorsque le DOM est chargé ###
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("items") === null || localStorage.getItem("itemsReceips") === null || localStorage.getItem("buildings") === null || localStorage.getItem("buildingsReceips") === null || localStorage.getItem("faunas") === null || localStorage.getItem("transportations") === null || localStorage.getItem("transportationsReceips") === null) {
        getAllNamesOfAllCategoriesApi().catch((err) => console.error(err));
    }
})

async function getAllNamesOfAllCategoriesApi() {
    try {
        const [items,itemsReceips, buildings,buildingsReceips, faunas, transportations,transportationsReceips] = await Promise.all([
            getAllNamesofItems(),
            getAllReceipsNamesofItems(),
            getAllNamesofBuildings(),
            getAllReceipsNamesofBuildings(),
            getAllNamesofFauna(),
            getAllNamesofTransportation(),
            getAllReceipsNamesofTransportations()
        ]);

        const itemsReceipsName = [];
        const buildingsReceipsName = [];
        const transportationsReceipsName = [];

        itemsReceips.itemsReceip.forEach(item => {
            if(item.ingredient_1 !== null){
                itemsReceipsName.push({recette_item: item.recette});
            }
        });

        buildingsReceips.buildingsReceip.forEach(building => buildingsReceipsName.push({recette_building: building.recette}));
        transportationsReceips.transportationsReceip.forEach(transportation => transportationsReceipsName.push({recette_transportation: transportation.recette}));

        localStorage.setItem("items", JSON.stringify(items.items));
        localStorage.setItem("itemsReceips", JSON.stringify(itemsReceipsName));
        localStorage.setItem("buildings", JSON.stringify(buildings.buildings));
        localStorage.setItem("buildingsReceips", JSON.stringify(buildingsReceipsName));
        localStorage.setItem("faunas", JSON.stringify(faunas.faunas));
        localStorage.setItem("transportations", JSON.stringify(transportations.transportations));
        localStorage.setItem("transportationsReceips", JSON.stringify(transportationsReceipsName));

    } catch (error) {
        throw new Error('Erreur lors de la récupération des données');
    }
}




/**
 * Récupération de tout les nom de la catégorie 'Items'
 * @returns {Promise<any>}
 */
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

/**
 * Récupération de tout les nom des recette de la catégorie 'Items'
 * @returns {Promise<any>}
 */
async function getAllReceipsNamesofItems() {
    return fetch("https://dexils.dyndns.org:58000/api/receip/item/allReceips", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

/**
 * Récupération de tout les nom de la catégorie 'Buildings'
 * @returns {Promise<any>}
 */
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

/**
 * Récupération de tout les nom des recette de la catégorie 'Building'
 * @returns {Promise<any>}
 */
async function getAllReceipsNamesofBuildings() {
    return fetch("https://dexils.dyndns.org:58000/api/receip/building/allReceips", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

/**
 * Récupération de tout les nom de la catégorie 'Fauna'
 * @returns {Promise<any>}
 */
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

/**
 * Récupération de tout les nom de la catégorie 'Transportation'
 * @returns {Promise<any>}
 */
async function getAllNamesofTransportation() {
    return fetch("https://dexils.dyndns.org:58000/api/transportation/getAllNames", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

/**
 * Récupération de tout les nom des recette de la catégorie 'Transportation'
 * @returns {Promise<any>}
 */
async function getAllReceipsNamesofTransportations() {
    return fetch("https://dexils.dyndns.org:58000/api/receip/transportation/allReceips", {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

// ### Initialisation des listeners ###
// Récupération saisi du clavier via le bouton
view.btnSearch.addEventListener("click", ()=>{
    satisfactory.setSearch(view.searchBar.value);

});

// Récupération saisi du clavier pour afficher les suggestions
view.searchBar.addEventListener("keyup", (event) => {
    let input = event.target.value;
    let items = JSON.parse(localStorage.getItem("items"));
    let itemsReceips = JSON.parse(localStorage.getItem("itemsReceips"));
    let buildings = JSON.parse(localStorage.getItem("buildings"));
    let buildingsReceips = JSON.parse(localStorage.getItem("buildingsReceips"));
    let faunas = JSON.parse(localStorage.getItem("faunas"));
    let transportations = JSON.parse(localStorage.getItem("transportations"));
    let transportationsReceips = JSON.parse(localStorage.getItem("transportationsReceips"));


    let resultItems = items.filter(item => item.nom_item.toLowerCase().includes(input.toLowerCase()));
    let resultItemsReceip =  itemsReceips.filter(item => item.recette_item.toLowerCase().includes(input.toLowerCase()));
    let resultBuildings = buildings.filter(building => building.nom_batiment.toLowerCase().includes(input.toLowerCase()));
    let resultBuildingsReceip =  buildingsReceips.filter(building => building.recette_building.toLowerCase().includes(input.toLowerCase()));
    let resultFaunaReceip =  faunas.filter(fauna => fauna.nom_fauna.toLowerCase().includes(input.toLowerCase()));
    let resultTransportations = transportations.filter(transportation => transportation.nom_transportation.toLowerCase().includes(input.toLowerCase()));
    let resultTransportationsReceip =  transportationsReceips.filter(transportation => transportation.recette_transportation.toLowerCase().includes(input.toLowerCase()));

    searchList.innerHTML = ""
    searchList.hidden = input === "";

    switch (input.toLowerCase()) {
        case "":

            break
        case "item":
            computeSeachList(resultItems, "nom_item", "Item", items);
            break;
        case "recette item":
            computeSeachList(resultItemsReceip, "recette_item", "Recette d'item", itemsReceips);
            break;
        case "bâtiment":
            computeSeachList(resultBuildings, "nom_batiment", "Bâtiment", buildings);
            break;
        case "recette bâtiment":
            computeSeachList(resultBuildingsReceip, "recette_building", "Recette de bâtiment", buildingsReceips);
            break;
        case "faune":
            computeSeachList(resultFaunaReceip, "nom_fauna", "Faunes",faunas);
            break;
        case "transport":
            computeSeachList(resultTransportations, "nom_transportation", "Transport", transportations);
            break;
        case "recette transport":
            computeSeachList(resultTransportationsReceip, "recette_transportation", "Recette de transport", transportationsReceips);
            break;
        default:
            computeSeachList(resultItems, "nom_item", "Item");
            computeSeachList(resultItemsReceip, "recette_item", "Recette d'item");
            computeSeachList(resultBuildings, "nom_batiment", "Bâtiment");
            computeSeachList(resultBuildingsReceip, "recette_building", "Recette de bâtiment");
            computeSeachList(resultFaunaReceip, "nom_fauna", "Faunes");
            computeSeachList(resultTransportations, "nom_transportation", "Transport");
            computeSeachList(resultTransportationsReceip, "recette_transportation", "Recette de transport");
    }

    satisfactory.setSearch(input)

    // Gestion du click sur les suggestions
    view.searchList.childNodes.forEach(elementLi => {
        elementLi.addEventListener('click', () => {
            satisfactory.setSearch(elementLi.getAttribute('data-text-value'));
            view.searchBar.value = satisfactory.getSearch();
            searchList.hidden = true;

            // Récupération de l'url necessaire pour récupérer l'id de l'élément
            let url = "";
            switch (elementLi.getAttribute('data-text-category')) {
                case "Item":
                    url = "item/getItemIdByName/" + satisfactory.getSearch();
                    break;
                case "Recette d'item":
                    url = "receip/item/getItemIdByName/" + satisfactory.getSearch();
                    break;
                case "Bâtiment":
                    url = "building/getBuildingIdByName/" + satisfactory.getSearch();
                    break;
                case "Recette de bâtiment":
                    url = "receip/building/getBuildingIdByName/" + satisfactory.getSearch();
                    break;
                case "Faunes":
                    url = "fauna/getFaunaIdByName/" + satisfactory.getSearch();
                    break;
                case "Transport":
                    url = "transportation/getTransportationIdByName/" + satisfactory.getSearch();
                    break;
                case "Recette de transport":
                    url = "receip/transportation/getTransportationIdByName/" + satisfactory.getSearch();
                    break;
            }
            
            // Récupération de l'id de l'élément
            getIdElementByName(url)
                .then((data) => {
                    if(data['item']) {
                        url = "item/getItemInfoById/" + data['item'][0].id_item;
                    } else if(data['building']) {
                        url = "building/getBuildingInfoById/" + data['building'][0].id_building;
                    }else if(data['fauna']) {
                        url = "fauna/getFaunaInfoById/" + data['fauna'][0].id_fauna;
                    }else if(data['transportation']){
                        url = "transportation/getTransportationInfoById/" + data['transportation'][0].id_transportation;
                    }

                    getElementInfoById(url)
                    .then((data) => {
                        console.log(data['item'])
                        computeItemElement(data)
                    })
                });

               
                
        });
    });

})

// Création de l'élément li pour alimenter la liste de suggestions
function computeSeachList(result, name, category, allResult = []) {
    if(allResult.length === 0) {
        result.forEach(elem =>{
            let liElement = document.createElement("li");
            liElement.className = "list-search-element";
            liElement.dataset.textValue = elem[name];
            liElement.dataset.textCategory = category;
            liElement.innerText = elem[name] + " - " + category ;
            searchList.appendChild(liElement);
        });
    }else {
        allResult.forEach(elem =>{
            let liElement = document.createElement("li");
            liElement.className = "list-search-element";
            liElement.dataset.textValue = elem[name];
            liElement.dataset.textCategory = category;
            liElement.innerText = elem[name] + " - " + category ;
            searchList.appendChild(liElement);
        });
    }

}

async function getIdElementByName(url) {
    
    return fetch(`https://dexils.dyndns.org:58000/api/${url}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
        
}

async function getElementInfoById(url){
    return fetch(`https://dexils.dyndns.org:58000/api/${url}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    });
}

function computeItemElement(item) {
    let itemElement = item['item'][0]
    console.log(item)
    let containerDiv = document.createElement('div');
    containerDiv.className = "response-container";
    responseSearch.appendChild(containerDiv);

    let itemElementPricipalDiv = document.createElement('div');
    itemElementPricipalDiv.className = "element-principal";
    containerDiv.appendChild(itemElementPricipalDiv);

    let nameAndCategoryP = document.createElement('p');
    nameAndCategoryP.className = "name-and-category"
    nameAndCategoryP.innerHTML = `${itemElement.item_name} | ${itemElement.item_category}`;
    itemElementPricipalDiv.appendChild(nameAndCategoryP);

    let imgAndDescriptionDiv = document.createElement("div");
    imgAndDescriptionDiv.className = "img-and-description";
    itemElementPricipalDiv.appendChild(imgAndDescriptionDiv);

    let itemImg = document.createElement('img');
    itemImg.src = "data:image/gif;base64," + item.imgBase64
    imgAndDescriptionDiv.appendChild(itemImg)

}





