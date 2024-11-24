import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const OutfitManagement = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <h2>Swipe Section</h2>
        </Col>
        <Col md={8}>
          <h2>Saved Outfits</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default OutfitManagement;

