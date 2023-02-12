import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

const TODAYS_DATE = new Date().toLocaleDateString("en-CA");

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as={Col} xl={1}>
            <Nav.Link href="/products">Produkty</Nav.Link>
          </Nav>
          <Nav as={Col} xl={1}>
            <Nav.Link href={"/production/sewing/" + TODAYS_DATE}>
              Produkcja
            </Nav.Link>
          </Nav>
          <Navbar.Text as={Col} xl={{ span: 2, offset: 8 }}>
            Zalogowany:
            <span style={{ color: "white" }}>
              {" " + sessionStorage.getItem("role")}
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
