//Display wardrobe items on the left.
//Pick wardrobe items: check 
//create outift from any wardrobe item. 

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";

const OutfitCreator = ({ userId }) => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");

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
      const response = await axios.post("http://localhost:8000/api/outfits/create", {
        name: outfitName,
        items: selectedItems,
        userId,
      });

      alert("Outfit created successfully!");
      setOutfitName("");
      setSelectedItems([]);
    } catch (error) {
      console.error("Error creating outfit:", error);
      alert("Failed to create outfit.");
    }
  };

  return (
    <Container>
      <h2>Create an Outfit</h2>
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
          <Col key={item._id} md={4}>
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
    </Container>
  );
};

export default OutfitCreator;
