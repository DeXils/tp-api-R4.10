// Invocation du mode strict
"use strict";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsb2dpbiI6IkRlWGlscyIsImV4cCI6MTcxMjgyNjg2OCwiaWF0IjoxNzEwMjM0ODY4fQ.Z6oOlkJb1xTqNCgkPBDL8ZjG0UlxNLXwj_WAYfmll9U"
let searchList = document.getElementById("searchList");
let responseSearch = document.getElementById("responseSearch");

// nom des elements pour alimenté la receherche
let items;
let itemsReceips;
let buildings;
let buildingsReceips;
let faunas;
let transportations;
let transportationsReceips;

// ### Initialisation du modèle ###
let satisfactory = new Satisfactory();

/* (La vue est initialisée dans le fichier "view.js"
    et accessible via la constante "view") */

// ### Chargement des noms lorsque le DOM est chargé ###
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("items") === null || localStorage.getItem("itemsReceips") === null || localStorage.getItem("buildings") === null || localStorage.getItem("buildingsReceips") === null || localStorage.getItem("faunas") === null || localStorage.getItem("transportations") === null || localStorage.getItem("transportationsReceips") === null) {
        getAllNamesOfAllCategoriesApi().catch((err) => console.error(err));
    }
    // alimentation des noms
    items = JSON.parse(localStorage.getItem("items"));
    itemsReceips = JSON.parse(localStorage.getItem("itemsReceips"));
    buildings = JSON.parse(localStorage.getItem("buildings"));
    buildingsReceips = JSON.parse(localStorage.getItem("buildingsReceips"));
    faunas = JSON.parse(localStorage.getItem("faunas"));
    transportations = JSON.parse(localStorage.getItem("transportations"));
    transportationsReceips = JSON.parse(localStorage.getItem("transportationsReceips"));
})

/**
 * Récupération de tout les noms des catégories
 * @returns {Promise<void>}
 */
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

/**
 * Récupération de l'id de l'élement via l'url donnée
 * @param url
 * @returns {Promise<any>}
 */
async function getIdElementByName(url) {

    return fetch(`https://dexils.dyndns.org:58000/api/${url}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        return response.json();
    });

}

/**
 * Récupération de l'élément via l'id dans l'url donnée
 * @param url
 * @returns {Promise<any>}
 */
async function getElementInfoById(url){
    return fetch(`https://dexils.dyndns.org:58000/api/${url}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        return response.json();
    });
}

/**
 * Récupération de(s) recette(s) grace a l'id dans l'url donnée
 * @param url
 * @returns {Promise<any>}
 */
async function getReceipInfoById(url){
    return fetch(`https://dexils.dyndns.org:58000/api/${url}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        return response.json();
    });
}

/**
 * Récupération de tout les items d'une recette
 * @param receip
 * @param receipId
 * @returns {Promise<void>}
 */
async function getAllItemForReceip(receip,receipId) {
    let promise = []
    let ingredientNumber = [];

    for (let i = 1; i <= 5; i++) {

        const ingredient = receip[`ingredient_${i}`];
        const ingredientId = receip[`ingredient_${i}_id`];
        if (ingredient) {
            computeSimpleElement("div", "receip-ingredient", "", "",document.querySelector("#ingredientsGroup"+receipId),"ingredientReceip"+receipId+"-"+i);
            computeSimpleElement("p", "", ingredient, "",document.querySelector("#ingredientReceip"+receipId+"-"+i),"");
            ingredientNumber.push(receip[`ingredient_${i}_nombre`])
            promise.push(getElementInfoById("item/getItemInfoById/" + ingredientId));

        }
    }
    Promise.all(promise).then((data) => {
        data.forEach((elem,index) => {
            computeSimpleElement("img", "", "", "data:image/gif;base64," + elem.imgBase64 ,document.querySelector("#ingredientReceip"+receipId+"-"+(index+1)),"");
            computeSimpleElement("p", "", ingredientNumber[index], "",document.querySelector("#ingredientReceip"+receipId+"-"+(index+1)),"");
        })


    })
}

// Récupération saisi du clavier pour afficher les suggestions
view.searchBar.addEventListener("keyup", (event) => {
    // valeur du clavier
    let input = event.target.value;

    //Récupération des noms contenant la valeur de input
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

                    // Récupération des information des éléments en fonction de la catégorie qu'il appartient
                    if(data['item']) {
                        url = "item/getItemInfoById/" + data['item'][0].id_item;
                        satisfactory.setCurrentElementId(data['item'][0].id_item);
                        satisfactory.setCurrentElementType("item");
                        getElementInfoById(url).then(item => {
                            satisfactory.setCurrentElement(item);
                            computeInfoElement(item, data['item'][0].id_item, "item")
                        })
                    } else if(data['building']) {
                        url = "building/getBuildingInfoById/" + data['building'][0].id_building;
                        satisfactory.setCurrentElementId(data['building'][0].id_building);
                        satisfactory.setCurrentElementType("building");
                        getElementInfoById(url).then(building => {
                            satisfactory.setCurrentElement(building);
                            computeInfoElement(building, data['building'][0].id_building, "building")
                        })
                    }else if(data['fauna']) {
                        url = "fauna/getFaunaInfoById/" + data['fauna'][0].id_fauna;
                        satisfactory.setCurrentElementId(data['fauna'][0].id_fauna);
                        satisfactory.setCurrentElementType("fauna");
                        getElementInfoById(url).then(fauna => {
                            satisfactory.setCurrentElement(fauna);
                            computeInfoElement(fauna, data['fauna'][0].id_fauna, "fauna")
                        })
                    }else if(data['transportation']){
                        url = "transportation/getTransportationInfoById/" + data['transportation'][0].id_transportation;
                        satisfactory.setCurrentElementId(data['transportation'][0].id_transportation);
                        satisfactory.setCurrentElementType("transportation");
                        getElementInfoById(url).then(transportation => {
                            satisfactory.setCurrentElement(transportation);
                            computeInfoElement(transportation, data['transportation'][0].id_transportation, "transportation")
                        })
                    }
                });
        });
    });

})

/**
 * Création de l'élément li pour alimenter la liste de suggestions
 * @param result
 * @param name
 * @param category
 * @param allResult
 */
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

/**
 * Création d'un element html dynamique
 * @param typeElement
 * @param classElement
 * @param textElement
 * @param srcElemennt
 * @param parentElement
 * @param idParentElement
 */
function computeSimpleElement(typeElement,classElement, textElement, srcElemennt, parentElement, idParentElement) {
    let simpleElement = document.createElement(typeElement);
    if(classElement !== ""){
        simpleElement.className = classElement;
    }
    if(textElement !== "") {
        simpleElement.innerHTML = textElement;
    }
    if(srcElemennt !== ""){
        simpleElement.src = srcElemennt;
    }
    if(idParentElement !== ""){
        simpleElement.id = idParentElement;
    }
    parentElement.appendChild(simpleElement);
}

/**
 * Création du résumé de l'élément
 * @param element
 * @param elementId
 * @param elementType
 */
function computeInfoElement(element, elementId, elementType) {
    let elementData = element[elementType][0];

    view.responseContainer.hidden = false;
    view.responseContainer.innerText = "";

    computeSimpleElement("div", "element-principal", "","", view.responseContainer,"");
    let categoryElement;
    if(elementData[elementType + "_category"] !== undefined){
        categoryElement = `<i class="fa-solid fa-box-archive"></i> ${elementData[elementType + "_category"]}`;
    } else {
        categoryElement = `<i class="fa-solid fa-face-smile-beam"></i> ${elementData[elementType + "_behavior"]}`;
    }

    computeSimpleElement("h1", "name-and-category", `${elementData[elementType + "_name"]} |${categoryElement}`, "",document.querySelector(".element-principal"),"");
    computeSimpleElement("i", "fa-solid fa-thumbtack", "", "",document.querySelector(".name-and-category"), "favoriteBtn");
    computeSimpleElement("div", "img-and-other", "","", document.querySelector(".element-principal"),"");
    computeSimpleElement("img", "", "","data:image/gif;base64," + element.imgBase64, document.querySelector(".img-and-other"),"");
    computeSimpleElement("div", "element-stats", "","", document.querySelector(".img-and-other"),"");
    computeSimpleElement("p", "", "<i class=\"fa-solid fa-book\"></i> Description : " + elementData[elementType + "_description"], "",document.querySelector(".element-stats"),"");

    if (elementType !== "fauna") {
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-lock\"></i> : " + elementData[elementType + "_unlock"], "",document.querySelector(".element-stats"),"");
    }

    if (elementType === "building" || elementType === "transportation") {
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-up-right-and-down-left-from-center\"></i> Largeur : " + elementData[elementType + "_width"] + " m","", document.querySelector(".element-stats"),"");
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-arrows-left-right\"></i> Longueur : " + elementData[elementType + "_length"]+ " m","", document.querySelector(".element-stats"),"");
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-arrows-up-down\"></i> Hauteur : " + elementData[elementType + "_height"]+ " m", "",document.querySelector(".element-stats"),"");
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-chart-area\"></i> Aire : " + elementData[elementType + "_area"]+ " m²","", document.querySelector(".element-stats"),"");
        let elementPowerConso = elementData[elementType + "_category"] !== "Alimentation" ? "<i class=\"fa-solid fa-bolt\"></i> Consomation : " : "<i class=\"fa-solid fa-bolt\"></i> Génère : ";
        computeSimpleElement("p", "", elementPowerConso + elementData[elementType + "_power"] + " MW", "", document.querySelector(".element-stats"),"");
    }

    if (elementType === "item") {
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-layer-group\"></i> Stack de : " + elementData[elementType + "_stack"], "",document.querySelector(".element-stats"),"");
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-circle-info\"></i> Point générer dans la broyeuse A.W.E.S.O.M.E. : " + elementData[elementType + "_ressources_point"], "",document.querySelector(".element-stats"),"");
    }

    if(elementType === "fauna") {
        computeSimpleElement("p", "", "<i class=\"fa-solid fa-heart\"></i> : " + elementData[elementType + "_life_point"], "",document.querySelector(".element-stats"),"");
        if(elementData[elementType + "_loot_size"]) {
            computeSimpleElement("p", "", "<i class=\"fa-solid fa-sack-xmark\"></i> Loot obtenue : " + elementData[elementType + "_loot_size"] + " " + elementData[elementType + "_loot_name"], "",document.querySelector(".element-stats"),"");
        }

        for (let i = 1; i <= 3; i++) {
            const damage = elementData[`${elementType}_point_damage_${i}`];
            const damageName = elementData[`${elementType}_name_damage_${i}`];
            if (damage) {
                computeSimpleElement("p", "", '<i class="fa-solid fa-burst"></i> ' + damageName + " - " + damage + " segments de dégats", "",document.querySelector(".element-stats"),"");
            }
        }

    }

    if(elementType !== "fauna"){
        getReceipInfoById(`receip/${elementType}/${elementId}`)
            .then((data) => {
                if(!data.message) {
                    computeSimpleElement("hr", "separator", "", "", view.responseContainer,"");

                    if(elementType !== "fauna"){
                        data[elementType].forEach((receip,index) => {
                            if(index !== 0 ){
                                computeElementReceip(receip, elementType,index+1,"alternative")
                            }else {
                                computeElementReceip(receip, elementType,index+1,"")
                            }

                            if(index + 1 !== data[elementType].length){
                                computeSimpleElement("hr", "separator", "", "", view.responseContainer,"");
                            }

                        })
                    }

                }

            });
    }

}

/**
 * Création de la recette de l'élément
 * @param receip
 * @param receipType
 * @param idReceip
 * @param alternativeReceip
 */
function computeElementReceip(receip, receipType,idReceip,alternativeReceip) {
    computeSimpleElement("div", "receip-container", "", "", view.responseContainer,"receipContainer"+idReceip);
    computeSimpleElement("div", "receip-name-and-favorite", "", "", document.querySelector("#receipContainer"+idReceip),"receipNameAndFavorite"+idReceip);
    computeSimpleElement("p", "", "<i class=\"fa-solid fa-receipt\"></i> Recette " + alternativeReceip + " : " + receip.recette, "", document.querySelector("#receipNameAndFavorite"+idReceip),"");
    if(alternativeReceip !== "") {
        computeSimpleElement("i", "fa-solid fa-thumbtack", "", "",document.querySelector("#receipNameAndFavorite"+idReceip), "favoriteBtn");
    }
    computeSimpleElement("div", "process-receip", "", "",document.querySelector("#receipContainer"+idReceip),"processReceip" + idReceip);


    if(receip.ingredient_1_id){
        computeSimpleElement("div", "ingredients-group", "", "",document.querySelector("#processReceip" + idReceip),"ingredientsGroup"+idReceip);
        if(receipType !== "item") {
            document.querySelector(".ingredients-group").style.width = "50dvw";

        }
        getAllItemForReceip(receip,idReceip).then()
    }

    if(receipType === "item") {
        computeSimpleElement("div", "receip-building", "", "",document.querySelector("#processReceip" + idReceip),"buildingReceip"+idReceip);
        computeSimpleElement("p", "", receip.batiment, "", document.querySelector("#buildingReceip"+idReceip),"");

        getIdElementByName("building/getBuildingIdByName/" + receip.batiment)
            .then((data) => {
                getElementInfoById("building/getBuildingInfoById/" + data.building[0].id_building)
                    .then((data) => {
                        computeSimpleElement("img", "", "", "data:image/gif;base64," + data.imgBase64, document.querySelector("#buildingReceip"+idReceip),"");
                        computeSimpleElement("p", "", "Production : " + receip.temps + " sec", "", document.querySelector("#buildingReceip"+idReceip),"");
                        computeSimpleElement("div", "product-and-prerequis", "","",document.querySelector("#processReceip" + idReceip), "productAndPrerequis"+idReceip);
                        computeSimpleElement("div", "receip-product", "", "",document.querySelector("#productAndPrerequis"+idReceip),"productReceip"+idReceip);
                        computeSimpleElement("p", "", "Produit → " + receip.produit_1_nombre + " " + receip.produit_1, "",document.querySelector("#productReceip"+idReceip),"");

                        if(receip.produit_2){
                            computeSimpleElement("p", "", "Produit → " + receip.produit_2_nombre + " " + receip.produit_2, "",document.querySelector("#productReceip"+idReceip),"");
                        }

                        if(receip["prerequis_1"]){
                            computeSimpleElement("hr", "seperator","","",document.querySelector("#productAndPrerequis"+idReceip),"")
                            computeSimpleElement("div", "receip-prerequis", "", "",document.querySelector("#productAndPrerequis"+idReceip),"prerequisReceip"+idReceip);

                            for (let i = 1; i <= 3; i++) {
                                const prerequis = receip[`prerequis_${i}`];

                                if (prerequis) {
                                    computeSimpleElement("p", "", `Prérequis ${i} : ${prerequis}`, "",document.querySelector("#prerequisReceip"+idReceip),"");
                                }
                            }
                        }


                    })
            });
    }





}






