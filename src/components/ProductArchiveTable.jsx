import { Col, Row, Table } from "react-bootstrap";

import "../util/style.css";

const ProductArchiveTable = ({ archiveData }) => {
  const fillTable = () =>
    archiveData.length < 1 ? (
      <tr>
        <td colSpan={12}>Historia zmian jest pusta.</td>
      </tr>
    ) : (
      archiveData.map((archive) => (
        <tr key={archive.changeId}>
          <td>{archive.propertyName}</td>
          <td>{archive.valueBefore ? archive.valueBefore : "-"}</td>
          <td>{archive.valueAfter}</td>
          <td>{archive.createdAt}</td>
          <td>{archive.user}</td>
        </tr>
      ))
    );

  return (
    <Row>
      <Col className="col-top-margin col-bottom-margin">
        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Zmieniana wartość</th>
              <th>Poprzednia wartość</th>
              <th>Nowa wartość</th>
              <th>Data zmiany</th>
              <th>Zmiany dokonał</th>
            </tr>
          </thead>
          <tbody>{fillTable()}</tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductArchiveTable;
