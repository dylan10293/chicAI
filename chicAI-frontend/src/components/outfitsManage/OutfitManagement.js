import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import OutfitCard from "./OutfitCard";

const OutfitManagement = ({ suggestedOutfits = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedOutfits, setSavedOutfits] = useState([]);

  const saveOutfit = () => {
    const outfitToSave = suggestedOutfits[currentIndex];
    setSavedOutfits([...savedOutfits, outfitToSave]);
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
              //card created here
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
