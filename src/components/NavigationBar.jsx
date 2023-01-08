import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Row>
      <Col>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Container fluid>
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <Nav.Link href="/products">Produkty</Nav.Link>
              </Nav>
              <Navbar.Text>
                Signed in as: <a href="#login">Test User</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};

export default NavigationBar;
