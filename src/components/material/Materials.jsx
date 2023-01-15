import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

import MaterialsListEntry from "./MaterialsListEntry";

import "../../util/style.css";

const Materials = ({ materials }) => {
  const displayMaterials =
    materials.length < 1 ? (
      <tr>
        <td colSpan={12}>Lista materiałów jest pusta</td>
      </tr>
    ) : (
      materials.map((material) => (
        <tr key={material.id}>
          <MaterialsListEntry material={material} />
        </tr>
      ))
    );

  return (
    <Container>
      <Row>
        <Col className="col-top-margin col-bottom-margin">
          <Link to="/products/materials/new">
            <Button variant="outline-dark">Dodaj materiał</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="col-top-margin col-bottom-margin">
          <Table bordered hover>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Skład</th>
                <th>Cena</th>
                <th>Edycja</th>
              </tr>
            </thead>
            <tbody>{displayMaterials}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Materials;
