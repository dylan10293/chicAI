import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';
import { Container, Stack, Card, Row, Col } from 'react-bootstrap';

const API_BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

function MainContent({ userId }) {
  const [wardrobeItems, setWardrobeItems] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/outfits/wardrobe?userId=${userId}`) // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        setWardrobeItems(data); // Store the fetched wardrobe items in state
      })
      .catch((error) => console.error('Error fetching wardrobe items:', error));
  }, []);

  // Group wardrobe items by type
  const groupedItems = wardrobeItems.reduce((acc, item) => {
    const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});


  return (
    <Container className="wardrobe-management-content" fluid>
      <Stack gap={3} className="wardrobe-management-content-stack">
        {/* Iterate over grouped items */}
        {Object.keys(groupedItems).map((type) => (
          <div key={type} className="p-2">
            {type} {/* Display item type as header */}
            
            {/* Horizontal Grid for each type */}
            <Row className="wardrobe-items-row" xs={1} sm={2} md={3} lg={4} xl={5} gap={3}>
              {/* Render the items of the current type */}
              {groupedItems[type].map((item) => (
                <Col key={item._id} className="wardrobe-item-col">
                  <Card className="wardrobe-management-card" style={{ width: '15rem' }}>

                  <Link
                to="/details"
                state={{
                  item: item.name,
                  img: `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${item._id}.jpg`,
                  _id: item._id,
                  tags: item.tags || [],
                  style: item.style,
                  color: item.color,
                  pattern: item.pattern,
                }}
              >
                    <Card.Img variant="top" src={`https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${item._id}.jpg` || '/dummy-sweater.png'} />
                    <Card.Body>
                      <Card.Text>{item.name}</Card.Text>
                    </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Stack>
    </Container>
  );
}

export default MainContent;