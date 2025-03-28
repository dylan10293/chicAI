import { MongoClient } from "mongodb";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  tls: true,
  serverSelectionTimeoutMS: 5000,
});
try {
  await client.connect();
  await client.db("chicAI").command({ ping: 1 });
  console.log(
    "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch (err) {
  console.error(err);
}
let db = client.db("chicAI");
export default db;