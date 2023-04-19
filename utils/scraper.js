import puppeteer from "puppeteer";

class Scraper {
    constructor(){
        this.browser = null;
        this.page = null;
        this.page = null;
    }

    async init() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async getPageContent(url) {
        await this.page.goto(url);
        return await this.page.content();
    }

    async close() {
        await this.browser.close();
    }
}

export default Scraper;