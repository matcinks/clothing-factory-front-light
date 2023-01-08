import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductsNavMenu = () => {
  return (
    <Row>
      <Col>
        <Nav variant="tabs" defaultActiveKey="/products">
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
            <Nav.Link eventKey="/sizes" href="/sizes">
              Rozmiary
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/colours" href="/colours">
              Kolory
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>

    //TODO usunąć póżniej
    // poprzednia nazwa pliku NewProductButton
    // zmieniono na ogólne menu zakładki produktu

    // <div>
    //   <Link to="/products/new">
    //     <Button variant="outline-dark" size="sm">
    //       Dodaj produkt
    //     </Button>
    //   </Link>
    // </div>
  );
};

export default ProductsNavMenu;
