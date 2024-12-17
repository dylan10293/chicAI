import express from "express";
import db from "../db/connection.js"; // Your database connection
import { ObjectId } from "mongodb";

const router = express.Router();

// Route to fetch wardrobe items with laundryStatus as true
router.get("/", async (req, res) => {
  try {
    const laundryItems = await db
      .collection("wardrobe")
      .find({ laundryStatus: true })
      .toArray();

    res.status(200).json(laundryItems);
  } catch (error) {
    console.error("Error fetching laundry items:", error);
    res.status(500).json({ message: "Failed to fetch laundry items." });
  }
});

// Route to update laundryStatus to false
router.put("/:id/toggle-laundry", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection("wardrobe").updateOne(
      { _id: new ObjectId(id) },
      { $set: { laundryStatus: false } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Laundry status updated successfully." });
    } else {
      res.status(404).json({ message: "Item not found or no update made." });
    }
  } catch (error) {
    console.error("Error updating laundry status:", error);
    res.status(500).json({ message: "Failed to update laundry status." });
  }
});

export default router;
