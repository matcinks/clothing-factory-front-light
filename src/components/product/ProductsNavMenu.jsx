import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductsNavMenu = () => {
  return (
    <Row>
      <Col>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={Link} to="/products" eventKey="/products">
              Produkty
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/materials" href="/materials">
              Materiały
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/products/sizes" eventKey="/products/sizes">
              Rozmiary
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/products/colours"
              eventKey="/products/colours"
            >
              Kolory
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default ProductsNavMenu;
