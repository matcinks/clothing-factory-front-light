import { Col, Row } from "react-bootstrap";
const Footer = () => {
  console.log("Footer rendering");
  return (
    <Row>
      <Col className="d-flex justify-content-end">©2023</Col>
    </Row>
  );
};

export default Footer;
