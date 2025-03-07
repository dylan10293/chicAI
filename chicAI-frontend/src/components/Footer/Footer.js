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
                            {
                                [
                                    { href: "/outfits", title: "Meet The Team" },
                                    { href: "/outfits", title: "Outfits" },
                                    { href: "/wardrobe-management", title: "Wardrobe" },
                                    { href: "/laundry", title: "Laundry" }
                                ].map(({ href, title }) => (
                                    <Nav.Link href={href} className="text-white">{title}</Nav.Link>
                                ))
                            }

                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
