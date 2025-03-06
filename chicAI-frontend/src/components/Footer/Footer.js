import { Container, Row, Col, Nav } from 'react-bootstrap';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <Container fluid>
                <Row className="footer-content text-white">
                    <Col className="text-center text-md-left">
                        <h8><i>&copy; Designed & Developed by CtrlAltDefeat</i></h8>
                    </Col>

                    <Col className="text-center">
                        <Nav className="footer-links">
                            <Nav.Link href="/outfits" className="text-white">Meet The Team</Nav.Link>
                            <Nav.Link href="/outfits" className="text-white">Outfits</Nav.Link>
                            <Nav.Link href="/wardrobe-management" className="text-white">Wardrobe</Nav.Link>
                            <Nav.Link href="/laundry" className="text-white">Laundry</Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
