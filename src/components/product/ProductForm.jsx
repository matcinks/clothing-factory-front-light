import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useSubmit } from "react-router-dom";

import ProductFormCheckbox from "./ProductFormCheckbox";
import ProductFormControl from "./ProductFormControl";
import ProductFormListGroupItem from "./ProductFormListGroupItem";
import ProductFormModal from "./ProductFormModal";

import "../../util/style.css";

const ProductForm = ({ onCancel, fetchedData, product }) => {
  // STATE
  const [displayModal, setDisplayModal] = useState(false);

  const [
    displayDescriptionValidationMessage,
    setDisplayDescriptionValidationMessage,
  ] = useState(false);

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
    createdAt: "",
    version: "",
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
    console.log(event.currentTarget);
    event.preventDefault();
    descriptionFormValue.current.value
      ? submit(event.currentTarget)
      : setDisplayDescriptionValidationMessage(true);
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
      createdAt: product.createdAt,
      version: product.version,
    });
  };

  const fillCategoriesSelectList = fetchedData.categories.map((category) => {
    if (category !== "WZORY")
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    if (!isProductPassedInParams())
      return (
        <option key="WZORY" value="WZORY">
          WZORY
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
    [
      fetchedData.colours,
      handleCheckboxchange,
      productInfo.colours,
      isCheckboxInitiallyChecked,
    ]
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

  const productIdFormGroup = () => {
    if (isProductPassedInParams())
      return (
        <Form.Group
          as={Col}
          controlId="formProductId"
          xs={3}
          md={2}
          lg={2}
          className="col-top-margin col-botom-margin"
        >
          <FloatingLabel label="Nr id">
            <Form.Control
              type="text"
              name="id"
              placeholder={productInfo.id}
              value={productInfo.id}
              readOnly
              onChange={() => {}}
            />
          </FloatingLabel>
        </Form.Group>
      );
  };

  return (
    <>
      <Form
        method={isProductPassedInParams() ? "put" : "post"}
        onSubmit={handleSubmitForm}
      >
        <Row>
          {productIdFormGroup()}
          <Form.Group
            as={Col}
            controlId="formProductName"
            xs={isProductPassedInParams() ? 4 : 7}
            md={isProductPassedInParams() ? 6 : 3}
            lg={isProductPassedInParams() ? 3 : 4}
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
            controlId="formDescription"
            xs={{ span: 12, order: 2 }}
            md={isProductPassedInParams() ? 12 : 5}
            lg={
              isProductPassedInParams()
                ? { span: 5, order: 1 }
                : { span: 6, order: 1 }
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
                isInvalid={displayDescriptionValidationMessage}
                onChange={formHandler}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Nowy produkt musi posiadać opis!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formNewCategory"
            xs={{ span: 5, order: 1 }}
            md={isProductPassedInParams() ? 4 : 4}
            lg={{ span: 2, order: 2 }}
            className="col-top-margin col-botom-margin"
          >
            <Form.Select
              aria-label="formCategory"
              className="h-100"
              name="category"
              value={productInfo.category}
              onChange={formHandler}
            >
              <option value="WZORY">
                {isProductPassedInParams() ? "WZORY" : "Wybierz kategorię"}
              </option>
              {fillMemoizedCategoriesSelectList}
            </Form.Select>
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
          <Col>
            <Row className="h-100">
              <Form.Group
                as={Col}
                controlId="formMaterial"
                className="col-top-margin col-botom-margin"
              >
                <div className="form-control h-100">
                  <Form.Label>Lista wybranych materiałów</Form.Label>
                  <br />
                  <ListGroup variant="flush">{productMaterials}</ListGroup>
                </div>
              </Form.Group>
            </Row>
          </Col>
          <Col>
            <Row>
              <Form.Group
                as={Col}
                controlId="formSelectMaterial"
                className="col-top-margin col-botom-margin"
                lg={4}
                xl={3}
              >
                <div className="form-control" style={{ height: "100%" }}>
                  <Form.Label>Wybór</Form.Label>
                  <br />
                  <div
                    className="d-flex justify-content-center"
                    style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}
                  >
                    <Button variant="outline-danger" onClick={handleShowModal}>
                      Materiały
                    </Button>
                  </div>
                </div>
              </Form.Group>

              <Form.Group
                as={Col}
                controlId="formMaterialUsage"
                className="col-top-margin col-botom-margin"
                lg={8}
                xl={7}
              >
                <div className="form-control">
                  <Form.Label>Zużycie materiału</Form.Label>
                  <br />
                  <Row>
                    <Col>
                      <FloatingLabel label="Ilość">
                        <Form.Control
                          type="number"
                          step="0.05"
                          name="materialUsage"
                          placeholder="Ilość"
                          value={productInfo.materialUsage}
                          onChange={formHandler}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <FloatingLabel label="Jednostka">
                        <Form.Control
                          type="text"
                          name="unitUsage"
                          placeholder="Jednostka"
                          value={productInfo.unitUsage}
                          onChange={formHandler}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formPrice"
                className="col-top-margin col-botom-margin"
                xl={2}
              >
                <FloatingLabel label="Cena" className="h-100">
                  <Form.Control
                    type="number"
                    step="1"
                    name="price"
                    placeholder="Cena"
                    value={productInfo.price}
                    onChange={formHandler}
                    className="h-100"
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
          </Col>
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
              {isProductPassedInParams() ? "Zapisz" : "Dodaj"}
            </Button>
          </Col>
        </Row>
        <Form.Control
          type="hidden"
          name="version"
          value={productInfo.version}
        />
        <Form.Control
          type="hidden"
          name="createdAt"
          value={productInfo.createdAt}
        />
      </Form>
      {materialsModal}
    </>
  );
};

export default ProductForm;
