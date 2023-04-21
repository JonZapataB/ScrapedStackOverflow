import Parser from "../utils/parser.js";
import Scraper from "../utils/scraper.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";

/**
 *  Obtiene el contenido de la pagina
 * @param {string} query - query de la pagina
 * @returns {object} - objeto con los datos de la pagina
 */
async function getContent(query){
    const googleLinks = await googleSearchController.searchLinks(`stackoverflow+ ${query}`);
    const url = googleLinks.find((link)=> link.includes("stackoverflow.com/questions"))
    
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);
    if(!query){
        query = "undefined";
    }

    const title = parser.getTitle();
    const post = parser.getPost();
    const answers = parser.getAnswers();
    const question = new Question({
        query,
        title,
        content: post.post,
        date: post.fecha,
        votes: post.puntuacion,
    });
    await question.save();
    answers.forEach(async (answer)=>{
        const answerModel = new Answer({
            content: answer.answer,
            date: answer.fecha ,
            votes: answer.puntuacion,
            question: question._id,
        });
        await answerModel.save();
    });

    scraper.close();
    return{
        post,
        title,
        answers
    }
    
}

export default{
    getContent,
};