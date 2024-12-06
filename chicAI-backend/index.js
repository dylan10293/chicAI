import express from "express";
import cors from "cors";
import db from "./db/connection.js";

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});