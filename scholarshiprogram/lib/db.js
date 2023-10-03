import { MongoClient } from "mongodb";

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
    }

    return client.db();
}

export { connectToDatabase };