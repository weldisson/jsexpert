const { error } = require('./src/enums');
const File = require('./src/File');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Erick Wendel",
                "id": 123,
                "profession": "Javascript Instructor",
                "birthday": 1995
            },
            {
                "name": "Xuxa da Silva",
                "id": 321,
                "profession": "Javascript Specialist",
                "birthday": 1940
            },
            {
                "name": "Joaozinho",
                "id": 231,
                "profession": "Java Developer",
                "birthday": 1990
            }
        ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));

    }
})()
