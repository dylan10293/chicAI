import { Link } from 'react-router-dom';
import './MainContent.css';
import { Container, Stack, Card } from 'react-bootstrap';


function MainContent() {
  return (
    <Container className="wardrobe-management-content" fluid>
    <Stack gap={3} className='wardrobe-management-content-stack'>
      <div className="p-2">Sweaters
      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>
      <Link to="/details" state={{ item: 'Red Sweater', img: '/dummy-sweater.png' }}>
      <Card.Img variant="top" src='/dummy-sweater.png' />
      <Card.Body>
        <Card.Text>Red Sweater</Card.Text>
      </Card.Body>
      </Link>
        </Card>
      </div>

      <div className="p-2">Jackets
      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>
      <Link to="/details" state={{ item: 'Yellow Jacket', img: '/dummy-jacket.png' }}>
      <Card.Img variant="top" src='/dummy-jacket.png' />
      <Card.Body>
        <Card.Text>Yellow Jacket</Card.Text>
      </Card.Body>
      </Link>
        </Card>
        </div>

      <div className="p-2">Tshirts
      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>
      <Link to="/details" state={{ item: 'Green Tshirt', img: '/dummy-shirt.png' }}>
      <Card.Img variant="top" src='/dummy-shirt.png' />
      <Card.Body>
        <Card.Text>Green Shirt</Card.Text>
      </Card.Body>
      </Link>
        </Card>
        </div>

    </Stack>
    </Container>
  );
}

export default MainContent;