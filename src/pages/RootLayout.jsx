import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Footer from "../components/Footer";
import Header from "../components/Header";

const RootLayout = () => {
  console.log("Root Layout rendering");
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default RootLayout;
