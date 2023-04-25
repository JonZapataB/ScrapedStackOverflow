import express, { Router, query } from 'express';
import stackOverflowController from './controllers/stackOverflowController.js';
import path from 'path';

const app = express();

/**
 * consigue informacion de index.html
 * @route GET /
 */
app.get ('/', (req, res) => {
    const __dirname = path.resolve();5
    res.sendFile(__dirname + '/index.html');
});

/**
 * @route GET /
 * @desc Get the content of a stackoverflow question
 */
app.get('/search', async (req, res) => {
    try{
    const query = req.query.query;
    const {title, post, answers} = await stackOverflowController.getContent(query);
    const answerHTML = answers.map((answer) => {
        return `
            <h2>${answer.fecha}</h2>
            <h2>${answer.puntuacion}</h2>
            <div>${answer.answer}</div>
        `;
    }).join('');

    res.send(`
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=5e2d45054eda">
        <h1>Buscador stackoverflow</h1>
        <h1>${title}</h1>
        <h2>${post.fecha}</h2>
        <h2>${post.puntuacion}</h2>
        <div>${post.post}</div>
        <br>
        ${answerHTML}   
    `); 

    //Mostrar modo JSON
    /*  app.get ('/search', (req, res) => {
    const query = req.query.query;
    const {title, post, answers} = stackOverflowController.getContent(query);
    res.json({title, post, answers} );
}); */

app.listen(3000, () => {
    console.log('Server started on port 3000');
});  

    } catch (error) {
        //throw  new error(error);
    res.send('error index.js');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});  

