import express from "express";
import db from "../db/connection.js"; // Your database connection

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usersCollection = db.collection("users"); // Ensure you reference the correct collection

    const user = await usersCollection.findOne({ id: id });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

export default router;
