import Parser from '../../utils/parser.js';
import fs from 'fs';

describe('Parser', () => {
    let parser;
    beforeAll(() => {
        const html = fs.readFileSync('./test/test.html', 'utf8');
        parser = new Parser(html);
    });

    it('Deberia conseguir el titulo de la pagina', () => {
        const title = parser.getTitle();
        expect(title).toBe('How do I create a GUID / UUID?');
    });

    it('Deberia conseguir los parrafos de la pregunta', () => {
        const post = parser.getPostAsDOM();
        const paragraphs = parser.getParagraphs(post);
        expect(paragraphs).toContain('How do I create GUIDs (globally-unique identifiers) in JavaScript? The GUID / UUID should be at least 32 characters and should stay in the ASCII range to avoid trouble when passing them around.');
    });

    it('Deberia conseguir la puntuacion de las respuestas', () => {
        const post = parser.getPostAsDOM();
        const puntuacion = parser.getPuntuacion(post);
        expect(puntuacion).toContain('5201');
    });

    it('Deberia conseguir la fecha de las respuestas', () => {
        const post = parser.getPostAsDOM();
        const fecha = parser.getDate(post);
        expect(fecha).toContain('Jul 24, 2022 at 23:56');
    });

    it('Deberia devolver una pregunta en formato DOM', () => {
        const post = parser.getPostAsDOM();
        const votes = parser.getPuntuacion(post);
        expect(votes).toContain('5201');
    });

    it('Deberia devolver el post', () => {
        const post = parser.getPost();
        expect(post.puntuacion).toContain('5201');
        expect(post.fecha).toContain('Jul 24, 2022 at 23:56');
        expect(post.question).toContain('How do I create GUIDs (globally-unique identifiers) in JavaScript? The GUID / UUID should be at least 32 characters and should stay in the ASCII range to avoid trouble when passing them around.');
        
    });

    it('Deberia devolver una respuesta en formato DOM', () => {
        const post = parser.getAnswerAsDOM();
        const votes = parser.getPuntuacion(post);
        expect(votes).toContain('5380');
    });
        
    it('Deberia devolver el answer', () => {
        const answer = parser.getAnswer();
        expect(answer.puntuacion).toContain('5380');
        expect(answer.fecha).toContain('Mar 5 at 14:48');
        expect(answer.results).toContain('Failing the above, there is this method (based on the original answer to this question):');
    });
});