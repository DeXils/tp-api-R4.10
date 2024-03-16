/**
 * Classe Satisfactory.
 * (Modèle représentant la recherche effectué)
 */
class Satisfactory {
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

    setFavorite(element, elementId, elementType) {
        this._favoriteLists.push({element: element, elementId: elementId, elementType: elementType});
    }

}
