import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import OutfitCard from "./OutfitCard";

const OutfitManagement = ({ userId }) => {
  const [suggestedOutfits, setSuggestedOutfits] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedOutfits, setSavedOutfits] = useState([]);

  // Fetch suggestions for the user
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/suggestions/${userId}`);
        setSuggestedOutfits(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [userId]);

  // Fetch saved outfits for the user
  useEffect(() => {
    const fetchSavedOutfits = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/suggestions/saved");
        setSavedOutfits(response.data);
      } catch (error) {
        console.error("Error fetching saved outfits:", error);
      }
    };

    fetchSavedOutfits();
  }, []);

  // Generate suggestions for the user
  const generateSuggestions = async () => {
    try {
      await axios.post("http://localhost:8000/api/suggestions/generate", {
        userId,
        weather: "sunny",
        calendarEvent: "office meeting",
        laundryStatus: [], // Example: Pass wardrobe item IDs in laundry
      });
      alert("Suggestions generated successfully!");
  
      // Re-fetch suggestions after generation
      const response = await axios.get(`http://localhost:8000/api/suggestions/${userId}`);
      setSuggestedOutfits(response.data);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    }
  };
  

  const saveOutfit = async () => {
    try {
      const outfitToSave = suggestedOutfits[currentIndex];
      if (!savedOutfits.some((outfit) => outfit._id === outfitToSave._id)) {
        const response = await axios.post("http://localhost:8000/api/suggestions/save", outfitToSave);
        setSavedOutfits([...savedOutfits, { ...outfitToSave, _id: response.data.id }]);
      } else {
        alert("This outfit is already saved!");
      }
    } catch (error) {
      console.error("Error saving outfit:", error);
    }
  };

  const nextOutfit = () => {
    if (currentIndex < suggestedOutfits.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousOutfit = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Swipe Section */}
        <Col md={4}>
          <h2>Swipe Section</h2>
          <Button onClick={generateSuggestions} className="mb-3">
            Generate Suggestions
          </Button>
          {suggestedOutfits.length > 0 ? (
            <>
              <OutfitCard outfit={suggestedOutfits[currentIndex]} />
              <div className="d-flex justify-content-between mt-3">
                <Button onClick={previousOutfit} disabled={currentIndex === 0}>
                  Previous
                </Button>
                <Button onClick={saveOutfit}>Save</Button>
                <Button
                  onClick={nextOutfit}
                  disabled={currentIndex === suggestedOutfits.length - 1}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <p>No suggestions available</p>
          )}
        </Col>

        {/* Saved Outfits Section */}
        <Col md={8}>
          <h2>Saved Outfits</h2>
          {savedOutfits.length > 0 ? (
            savedOutfits.map((outfit, index) => (
              <OutfitCard key={index} outfit={outfit} />
            ))
          ) : (
            <p>No outfits saved yet</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OutfitManagement;
