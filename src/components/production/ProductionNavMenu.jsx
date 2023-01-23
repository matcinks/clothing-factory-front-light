import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductionNavMenu = () => {
  const todayDate = new Date().toLocaleDateString("en-CA");
  return (
    <Row>
      <Col>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={"/production/sewing/" + todayDate}
              eventKey="/production/sewing"
            >
              Szycie
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/production/sewing/seamstresses"
              eventKey="/production/sewing/seamstresses"
            >
              Szwaczki
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default ProductionNavMenu;
