import express, { query } from 'express';
import stackOverflowController from './controllers/stackOverflowController.js';

const app = express();

app.get('/', async (req, res) => {
    const query = req.query.q;
    const {title, post, answer} = await stackOverflowController.getContent(query);
    res.send(`
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=5e2d45054eda">
        <h1>${title}</h1>
        <h2>${post.fecha}</h2>
        <h2>${post.puntuacion}</h2>
        <div>${post.post}</div>
        <br>
        <h2>${answer[0].fecha}</h2>
        <h2>${answer[0].puntuacion}</h2>
        <div>${answer[0].answer}</div>
        <br>
        <h2>${answer[1].fecha}</h2>
        <h2>${answer[1].puntuacion}</h2>
        <div>${answer[1].answer}</div>

        
    `);
});

app.listen(3999, () => {
    console.log('Server started on port 3999');
}); 