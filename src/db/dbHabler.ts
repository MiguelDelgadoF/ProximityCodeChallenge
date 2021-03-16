const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
    const uri = await mongod.getConnectionString();
    console.log(uri);
    
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

   return await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}