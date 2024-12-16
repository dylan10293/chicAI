import express from "express";
import cors from "cors";
import { getDb } from "./db/connection.js";
import dotenv from "dotenv";
import outfitsRouter from "./routes/outfits.js"; 

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Use the new outfits router
app.use("/api/outfits", outfitsRouter); // Updated route


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});