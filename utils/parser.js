import jsdom from 'jsdom';

/**
 * clase que se encarga de parsear el html de una pagina web
 * @class
 */
class Parser {
    /**
     * Constructor de la clase
     * @constructor
     * @param {string} html - html de la pagina web
     */
     constructor(html) {
        /**
         * @property {string} html - html de la pagina web
         * @private
         */
        this.html = html;
        this.loadDocument();
    }

    /**
     * Carga el documento html en el objeto document
     * @method
     * @returns {void}
     * @private
     */
    loadDocument() {
        const JSDOM = jsdom.JSDOM;
        const dom = new JSDOM(this.html);
        this.document = dom.window.document;       
    }   

    /**
     * Devuelve el titulo de la pagina
     * @method
     * @returns {string} - titulo de la pagina
     */
    getTitle() {
        return this.document.querySelector('h1').textContent.trim();
    }
    /**
     * Devuelve los parrafos de la pregunta
     * @method
     * @returns {string[]} - parrafos de la pagina
     */
    getQuestion() {
        const paragraphs = Array.from(this.document.querySelectorAll('div.postcell p'));
        return paragraphs.map(p => p.textContent.trim());
    }

    /**
     * Devuelve los parrafos de la pregunta
     * @method
     * @returns {string[]} - parrafos de la pagina
     */
    getResults() {
        const paragraphs = Array.from(this.document.querySelectorAll('div.answercell p'));
        return paragraphs.map(p => p.textContent.trim());
    }

    getPuntuacion() {
        const puntuacion = Array.from(this.document.querySelectorAll('.js-voting-container .js-vote-count'));
        return puntuacion.map(p => p.textContent.trim());
    }

    getDate() {
        const date = Array.from(this.document.querySelectorAll('.relativetime'));
        return date.map(p => p.textContent.trim());
    }
    
    /**
     * Devuelve los links de la pagina
     * @method
     * @returns {string[]} - links de la pagina
     */
    getLinks() {
        const links = Array.from(this.document.querySelectorAll('a'));
        return links.map(link => link.href);
    }
}

export default Parser;