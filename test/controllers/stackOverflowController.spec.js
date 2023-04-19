import stackOverflowController from "../../controllers/stackOverflowController";

describe("stackOverflowController", () => {
    it("Deberia conseguir el contenido de una pagina de stackoverflow", async () => {
        const query = "how to create a guid";
        const {title,paragraphs,} = await stackOverflowController.getContent(query);
        expect(title).toContain("All Questions");
        
    });
});