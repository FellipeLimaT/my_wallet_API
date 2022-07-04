import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    mongoClient.connect(() => {
        db = mongoClient.db(process.env.MONGO_DATABASE);
    });
} catch (err) {
    console.log(err);
}

export default db;