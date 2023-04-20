import stackOverflowController from "../../controllers/stackOverflowController.js";

describe("stackOverflowController", () => {
    it("Deberia conseguir el contenido de una pagina de stackoverflow", async () => {
        const query = "how to create a guid";
        const {post,answer} = await stackOverflowController.getContent(query);
        expect(post.puntuacion).toContain("649");
        expect(answer.puntuacion).toContain("519");
        
    },20000);
});