import express, { query } from 'express';
import stackOverflowController from './controllers/stackOverflowController.js';

const app = express();

app.get('/', async (req, res) => {
    const query = req.query.query;
    const {title, post, answer} = await stackOverflowController.getContent(query);
    res.send(`
        <h1>${title}</h1>
        <p>${post}</p>
        <p>${answer}</p>
        
    `);
});

app.listen(3999, () => {
    console.log('Server started on port 3999');
}); 