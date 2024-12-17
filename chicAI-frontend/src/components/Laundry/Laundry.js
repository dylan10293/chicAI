import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../wardrobeManagement/MainContent/MainContent.css";
import { Container, Stack, Card, Button } from "react-bootstrap";

const API_BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

function Laundry({ userId }) {
  const [wardrobeItems, setWardrobeItems] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetchLaundryItems();
  }, []);

  const fetchLaundryItems = () => {
    fetch(`${API_BASE_URL}/api/laundry`) // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        setWardrobeItems(data); // Store the fetched wardrobe items in state
      })
      .catch((error) =>
        console.error("Error fetching wardrobe items:", error)
      );
  };

  const toggleLaundryStatus = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/laundry/${id}/toggle-laundry`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Laundry status updated to:", data.laundryStatus);
        fetchLaundryItems(); // Refresh the list to reflect the updated status
      } else {
        console.error("Failed to update laundry status.");
      }
    } catch (error) {
      console.error("Error updating laundry status:", error);
    }
  };

  return (
    <Container className="wardrobe-management-content" fluid>
      <Stack gap={3} className="wardrobe-management-content-stack">
        {wardrobeItems.map((item) => (
          <div key={item._id} className="p-2">
            {/* Group by type */}
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}

            <Card
              className="wardrobe-management-card position-relative"
              style={{ width: "15rem" }}
            >
              {/* X Button */}
              <Button
                variant="danger"
                className="close-button"
                onClick={() => toggleLaundryStatus(item._id)}
              >
                X
              </Button>

              <Link
                to="/details"
                state={{
                  item: item.name,
                  img: `https://dylan-cloudfront-testbucket.s3.us-east-2.amazonaws.com/${item._id}.jpg`,
                  _id: item._id,
                  tags: item.tags || [],
                  style: item.style,
                  color: item.color,
                  pattern: item.pattern,
                }}
              >
                <Card.Img variant="top" src={`https://dylan-cloudfront-testbucket.s3.us-east-2.amazonaws.com/${item._id}.jpg`} />
                <Card.Body>
                  <Card.Text>{item.name}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </div>
        ))}
      </Stack>
    </Container>
  );
}

export default Laundry;
