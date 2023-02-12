import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Footer from "../components/Footer";
import Header from "../components/Header";

const AppContainer = () => {
  return (
    <Container>
      <Row className="row-header">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="row-content">
        <Col>
          <Outlet />
        </Col>
      </Row>
      <Row className="row-footer">
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default AppContainer;
