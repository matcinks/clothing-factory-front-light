import { useEffect, useState } from "react";
import { useSubmit } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";

import NewEntry from "./NewEntry";
import ListEntry from "./ListEntry";

import "../../util/style.css";

const PropertyList = ({ propertiesList }) => {
  const [properties, setProperties] = useState(propertiesList);

  const submit = useSubmit();

  useEffect(() => setProperties(propertiesList), [propertiesList]);

  const handleUpdate = (id, name, createdAt) => {
    const propertyToUpdate = {
      id: id,
      name: name,
      createdAt: createdAt,
    };

    setProperties((currentList) =>
      currentList.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            id: id,
            name: name,
            createdAt: createdAt,
          };
        }
        return element;
      })
    );

    const updatedFormData = new FormData();
    updatedFormData.append("updatedData", JSON.stringify(propertyToUpdate));
    submit(updatedFormData, { method: "PUT" });
  };

  const handleAddNew = (name) => {
    const newFormData = new FormData();
    newFormData.append("newData", JSON.stringify(name));
    submit(newFormData, { method: "POST" });
  };

  const fillTable = () =>
    propertiesList.length < 1 ? (
      <tr>
        <td colSpan={12}>Brak danych.</td>
      </tr>
    ) : (
      propertiesList.map((property) => (
        <ListEntry
          key={property.id}
          property={property}
          handleUpdateList={handleUpdate}
        />
      ))
    );

  return (
    <Container>
      <Row>
        <Col
          className="col-bottom-margin col-top-margin"
          xl={{ span: 6, offset: 3 }}
        >
          <Table bordered hover>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Wartość</th>
                <th>Edycja</th>
              </tr>
            </thead>
            <tbody>
              {fillTable()}
              <NewEntry handleAddNew={handleAddNew} />
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyList;
