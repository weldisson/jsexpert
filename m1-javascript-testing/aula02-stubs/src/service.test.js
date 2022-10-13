const Service = require('./service');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';
const mocks = {
    alderaan: require('./../mocks/alderaan.json'),
    tatooine: require('./../mocks/tatooine.json')
};

(async () => {
    // {
    //     // vai para internet
    //     const service  = new Service();
    //     const response = await service.makeRequest(BASE_URL_2);
        
    // }
    {
        // vai para o mock
        const service = new Service();
        const stub = sinon.stub(service, service.makeRequest.name)
        stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);

        const response = await service.getPlanets(BASE_URL_1);

        const expected = {
            'name': 'Tatooine',
            'surfaceWater': '1',
            appearedIn: 5
        };

        deepStrictEqual(response, expected);
    }
    {
        // vai para o mock
        const service = new Service();
        const stub = sinon.stub(service, service.makeRequest.name)
        stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

        const response = await service.getPlanets(BASE_URL_2);
        const expected = {
            'name': 'Alderaan',
            'surfaceWater': '40',
            appearedIn: 2
        };

        deepStrictEqual(response, expected);
    }
}
)()
