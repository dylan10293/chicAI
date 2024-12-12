import express from "express";
import { getDb } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * Helper function to formulate outfits based on wardrobe items
 */
const formulateSuggestions = (wardrobeItems, weather, calendarEvent) => {
  const suggestions = [];
  const groupedByType = wardrobeItems.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // Generate up to 3 outfits
  for (let i = 0; i < 1; i++) {
    const top = groupedByType.top[i];
    const bottom = groupedByType.bottom[i];
    // const footwear = groupedByType.footwear[i];
    suggestions.push({
      description: `Outfit for ${calendarEvent} (${weather})`,
      items: [
        { ...top, wardrobeItemId: top._id.toString() },
        { ...bottom, wardrobeItemId: bottom._id.toString() },
        // { ...footwear, wardrobeItemId: footwear._id.toString() },
      ],
      tags: [...top.tags, ...bottom.tags, 
        // ...footwear.tags
      ],
    });
  }

  return suggestions;
};

// Fetch events for a specific user
router.get("/events/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = getDb();
    const events = await db.collection("events").find({ userId }).toArray();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
});


// Generate suggestions for a user
router.post("/generate", async (req, res) => {
  const { userId } = req.body;

  const weather = "sunny"; // Hardcoded variable for weather
  
  try {
    const db = getDb();

    // Fetch wardrobe items with laundryStatus: false and tag: 'sunny'
    const wardrobeItems = await db.collection("wardrobe")
      .find({
        laundryStatus: false,
        tags: "sunny", // Check for tag 'sunny' in wardrobe items
      })
      .toArray();

    // Separate wardrobe items by type
    const tops = wardrobeItems.filter((item) => item.type === "top");
    const bottoms = wardrobeItems.filter((item) => item.type === "bottom");

    // Ensure we have at least one top and one bottom
    if (tops.length === 0 || bottoms.length === 0) {
      return res.status(400).json({ message: "Not enough wardrobe items to create an outfit." });
    }

    // Pick one top and one bottom to create an outfit
    const top = tops[0];
    const bottom = bottoms[0];

    const suggestion = {
      description: `Outfit for casual outing (${weather})`,
      items: [
        { wardrobeItemId: top._id },
        { wardrobeItemId: bottom._id },
      ],
      tags: [...top.tags, ...bottom.tags],
      userId,
    };

    // Store the suggestion in the database
    await db.collection("suggestions").insertOne(suggestion);

    res.status(201).json({ message: "Suggestion generated successfully!" });
  } catch (error) {
    console.error("Error generating suggestion:", error);
    res.status(500).json({ message: "Failed to generate suggestion." });
  }
});





// Fetch suggestions for a specific user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const db = getDb();

    // Fetch suggestions linked to the user
    const suggestions = await db.collection("suggestions").find({ userId }).toArray();

    if (suggestions.length === 0) {
      return res.status(200).json([]); // No suggestions for the user
    }

    // Extract unique wardrobe item IDs
    const wardrobeIds = suggestions
      .flatMap((s) => s.items.map((i) => i.wardrobeItemId))
      .filter((id, index, self) => self.indexOf(id) === index);

    // Fetch wardrobe items from the wardrobe collection
    const wardrobeItems = await db
      .collection("wardrobe")
      .find({ _id: { $in: wardrobeIds.map((id) => {
        console.log('id: ', id);
        // if(id === "7890abcde1234567890def456")
        //   return false;
        return new ObjectId(id)
      }) } })
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
    const newOutfit = req.body;

    const result = await db.collection("outfits").insertOne(newOutfit);
    res.status(201).json({ message: "Outfit saved successfully!", id: result.insertedId });
  } catch (error) {
    console.error("Error saving outfit:", error);
    res.status(500).json({ message: "Failed to save outfit." });
  }
});

// Delete all suggestions for a user
router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = getDb();
    const result = await db.collection("suggestions").deleteMany({ userId });
    res.status(200).json({ message: "Suggestions deleted successfully!", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting suggestions:", error);
    res.status(500).json({ message: "Failed to delete suggestions." });
  }
});




export default router;
