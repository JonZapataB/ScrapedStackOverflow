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
    getParagraphs(element) {
        const paragraphs = Array.from(element.querySelectorAll('p'));
        return paragraphs.map(p => p.textContent.trim());
    }

    getPuntuacion(element) {
        const puntuacion = element.querySelector('.js-vote-count');
        return puntuacion.textContent.trim();
    }

    getDate(element) {
        const date = element.querySelector('.relativetime');
        return date.textContent.trim();
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
    getPostAsDOM() {
        return this.document.querySelector('.question');
    }

    getPost() {
        const post = this.getPostAsDOM();
        const question = this.getParagraphs(post);
        const puntuacion = this.getPuntuacion(post);
        const fecha = this.getDate(post);
        
        return{
            question,
            puntuacion,
            fecha
        }
    }

    getAnswerAsDOM() {
        return this.document.querySelector('.answer ');
    }

    getAnswer() {
        const answer = this.getAnswerAsDOM();
        const results = this.getParagraphs(answer);
        const puntuacion = this.getPuntuacion(answer);
        const fecha = this.getDate(answer);
        
        return{
            results,
            puntuacion,
            fecha,
            answer
        }
    }


    


}

export default Parser;