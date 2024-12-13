import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import SuggestionGenerator from "./SuggestionGenerator";
import './OutfitCreator.css';


const OutfitCreator = ({ userId }) => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [outfits, setOutfits] = useState([]);
  const [userName, setUserName] = useState("");

  // Fetch wardrobe items
  useEffect(() => {
    const fetchWardrobeItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/outfits/wardrobe");
        setWardrobeItems(response.data);
      } catch (error) {
        console.error("Error fetching wardrobe items:", error);
      }
    };

    fetchWardrobeItems();
  }, []);

  const fetchOutfits = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/outfits");
      setOutfits(response.data);
    } catch (error) {
      console.error("Error fetching outfits:", error);
    }
  };

  // Fetch outfits on load
  useEffect(() => {
    fetchOutfits();
  }, []);


   // Set a hardcoded username for now
   useEffect(() => {
    const tempUserName = "John"; // Replace with API call later
    setUserName(tempUserName);

    // Uncomment code when integrated with the user API
    /*
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
    */
  }, [userId]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const createOutfit = async () => {
    if (!outfitName || selectedItems.length === 0) {
      alert("Please provide an outfit name and select at least one item.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/outfits/create", {
        name: outfitName,
        items: selectedItems,
        userId,
      });

      alert("Outfit created successfully!");
      setOutfitName("");
      setSelectedItems([]);
      fetchOutfits();
    } catch (error) {
      console.error("Error creating outfit:", error);
      alert("Failed to create outfit.");
    }
  };

  const deleteOutfit = async (outfitId) => {
    try {
      await axios.delete(`http://localhost:8000/api/outfits/${outfitId}`);
      alert("Outfit deleted successfully!");
      fetchOutfits(); // Refresh the outfits list
    } catch (error) {
      console.error("Error deleting outfit:", error);
      alert("Failed to delete outfit.");
    }
  };

  

  return (
    <Container fluid className="outfit-creator-container">
      <Row>
      <Row className="header">
        <Col>
          <h1>Outfit Creator</h1>
        </Col>
        <Col className="text-end">
          User: {userName}!
        </Col>
      </Row>
        {/* Wardrobe Items Section */}
        <Col md={6} className="wardrobe-section">
          <h2 className="section-title">Wardrobe Items</h2>
          <Form>
            <Form.Group>
              <Form.Label>Outfit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter outfit name"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="outfit-name-input"
              />
            </Form.Group>
          </Form>
          <Row>
            {wardrobeItems.map((item) => (
              <Col key={item._id} md={6}>
                <Card
                  className={`wardrobe-card ${
                    selectedItems.includes(item._id) ? "selected-card" : ""
                  }`}
                  onClick={() => toggleItemSelection(item._id)}
                >
                  <Card.Body>
                    <Card.Title className="card-title">{item.name}</Card.Title>
                    <Card.Text className="card-text">Type: {item.type}</Card.Text>
                    <Card.Text className="card-text">Tags: {item.tags.join(", ")}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Button className="create-outfit-button" onClick={createOutfit}>
            Create Outfit
          </Button>
        </Col>
  
        {/* Outfits Section */}
        <Col md={6} className="outfits-section">
          <h2 className="section-title">Created Outfits</h2>
          <Row>
            {outfits.map((outfit) => (
              <Col key={outfit._id} md={6}>
                <Card className="outfit-card">
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteOutfit(outfit._id)}
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{outfit.name}</Card.Title>
                    <Card.Text className="card-text">
                      <strong>Items:</strong>{" "}
                      {outfit.items.map((item, index) => (
                        <span key={index}>
                          {item.name} ({item.type})
                          {index < outfit.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </Card.Text>
                    <Card.Text className="card-text">
                      <strong>Tags:</strong>{" "}
                      {outfit.items.flatMap((item) => item.tags).join(", ")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
  
};

export default OutfitCreator;
