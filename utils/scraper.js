import puppeteer from "puppeteer";

class Scraper {
    /**
     * @constructor
     * @property {puppeteer.Browser} browser - navegador
     */
    constructor(){
        this.browser = null;
        this.page = null;
        this.page = null;
    }

    /**
     * Inicializa el navegador
     * @method
     * @returns {void}
     */
    async init() {
        this.browser = await puppeteer.launch({
            headless:true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        this.page = await this.browser.newPage();
    }

    /** 
     * Obtiene el contenido de una pagina
     * @method
     * @param {string} url - url de la pagina
    */
    async getPageContent(url) {
        await this.page.goto(url);
        return await this.page.content();
    }

    /**
     * Cierra el navegador
     * @method
     * @returns {void}s
     */
    async close() {
        await this.browser.close();
    }
}

export default Scraper;