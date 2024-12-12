import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const OutfitCreator = ({ userId }) => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [outfits, setOutfits] = useState([]);

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
    <Container fluid>
      <Row>
        {/* Wardrobe Items Section */}
        <Col md={6}>
          <h2>Wardrobe Items</h2>
          <Form>
            <Form.Group>
              <Form.Label>Outfit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter outfit name"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Row>
            {wardrobeItems.map((item) => (
              <Col key={item._id} md={6}>
                <Card
                  style={{
                    margin: "10px",
                    border: selectedItems.includes(item._id) ? "2px solid blue" : "1px solid gray",
                  }}
                  onClick={() => toggleItemSelection(item._id)}
                >
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Type: {item.type}</Card.Text>
                    <Card.Text>Tags: {item.tags.join(", ")}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Button className="mt-3" onClick={createOutfit}>
            Create Outfit
          </Button>
        </Col>

        {/* Outfits Section */}
        <Col md={6}>
          <h2>Created Outfits</h2>
          <Row>
            {outfits.map((outfit) => (
              <Col key={outfit._id} md={6}>
                <Card style={{ margin: "10px", position: "relative" }}>
                  <FaTrash
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => deleteOutfit(outfit._id)}
                  />
                  <Card.Body>
                    <Card.Title>{outfit.name}</Card.Title>
                    <Card.Text>
                      <strong>Items:</strong>{" "}
                      {outfit.items.map((item, index) => (
                        <span key={index}>
                          {item.name} ({item.type})
                          {index < outfit.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </Card.Text>
                    <Card.Text>
                      <strong>Tags:</strong> {outfit.items.flatMap((item) => item.tags).join(", ")}
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
