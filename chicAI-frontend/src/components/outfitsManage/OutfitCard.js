import React from "react";
import { Card } from "react-bootstrap";

const OutfitCard = ({ outfit }) => {
  return (
    <Card style={{ margin: "10px" }}>
      <Card.Body>
        <Card.Title>{outfit.description}</Card.Title>
        <Card.Text>
          <pre>
            {JSON.stringify(outfit, null, 2)}
          </pre>
          <strong>Items:</strong>{" "}
          {outfit.items.map((item, index) => (
            <span key={index}>
              {item.name} ({item.type}) ({item.wardrobeItemId})
              {index < outfit.items.length - 1 ? ", " : ""}
            </span>
          ))}
        </Card.Text>
        <Card.Text>
          <strong>Tags:</strong> {outfit.tags.join(", ")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OutfitCard;
