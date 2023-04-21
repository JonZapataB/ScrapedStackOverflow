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
     * Devuelve los parrafos de la pagina
     * @method
     * @returns {string[]} - parrafos de la pagina
     */
    getParagraphs(element) {
        const paragraphs = Array.from(element.querySelectorAll('p'));
        return paragraphs.map(p => p.textContent.trim());
    }

    /**
     * Devuelve la puntuacion de la pagina
     * @method
     * @returns {string[]} - puntuacion de la pagina 
     */
    getPuntuacion(element) {
        const puntuacion = element.querySelector('.js-vote-count');
        return puntuacion.textContent.trim();
    }

    /**
     * Devuelve la fecha de la pagina
     * @method
     * @returns {string[]} - fecha de la pagina
     */
    getDate(element) {
        const date = element.querySelector('.relativetime');
        return date.textContent.trim();
    }
    /**
     * Devuelve el post completo de la pregunta
     * @method
     * @returns {string[]} - post de la pagina
     */
    getTotalPost(element){
        const totalPost = element.querySelector('.postcell');
        return totalPost.innerHTML.trim();
    }
    /**
     * Devuelve el answer completo de la pagina
     * @method
     * @returns {string[]} - answer de la pagina
     */
    getTotalAnswers(element){
        const totalAnswers = element.querySelector('.answercell');
        return totalAnswers.innerHTML.trim();
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

    /**
     * @method
     * @returns {object} - objeto con los datos de la pagina
     */
    getPostAsDOM() {
        return this.document.querySelector('.question');
    }

    getPost() {
        const post = this.getPostAsDOM();
        const question = this.getParagraphs(post);
        const puntuacion = this.getPuntuacion(post);
        const fecha = this.getDate(post);
        const totalPost = this.getTotalPost(post);
        
        return{
            question,
            puntuacion,
            fecha,
            post:totalPost
        }
    }

    getAnswerAsDOM() {
        return Array.from(this.document.querySelectorAll('.answer'));
    }

    getAnswers() {
        const answer = this.getAnswerAsDOM();
        return answer.map((answer) => {
            const results = this.getParagraphs(answer);
            const puntuacion = this.getPuntuacion(answer);
            const fecha = this.getDate(answer);
            const totalAnswers = this.getTotalAnswers(answer);
        
            return{
                results,
                puntuacion,
                fecha,
                answer:totalAnswers,
            }
        });
    }


    


}

export default Parser;