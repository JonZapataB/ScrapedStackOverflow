import googleSearchController from "../../controllers/googleSearchController.js";

describe("GoogleSearchController", () => {
    it("Deberia conseguir los links de una busqueda de google" , async () => {
        const query = "stackoverflow";
        const links = await googleSearchController.searchLinks(query);
        expect(links).toContain("https://stackoverflow.com/");
    });
});