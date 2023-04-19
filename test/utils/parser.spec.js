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
        const paragraphs = parser.getQuestion();
        expect(paragraphs).toContain('How do I create GUIDs (globally-unique identifiers) in JavaScript? The GUID / UUID should be at least 32 characters and should stay in the ASCII range to avoid trouble when passing them around.');
    });

    it('Deberia conseguir las parrafos de las respuestas', () => {
        const result = parser.getResults();
        expect(result).toContain('Failing the above, there is this method (based on the original answer to this question):');
    });

    it('Deberia conseguir la puntuacion de las respuestas', () => {
        const puntuacion = parser.getPuntuacion();
        expect(puntuacion).toContain('5201');
    });

    it('Deberia conseguir la fecha de las respuestas', () => {
        const fecha = parser.getDate();
        expect(fecha).toContain('Jul 24, 2022 at 23:56');
    });
});