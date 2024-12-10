import express from "express";
import { getDb } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * Helper function to formulate outfits based on wardrobe items
 */
const formulateSuggestions = (wardrobeItems, weather, calendarEvent) => {
  // Example logic to generate outfits
  const suggestions = [];
  const groupedByType = wardrobeItems.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // Generate up to 3 outfits
  for (let i = 0; i < Math.min(3, groupedByType.top.length, groupedByType.bottom.length); i++) {
    const top = groupedByType.top[i];
    const bottom = groupedByType.bottom[i];
    suggestions.push({
      description: `Outfit for ${calendarEvent} (${weather})`,
      items: [
        { wardrobeItemId: top._id.toString() },
        { wardrobeItemId: bottom._id.toString() },
      ],
      tags: [...top.tags, ...bottom.tags],
      userId: null, // To be set when storing
    });
  }

  return suggestions;
};

// Generate suggestions for a user
router.post("/generate", async (req, res) => {
  const { userId, weather, calendarEvent, laundryStatus } = req.body; // Inputs
  try {
    const db = getDb();

    // Fetch wardrobe items (filter by laundryStatus if necessary)
    const wardrobeItems = await db
      .collection("wardrobe")
      .find({
        _id: { $nin: laundryStatus.map((id) => new ObjectId(id)) }, // Filter out items in laundry
      })
      .toArray();

    // Generate 3 outfits
    const suggestions = formulateSuggestions(wardrobeItems, weather, calendarEvent);

    // Save suggestions to the database
    const suggestionsWithUserId = suggestions.map((s) => ({ ...s, userId }));
    await db.collection("suggestions").insertMany(suggestionsWithUserId);

    res.status(201).json({ message: "Suggestions generated successfully!" });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    res.status(500).json({ message: "Failed to generate suggestions." });
  }
});

// Fetch suggestions for a specific user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const db = getDb();

    // Fetch suggestions linked to the user
    const suggestions = await db
      .collection("suggestions")
      .find({ userId })
      .toArray();

    if (suggestions.length === 0) {
      return res.status(200).json([]); // No suggestions for the user
    }

    // Extract unique wardrobe item IDs
    const wardrobeIds = suggestions
      .flatMap((s) => s.items.map((i) => i.wardrobeItemId))
      .filter((id, index, self) => self.indexOf(id) === index); // Unique IDs

    // Convert wardrobeItemId strings to ObjectIds
    const validWardrobeIds = wardrobeIds.map((id) => new ObjectId(id));

    // Fetch wardrobe items from the wardrobe collection
    const wardrobeItems = await db
      .collection("wardrobe")
      .find({ _id: { $in: validWardrobeIds } })
      .toArray();

    // Map wardrobe items to suggestions
    const populatedSuggestions = suggestions.map((suggestion) => ({
      ...suggestion,
      items: suggestion.items.map((item) => ({
        ...item,
        name: wardrobeItems.find((w) => w._id.toString() === item.wardrobeItemId)?.name,
        type: wardrobeItems.find((w) => w._id.toString() === item.wardrobeItemId)?.type,
      })),
    }));

    res.status(200).json(populatedSuggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ message: "Failed to fetch suggestions." });
  }
});

// Save an outfit to the "outfits" collection
router.post("/save", async (req, res) => {
  try {
    const db = getDb();
    const newOutfit = req.body; // Outfit data from the client

    // Save outfit with user reference
    const result = await db.collection("outfits").insertOne(newOutfit);
    res.status(201).json({ message: "Outfit saved successfully!", id: result.insertedId });
  } catch (error) {
    console.error("Error saving outfit:", error);
    res.status(500).json({ message: "Failed to save outfit." });
  }
});

export default router;
