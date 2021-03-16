import { expect } from 'chai';
import { Cars } from "../../models/Cars";
import { connect, clearDatabase } from "../../db/dbHabler";

connect().then(() => {
    console.log('conected to database');
});

describe('Model test', async () => {
    it('should create a record', async () => {
        try {
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
            let car = new Cars(body);
            await car.save();
            expect(car["VIN"]).to.equal('ABC123');
        } catch (error) {
            console.log(error);
        }
    });
    
    it('Find a record in cars', async () => {
        try {
            let body = {
                UUID: 122,
                VIN: 'ABC123',
                Make: 'BMW',
                Model: '323i',
                Mileage: '1000',
                Year: '2020',
                Price: 40000,
                "Zip Code": 20201,
            }
            let car = new Cars(body);
            await car.save();
            let document = await Cars.findById(car.id);
            expect(document["Make"]).to.equal('BMW');
        } catch (error) {
            console.log(error);
        }
    });
    
    it('Delete a record in cars', async () => {
        try {
            let body = {
                UUID: 123,
                VIN: 'ABC123',
                Make: 'BWM',
                Model: '323i',
                Mileage: '1000',
                Year: '2020',
                Price: 40000,
                "Zip Code": 20201,
            }
            let car = new Cars(body);
            await car.save();
            let document = await Cars.findByIdAndDelete(car.id);
            expect(document["UUID"]).to.equal(123);
        } catch (error) {
            console.log(error);
        }
         
    });
    
    it('Update a record in cars', async () => {
        try {
            let body = {
                UUID: 124,
                VIN: 'ABC123',
                Make: 'BWM',
                Model: '323i',
                Mileage: '1000',
                Year: '2020',
                Price: 40000,
                "Zip Code": 20201,
            }
            let car = new Cars(body);
            await car.save();
            let document = await Cars.findByIdAndUpdate(car.id, { Model: 2021 }, {new: true});
            expect(document["Model"]).to.equal('2021');
        } catch (error) {
            console.log(error);
        }
    });

});