import express from "express";
import cors from "cors";
import { getDb } from "./db/connection.js";
import dotenv from "dotenv";
import suggestionsRouter from "./routes/suggestions.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/suggestions", suggestionsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});