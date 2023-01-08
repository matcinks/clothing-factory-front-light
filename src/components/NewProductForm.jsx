import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";

import { useSubmit } from "react-router-dom";

import "../util/style.css";

const NewProductForm = ({ onCancel, fetchedData, product }) => {
  // STATE
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [productMaterials, setProductMaterials] = useState([]);
  const [selectedMaterialsIds, setSelectedMaterialsIds] = useState([]);
  const [displayMaterialsModal, setDisplayMaterialsModal] = useState(false);

  const [displayValidationMessage, setdisplayValidationMessage] =
    useState(false);

  // SUBMIT FORM
  const submit = useSubmit();

  // DESCRIPTION VALUE FOR VALIDATION
  const descriptionFormValue = useRef();

  // ON INIT
  useEffect(() => {
    setColours(fetchedData.colours);
    setSizes(fetchedData.sizes);
    setCategories(fetchedData.categories);
    setMaterials(fetchedData.materials);
  }, []);

  // HANDLERS
  const handleShowMaterialModal = () => {
    setDisplayMaterialsModal(true);
  };
  const handleCloseMaterialModal = () => {
    setDisplayMaterialsModal(false);
  };
  const handleSubmitSelectedMaterials = () => {
    const selectedMaterials = [];
    materials.map((material) => {
      if (selectedMaterialsIds.includes(material.id))
        selectedMaterials.push(material);
    });
    if (selectedMaterials !== productMaterials)
      setProductMaterials(selectedMaterials);
    handleCloseMaterialModal();
  };
  const handleSelectedMaterialsChange = (e) => {
    const selectedMaterialId = Number(e.target.value);
    if (selectedMaterialsIds.includes(selectedMaterialId)) {
      return setSelectedMaterialsIds(
        selectedMaterialsIds.filter(
          (material) => material !== selectedMaterialId
        )
      );
    }
    setSelectedMaterialsIds([...selectedMaterialsIds, selectedMaterialId]);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    descriptionFormValue.current.value
      ? submit(event.currentTarget)
      : setdisplayValidationMessage(true);
  };

  // CHECKERS
  const isMaterialCheckboxChecked = (id) => {
    return selectedMaterialsIds.includes(id) ? true : false;
  };

  // CALLBACKS
  const materialsSelectListInput = useCallback(
    (materialId) => {
      return (
        <Form.Check.Input
          type="checkbox"
          onChange={handleSelectedMaterialsChange}
          value={materialId}
          checked={isMaterialCheckboxChecked(materialId)}
        />
      );
    },
    [selectedMaterialsIds]
  );
  const materialsSelectListLabel = useCallback(
    (materialId, materialName, materialComposition) => {
      let compositionSummary = "";
      let checkForLastIndex = 0;
      materialComposition.map((composition) => {
        checkForLastIndex++;
        compositionSummary +=
          composition.percentage + "% " + composition.rawMaterial;
        if (
          materialComposition.length > 1 &&
          checkForLastIndex !== materialComposition.length
        )
          compositionSummary += ", ";
      });
      return (
        <Form.Check.Label>
          {materialId} | {materialName} | {compositionSummary}
        </Form.Check.Label>
      );
    },
    [materials]
  );

  // LOADERS
  const fillColoursCheckList = colours.map((colour) => {
    return (
      <Form.Check
        key={colour.id}
        inline
        type="checkbox"
        name="colours"
        value={colour.id}
        label={colour.name}
        id={colour.id + "-" + colour.name}
      />
    );
  });
  const fillMemoizedColoursCheckList = useMemo(() => {
    return fillColoursCheckList;
  }, [colours]);

  const fillSizesCheckList = sizes.map((size) => {
    return (
      <Form.Check
        key={size.id}
        inline
        type="checkbox"
        name="sizes"
        value={size.id}
        label={size.name}
        id={size.id + "-" + size.name}
      />
    );
  });
  const fillMemoizedSizesCheckList = useMemo(() => {
    return fillSizesCheckList;
  }, [sizes]);

  const fillCategoriesSelectList = categories.map((category) => {
    return (
      <option key={category} value={category}>
        {category}
      </option>
    );
  });
  const fillMemoizedCategoriesSelectList = useMemo(() => {
    return fillCategoriesSelectList;
  }, [categories]);

  const fillProductMaterialsList = productMaterials.map((material) => {
    return (
      <ListGroup.Item key={material.id}>
        {material.id} | {material.name} | {material.additionalDescription}
        <Form.Control type="hidden" name="materials" value={material.id} />
      </ListGroup.Item>
    );
  });
  const fillMemoizedProductMaterialsList = useMemo(() => {
    return fillProductMaterialsList;
  }, [productMaterials]);

  const fillMaterialsToSelectList = materials.map((material) => {
    return (
      <Form.Check
        type="checkbox"
        id={material.id + "-" + material.name}
        key={material.id + "-" + material.name}
      >
        {materialsSelectListInput(material.id)}
        {materialsSelectListLabel(
          material.id,
          material.name,
          material.composition
        )}
      </Form.Check>
    );
  });

  const fillMemoizedMaterialsToSelectList = useMemo(() => {
    return fillMaterialsToSelectList;
  }, [materials, selectedMaterialsIds]);

  // const materialAddingModal = (
  //   <Modal
  //     show={displayMaterialsModal}
  //     onHide={handleCloseMaterialModal}
  //     animation={false}
  //   >
  //     <Modal.Header closeButton>
  //       <Modal.Title>Wybierz materiały</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <Form>{fillMemoizedMaterialsToSelectList}</Form>
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button variant="secondary" onClick={handleCloseMaterialModal}>
  //         Anuluj
  //       </Button>
  //       <Button variant="primary" onClick={handleSubmitSelectedMaterials}>
  //         Dodaj
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
  // const memoizedMaterialAddingModal = useMemo(() => {
  //   return materialAddingModal;
  // }, [
  //   displayMaterialsModal,
  //   handleCloseMaterialModal,
  //   handleShowMaterialModal,
  // ]);

  return (
    <>
      <Form method="post" onSubmit={handleSubmitForm}>
        <Row>
          <Form.Group
            as={Col}
            controlId="formNewProductName"
            xs={7}
            sm={6}
            lg={3}
            className="col-top-margin col-botom-margin"
          >
            <FloatingLabel label="Nazwa">
              <Form.Control type="text" name="name" placeholder="Nazwa" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formNewCategory"
            xs={5}
            sm={6}
            lg={2}
            className="col-top-margin col-botom-margin"
          >
            <Form.Select
              aria-label="formNewCategory"
              className="h-100"
              name="category"
            >
              <option value="WZORY">Wybierz kategorię</option>
              {fillMemoizedCategoriesSelectList}
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formNewDescription"
            xs={12}
            lg={7}
            className="col-top-margin col-botom-margin"
          >
            <FloatingLabel label="Opis">
              <Form.Control
                type="text"
                name="description"
                placeholder="Opis"
                ref={descriptionFormValue}
                isInvalid={displayValidationMessage}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Nowy produkt musi posiadać opis!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            controlId="formNewAdditionalInformation"
            className="col-top-margin col-botom-margin"
          >
            <FloatingLabel label="Dodatkowe informacje">
              <Form.Control
                as="textarea"
                name="additionalInformation"
                placeholder="Dodatkowe informacje"
                className="text-area-size"
              />
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            controlId="formNewColours"
            className="col-top-margin col-botom-margin"
          >
            <div className="form-control">
              <Form.Label>Kolory</Form.Label>
              <br />
              {fillMemoizedColoursCheckList}
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            controlId="formNewSizes"
            className="col-top-margin col-botom-margin"
          >
            <div className="form-control">
              <Form.Label>Rozmiary</Form.Label>
              <br />
              {fillMemoizedSizesCheckList}
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            controlId="formNewMaterial"
            className="col-top-margin col-botom-margin"
            lg={12}
            xl={6}
          >
            <div className="form-control h-100">
              <Form.Label>Wybrane materiały</Form.Label>
              <br />
              <ListGroup variant="flush">
                {productMaterials.length ? (
                  fillMemoizedProductMaterialsList
                ) : (
                  <ListGroup.Item>Nie wybrano żadnego materiału</ListGroup.Item>
                )}
              </ListGroup>
            </div>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formNewSelectMaterial"
            className="col-top-margin col-botom-margin"
            lg={4}
            xl={2}
          >
            <div className="form-control">
              <Form.Label>Wybierz materiał</Form.Label>
              <br />
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={handleShowMaterialModal}
                  // size="lg"
                  style={{ marginBottom: "0.55em" }}
                >
                  Lista materiałów
                </Button>
              </div>
            </div>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formNewMaterialUsage"
            className="col-top-margin col-botom-margin"
            lg={8}
            xl={4}
          >
            <div className="form-control">
              <Form.Label>Zużycie materiału</Form.Label>
              <br />
              <Row>
                <Col>
                  <FloatingLabel label="Ilość materiału">
                    <Form.Control
                      type="number"
                      step="0.05"
                      name="materialUsage"
                      placeholder="Ilość materiału"
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel label="Jednostka zużycia">
                    <Form.Control
                      type="text"
                      name="unitUsage"
                      placeholder="Jednostka zużycia"
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col className="col-top-margin col-botom-margin d-grid gap-2" xxl={2}>
            <Button variant="secondary" type="button" onClick={onCancel}>
              Anuluj
            </Button>
          </Col>
          <Col className="col-top-margin col-botom-margin d-grid gap-2" xxl={2}>
            <Button variant="primary" type="submit">
              Dodaj
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        show={displayMaterialsModal}
        onHide={handleCloseMaterialModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wybierz materiały</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{fillMemoizedMaterialsToSelectList}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMaterialModal}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleSubmitSelectedMaterials}>
            {productMaterials.length ? "Zamień" : "Dodaj"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewProductForm;

/*


<Form method="post">
        <label>
          <span>Nazwa</span>
          <input id="name" type="text" name="name" />
        </label>
        <label>
          <span>Opis</span>
          <input id="description" type="text" name="description" />
        </label>
        <label>
          <span>Doadtkowe informacje</span>
          <input
            id="additionalInformation"
            type="text"
            name="additionalInformation"
          />
        </label>
        <label>
          <span>Kategoria</span>
          <input id="category" type="text" name="category" value="BLUZKI" />
        </label>

        <fieldset>
          <label>
            <span>1m</span>
            <input
              type="checkbox"
              name="materials"
              value="1"
              defaultChecked={true}
            />
          </label>
          <label>
            <span>2m</span>
            <input type="checkbox" name="materials" value="2" />
          </label>
          <label>
            <span>3m</span>
            <input type="checkbox" name="materials" value="3" />
          </label>
        </fieldset>

        <fieldset>
          <label>
            <span>1s</span>
            <input
              type="checkbox"
              name="sizes"
              value="1"
              defaultChecked={true}
            />
          </label>
          <label>
            <span>2s</span>
            <input type="checkbox" name="sizes" value="2" />
          </label>
          <label>
            <span>3s</span>
            <input type="checkbox" name="sizes" value="3" />
          </label>
        </fieldset>

        <fieldset>
          <label>
            <span>1c</span>
            <input
              type="checkbox"
              name="colours"
              value="1"
              defaultChecked={true}
            />
          </label>
          <label>
            <span>2c</span>
            <input type="checkbox" name="colours" value="2" />
          </label>
          <label>
            <span>3c</span>
            <input type="checkbox" name="colours" value="3" />
          </label>
        </fieldset>

        <label>
          <span>Zużycie materiału</span>
          <input
            id="materialUsage"
            type="number"
            name="materialUsage"
            value="2.5"
          />
        </label>
        <label>
          <span>jednostka zużycia materiału</span>
          <input id="unitUsage" type="text" name="unitUsage" value="m/2szt" />
        </label>

        <button type="button" onClick={onCancel}>
          Anuluj
        </button>
        <button type="submit">Dodaj produkt</button>
      </Form>
    </>

*/
