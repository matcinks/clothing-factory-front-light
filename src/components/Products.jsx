import { Col, Table, Row } from "react-bootstrap";

import ProductListEntry from "./ProductListEntry";

// do tego komponentu przekazana jest lista wszystkich produktów
// dalej do pojedynczego wpisu (wiersza) przekazywany jest pojedynczy produkt

const Products = ({ productsList }) => {
  const displayProducts =
    productsList.length < 1 ? (
      <tr>
        <td colSpan={12}>Lista produktów jest pusta</td>
      </tr>
    ) : (
      productsList.map((product) => (
        <tr key={product.id}>
          <ProductListEntry product={product} />
        </tr>
      ))
    );

  return (
    <Row>
      <Col>
        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Kategoria</th>
              <th>Cena</th>
              <th>Szczegóły</th>
            </tr>
          </thead>
          <tbody>{displayProducts}</tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Products;
