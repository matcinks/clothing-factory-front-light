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

import ProductFormCheckbox from "./ProductFormCheckbox";
import ProductFormControl from "./ProductFormControl";
import ProductFormListGroupItem from "./ProductFormListGroupItem";

import "../util/style.css";
import ProductFormModal from "./ProductFormModal";

const ProductForm = ({ onCancel, fetchedData, product }) => {
  // STATE
  const [displayModal, setDisplayModal] = useState(false);

  const [displayValidationMessage, setdisplayValidationMessage] =
    useState(false);

  const [productInfo, setProductInfo] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    additionalInformation: "",
    colours: [],
    sizes: [],
    price: "",
    materialUsage: "",
    unitUsage: "",
    materials: [],
  });

  // SUBMIT FORM
  const submit = useSubmit();

  // DESCRIPTION VALUE FOR VALIDATION
  const descriptionFormValue = useRef();

  // HANDLERS
  const handleShowModal = () => {
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  const formHandler = (event) => {
    setProductInfo({ ...productInfo, [event.target.name]: event.target.value });
  };

  const handleCheckboxchange = (elementId, elementListName) => {
    let changedIds = [];
    productInfo[elementListName].includes(elementId)
      ? (changedIds = productInfo[elementListName].filter(
          (colour) => colour !== elementId
        ))
      : (changedIds = [...productInfo[elementListName], elementId]);
    setProductInfo({ ...productInfo, [elementListName]: changedIds });
  };

  const handleProductMaterialsChange = (newMaterials) =>
    setProductInfo({ ...productInfo, ["materials"]: newMaterials });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    descriptionFormValue.current.value
      ? submit(event.currentTarget)
      : setdisplayValidationMessage(true);
  };

  // INIT IF FORM IS GENERATED FOR PRODUCT EDITING
  useEffect(() => {
    if (isProductPassedInParams()) loadProductData();
  }, []);

  const isProductPassedInParams = () => {
    return product ? true : false;
  };

  const isCheckboxInitiallyChecked = (id, listToCheck) => {
    return listToCheck.includes(id) ? true : false;
  };

  const destructData = (propertyToDestruct) => {
    return propertyToDestruct.map((collectionElement) => collectionElement.id);
  };

  // LOADERS
  const loadProductData = () => {
    // destrukturyzacja kolorow, rozmiarow i materialow do tablic z id
    const destructedColours = destructData(product.colours);
    const destructedSizes = destructData(product.sizes);
    const destructedMaterials = destructData(product.materials);

    // ustawienie danych produktu
    setProductInfo({
      id: product.id,
      additionalInformation: product.additionalInformation
        ? product.additionalInformation
        : "",
      category: product.category ? product.category : "",
      colours: destructedColours ? destructedColours : [],
      description: product.description ? product.description : "",
      materials: destructedMaterials ? destructedMaterials : [],
      materialUsage: product.materialUsage ? product.materialUsage : "",
      name: product.name ? product.name : "",
      price: product.price ? product.price : "",
      sizes: destructedSizes ? destructedSizes : [],
      unitUsage: product.unitUsage ? product.unitUsage : "",
    });
  };

  const fillCategoriesSelectList = fetchedData.categories.map((category) => {
    return (
      <option key={category} value={category}>
        {category}
      </option>
    );
  });
  const fillMemoizedCategoriesSelectList = useMemo(() => {
    return fillCategoriesSelectList;
  }, [fetchedData.categories]);

  const fillColoursCheckbox = useMemo(
    () =>
      fetchedData.colours.map((colour) => (
        <ProductFormCheckbox
          key={colour.id}
          checkboxElement={colour}
          checkboxName={"colours"}
          handleCheckboxchange={handleCheckboxchange}
          checkboxState={isCheckboxInitiallyChecked(
            colour.id,
            productInfo.colours
          )}
        />
      )),
    [productInfo.colours]
  );

  const fillSizesCheckbox = useMemo(
    () =>
      fetchedData.sizes.map((size) => (
        <ProductFormCheckbox
          key={size.id}
          checkboxElement={size}
          checkboxName={"sizes"}
          handleCheckboxchange={handleCheckboxchange}
          checkboxState={isCheckboxInitiallyChecked(size.id, productInfo.sizes)}
          checkboxLabel={"Rozmiary"}
        />
      )),
    [
      fetchedData.sizes,
      handleCheckboxchange,
      productInfo.sizes,
      isCheckboxInitiallyChecked,
    ]
  );

  const materialsModal = useMemo(
    () => (
      <ProductFormModal
        displayModal={displayModal}
        handleCloseModal={handleCloseModal}
        materials={fetchedData.materials}
        productMaterials={productInfo.materials}
        isCheckboxInitiallyChecked={isCheckboxInitiallyChecked}
        handleProductMaterialsChange={handleProductMaterialsChange}
      />
    ),
    [fetchedData.materials, displayModal]
  );

  const productMaterials = useMemo(() => {
    return productInfo.materials.map((productMaterial) => (
      <ProductFormListGroupItem
        key={productMaterial}
        material={fetchedData.materials.find(
          (material) => material.id === productMaterial
        )}
      />
    ));
  }, [productInfo.materials]);

  return (
    <>
      <Form
        method={isProductPassedInParams ? "put" : "post"}
        onSubmit={handleSubmitForm}
      >
        <Row>
          <Form.Group
            as={Col}
            controlId="formProductId"
            xs={3} // 3 dla edycji
            md={2}
            lg={2}
            className="col-top-margin col-botom-margin"
          >
            <FloatingLabel label="Nr id">
              <Form.Control
                type="text"
                name="id"
                placeholder={2}
                value={2}
                disabled
                readOnly
                onChange={() => {}}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formProductName"
            xs={isProductPassedInParams ? 5 : 7} // 5 dla edycji 7 dla dodawania
            md={isProductPassedInParams ? 6 : 3}
            lg={3}
            className="col-top-margin col-botom-margin"
          >
            <ProductFormControl
              name="name"
              placeholder="Nazwa"
              value={productInfo.name}
              formHandler={formHandler}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formNewCategory"
            xs={isProductPassedInParams ? 4 : 5} // 4 dla edycji 5 dla dodawania
            md={isProductPassedInParams ? 4 : 3}
            lg={
              isProductPassedInParams
                ? { span: 2, order: 2 }
                : { span: 2, order: 2 }
            }
            className="col-top-margin col-botom-margin"
          >
            <Form.Select
              aria-label="formCategory"
              className="h-100"
              name="category"
              value={productInfo.category}
              onChange={formHandler}
              // defaultValue="WZORY"
            >
              <option value="WZORY2">Wybierz kategorię</option>
              {fillMemoizedCategoriesSelectList}
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formDescription"
            xs={12}
            md={isProductPassedInParams ? 12 : 6}
            lg={
              isProductPassedInParams
                ? { span: 5, order: 1 }
                : { span: 7, order: 1 }
            }
            className="col-top-margin col-botom-margin"
          >
            <FloatingLabel label="Opis">
              <Form.Control
                type="text"
                name="description"
                placeholder="Opis"
                value={productInfo.description}
                ref={descriptionFormValue}
                isInvalid={displayValidationMessage}
                onChange={formHandler}
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
            controlId="formAdditionalInformation"
            className="col-top-margin col-botom-margin"
          >
            <FloatingLabel label="Dodatkowe informacje">
              <Form.Control
                as="textarea"
                name="additionalInformation"
                placeholder="Dodatkowe informacje"
                className="text-area-size"
                value={productInfo.additionalInformation}
                onChange={formHandler}
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
              {fillColoursCheckbox}
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
              {fillSizesCheckbox}
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
              <ListGroup variant="flush">{productMaterials}</ListGroup>
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
                  variant="outline-danger"
                  onClick={handleShowModal}
                  // size="lg"
                  style={{ padding: "1rem 0.75rem" }}
                >
                  Materiały
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
                      value={productInfo.materialUsage}
                      onChange={formHandler}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel label="Jednostka zużycia">
                    <Form.Control
                      type="text"
                      name="unitUsage"
                      placeholder="Jednostka zużycia"
                      value={productInfo.unitUsage}
                      onChange={formHandler}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center">
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
              {isProductPassedInParams ? "Zapisz" : "Dodaj"}
            </Button>
          </Col>
        </Row>
      </Form>
      {materialsModal}
    </>
  );
};

export default ProductForm;
