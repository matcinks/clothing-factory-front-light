import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Col,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useSubmit } from "react-router-dom";

import "../../util/style.css";
import MaterialFormInput from "./MaterialFormInput";
import AddComposition from "./AddComposition";

const MaterialForm = ({ rawMaterials, onCancel, materialToEdit }) => {
  const [material, setMaterial] = useState({
    id: "",
    name: "",
    additionalDescription: "",
    composition: [],
    price: 0,
    priceUnit: "",
    createdAt: "",
  });

  const submit = useSubmit();

  useEffect(() => {
    if (materialToEdit) setMaterial(materialToEdit);
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    submit(event.currentTarget);
  };

  const formHandler = (event) => {
    setMaterial({ ...material, [event.target.name]: event.target.value });
  };

  const updateComposition = (composition) =>
    setMaterial({ ...material, composition: composition });

  const materialFormId = () => {
    if (material.id)
      return (
        <Col className="col-top-margin col-bottom-margin" xl={1}>
          <FloatingLabel label="Nr id">
            <Form.Control
              type="text"
              name="id"
              placeholder="id"
              value={material.id}
              onChange={() => {}}
              readOnly
            />
          </FloatingLabel>
        </Col>
      );
  };

  return (
    <Form method={material.id ? "put" : "post"} onSubmit={handleSubmitForm}>
      <Container>
        <Row>
          {materialFormId()}
          <Col
            className="col-top-margin col-bottom-margin"
            xl={material.id ? 6 : 7}
          >
            <MaterialFormInput
              label={"Nazwa"}
              name={"name"}
              value={material.name}
              handler={formHandler}
              type={"text"}
            />
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <MaterialFormInput
              label={"Cena"}
              name={"price"}
              value={material.price}
              handler={formHandler}
              type={"number"}
            />
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={3}>
            <MaterialFormInput
              label={"Jednostka ceny"}
              name={"priceUnit"}
              value={material.priceUnit}
              handler={formHandler}
              type={"text"}
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-top-margin col-bottom-margin">
            <MaterialFormInput
              type={"textarea"}
              label={"Opis"}
              name={"additionalDescription"}
              value={material.additionalDescription}
              handler={formHandler}
              as={"textarea"}
            />
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={5}>
            <div className="form-control">
              <Form.Label>Skład</Form.Label>
              <br />
              {
                <AddComposition
                  rawMaterials={rawMaterials}
                  materialComposition={material.composition}
                  updateMaterialComposition={updateComposition}
                />
              }
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          <Col
            className="col-top-margin col-botom-margin d-grid gap-2"
            xs={4}
            md={3}
            lg={2}
          >
            <Button variant="secondary" type="button" onClick={onCancel}>
              Anuluj
            </Button>
          </Col>
          <Col
            className="col-top-margin col-botom-margin d-grid gap-2"
            xs={4}
            md={3}
            lg={2}
          >
            <Button variant="primary" type="submit">
              {material.id ? "Zapisz" : "Dodaj"}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default MaterialForm;
