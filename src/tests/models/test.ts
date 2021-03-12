import { expect } from 'chai';
import { Cars } from "../../models/Cars";
import { connect, clearDatabase } from "../../db/dbHabler";

afterEach(async () => {
    await clearDatabase();
});

beforeEach(async () => {
    await connect();
});

describe('Create a record in users', async () => {
    let body = {
        UUID: 121,
        VIN: 'ABC123',
        Make: 'BWM',
        Model: '323i',
        Mileage: '1000',
        Year: '2020',
        Price: 40000,
        "Zip Code": 20201,
    }
    let car = await Cars.create(body);
    expect(car["VIN"]).to.equal('ABC123');
});

describe('Find a record in users', async () => {
    let body = {
        UUID: 121,
        VIN: 'ABC123',
        Make: 'BWM',
        Model: '323i',
        Mileage: '1000',
        Year: '2020',
        Price: 40000,
        "Zip Code": 20201,
    }
    let car = await Cars.create(body);
    let document = await Cars.find(car.id);
    expect(document["Make"]).to.equal('BMW');
});

describe('Delete a record in users', async () => {
    let body = {
        UUID: 121,
        VIN: 'ABC123',
        Make: 'BWM',
        Model: '323i',
        Mileage: '1000',
        Year: '2020',
        Price: 40000,
        "Zip Code": 20201,
    }
    let car = await Cars.create(body);
    let document = await car.delete();
    console.log(document);
     
});

describe('Update a record in users', async () => {
    let body = {
        UUID: 121,
        VIN: 'ABC123',
        Make: 'BWM',
        Model: '323i',
        Mileage: '1000',
        Year: '2020',
        Price: 40000,
        "Zip Code": 20201,
    }
    let car = await Cars.create(body);
    let document = await Cars.findByIdAndUpdate(car.id, { Model: 2021 }, {new: true});
    expect(document["Model"]).to.equal(2021);
});