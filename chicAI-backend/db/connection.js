import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

(async () => {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    db = client.db("chicAI");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
})();

export const getDb = () => db;
