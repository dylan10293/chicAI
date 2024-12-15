import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card, Modal } from "react-bootstrap"; // Added Modal here
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
  const [showModal, setShowModal] = useState(false);

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
      {/* SuggestionGenerator Integration */}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Suggestions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SuggestionGenerator />
        </Modal.Body>
      </Modal>

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
          <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
            <h2 className="section-title">Wardrobe Items</h2>
            <Button variant="primary" onClick={() => setShowModal(true)} className="generate-suggestions-button">
              Generate Suggestions
            </Button>
          </div>

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

          <div className="wardrobe-items-scrollable">
            <Row>
              {wardrobeItems.map((item) => (
                <Col key={item._id} md={6} className="p-1">
                  <Card
                    className={`wardrobe-card ${selectedItems.includes(item._id) ? "selected-card" : ""
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
          </div>
          <Button className="create-outfit-button" onClick={createOutfit}>
            Create Outfit
          </Button>
        </Col>

        {/* Outfits Section */}
        <Col md={6} className="outfits-section">
          <h2 className="section-title pt-2 pb-2">Created Outfits</h2>

          <div className="outfits-items-scrollable">
            <Row>
              {outfits.map((outfit) => (
                <Col key={outfit._id} md={6} className="p-1">
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
          </div>
        </Col>
      </Row>
    </Container>
  );

};

export default OutfitCreator;
