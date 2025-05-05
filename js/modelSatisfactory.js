/**
 * Classe Satisfactory.
 * (Modèle représentant la recherche effectué)
 */
class Satisfactory {

    /**
     * Token d'intentification
     * @type {String}
     */
    _token;

    /**
     * Expression actuelle de la recherche.
     * @type {String}
     */
    _search;

    /**
     * Liste des favoris
     * @type {Array}
     */
    _favoriteLists;

    /**
     * L'élément de la recherche
     * @type {Element}
     */
    _currentElement;

    /**
     * l'id de l'élément de la recherhce
     * @type {Integer}
     */
    _currentElementId;

    /**
     * Le type de l'élément
     * @type {String}
     */
    _currentElementType;


    /**
     * Constructeur de la classe Satisfactory.
     */
    constructor() {
        this._search = "";
        this._favoriteLists = [];
        this._currentElement = {};
        this._currentElementType = "";
        this._currentElementId = 0;
        this._token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsb2dpbiI6IkRlWGlscyIsImV4cCI6MTc0OTA0ODY0NSwiaWF0IjoxNzQ2NDU2NjQ1fQ.lo14urdgV5SALZdmGxgz_8V9W6LkPU-rZxscb2t04EA";
    }

    /**
     * Retourne le token d'identification
     * @returns {String}
     */
    getToken() {
        return this._token;
    }
    /**
     * Retourne l'expression actuelle de la recherche.
     * @returns {string}
     */
    getSearch() {
        return this._search;
    }

    /**
     * Met à jour l'expression actuelle de la recherche.
     * @param {string} expr : Nouvelle expression
     */
    setSearch(expr) {
        this._search = expr;
    }

    setCurrentElement(element){
        this._currentElement = element;
    }

    getCurrentElement() {
        return this._currentElement;
    }

    setCurrentElementId(id) {
        this._currentElementId = id;
    }

    getCurrentElementId() {
        return this._currentElementId;
    }

    setCurrentElementType(elementType) {
        this._currentElementType = elementType;
    }

    getCurrentElementType() {
        return this._currentElementType;
    }

    setFavoriteList(favoriteList) {
        this._favoriteLists = favoriteList;
    }

    setFavorite(favoriteId, element, elementId, elementType) {
        this._favoriteLists.push({favoriteId:favoriteId,element: element, elementId: elementId, elementType: elementType});
    }

    getFavorites() {
        return this._favoriteLists;
    }

}
