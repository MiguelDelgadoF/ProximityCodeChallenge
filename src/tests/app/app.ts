import chaiHttp = require('chai-http');
import { expect } from 'chai';
import app from '../../app';
const fs = require("fs");
import * as chai from 'chai';
chai.use(chaiHttp);
chai.should();

describe("App super test", () => {

    it("Upload the CSV", async () => {
        const res = await chai.request(app).post('/api/csv/upload').set('content-type', 'multipart/form-data')
        .field('provider', 'Golabs')
        .attach('file', fs.readFileSync(`${__dirname}/cars.csv`), 'tests/cars.csv');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Uploaded the file successfully: cars.csv');
    });

    it("Upload the CSV with a provider missing from the config file", async () => {
        const res = await chai.request(app).post('/api/csv/upload').set('content-type', 'multipart/form-data')
            .field('provider', 'BMW')
            .attach('file', fs.readFileSync(`${__dirname}/cars.csv`), 'tests/cars.csv');
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Proveedor no encontrado en el archivo de config');
    });


});