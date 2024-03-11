/**
 * Classe Satisfactory.
 * (Modèle représentant la recherche effectué)
 */
class Satisfactory {
    /**
     * Expression actuelle de la recherche.
     * @type {string}
     */
    _search;

    /**
     * Liste des favoris
     * @type {Array}
     */
    _favoriteLists;

    /**
     * Constructeur de la classe Satisfactory.
     */
    constructor() {
        this._search = "";
        this._favoriteLists = [];
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


}
