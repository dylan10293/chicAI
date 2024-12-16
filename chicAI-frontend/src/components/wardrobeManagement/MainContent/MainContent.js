import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';
import { Container, Stack, Card } from 'react-bootstrap';


function MainContent() {
  const [wardrobeItems, setWardrobeItems] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/outfits/wardrobe') // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        setWardrobeItems(data); // Store the fetched wardrobe items in state
      })
      .catch((error) => console.error('Error fetching wardrobe items:', error));
  }, []);


  return (
    <Container className="wardrobe-management-content" fluid>
    <Stack gap={3} className='wardrobe-management-content-stack'>
    {wardrobeItems.map((item) => (

      <div key={item._id} className="p-2">
      {/* Group by type */}
      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}

      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>

      <Link 
      to="/details" 
      state={{ item: item.name, 
      img: '/dummy-sweater.png',
      tags: item.tags || [], 
      style: item.style,
      color: item.color,
      pattern: item.pattern,
      }}
      >

      <Card.Img variant="top" src='/dummy-sweater.png' />
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

export default MainContent;