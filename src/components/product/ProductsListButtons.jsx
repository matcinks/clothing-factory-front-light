import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProductsFilter from "./ProductsFilter";
import ProductsSearch from "./ProductsSearch";

import "../../util/style.css";

const ProductsListButtons = () => {
  return (
    <Row>
      <Col
        xs={3}
        lg={2}
        className="d-flex justify-content-start col-top-margin col-bottom-margin"
      >
        <Link to="/products/new">
          <Button variant="outline-dark">Dodaj produkt</Button>
        </Link>
      </Col>
      <Col
        xs={9}
        lg={6}
        className="d-flex justify-content-end align-items-center align-self-center col-top-margin col-bottom-margin"
      >
        <ProductsFilter />
      </Col>
      <Col
        xs={12}
        lg={4}
        className="d-flex justify-content-end col-top-margin col-bottom-margin"
      >
        <ProductsSearch />
      </Col>
    </Row>
  );
};

export default ProductsListButtons;
