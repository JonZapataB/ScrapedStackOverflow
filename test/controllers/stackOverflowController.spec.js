import stackOverflowController from "../../controllers/stackOverflowController.js";

describe("stackOverflowController", () => {
    it("Deberia conseguir el contenido de una pagina de stackoverflow", async () => {
        const query = "how to create a guid";
        const {post,answers} = await stackOverflowController.getContent(query);
        expect(post.puntuacion).toContain("649");
        expect(answers[0].puntuacion).toContain("519");
        
    },20000);
});