import { useEffect, useRef, useState } from "react";

import { useNavigate, useSubmit } from "react-router-dom";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleFormMaterialmodal from "./ScheduleFormMaterialModal";
import ScheduleFormModal from "./ScheduleFormModal";
import ScheduleFormSelect from "./ScheduleFormSelect";
import ScheduleFormRadio from "./ScheduleFormRadio";

import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";

import "../../util/style.css";

import { getProductMaterials } from "../../util/api";

const ScheduleForm = ({ fetchedData, schedule }) => {
  const [scheduleData, setScheduleData] = useState({
    id: "",
    productId: "",
    productName: "",
    scheduledOn: "",
    seamstressId: "",
    seamstressName: "",
    amount: "",
    colourId: "",
    sizeId: "",
    materialId: "",
    materialName: "",
    status: "",
    priority: "",
  });

  const [isValid, setIsValid] = useState({
    seamstresses: false,
    amount: false,
    sizeId: false,
    colourId: false,
    productId: false,
    materialId: false,
  });

  const [productMaterials, setProductMaterials] = useState([]);

  const [modal, setModal] = useState(null);
  const [materialModal, setMaterialModal] = useState(null);

  const [date, setDate] = useState();

  // przed submitem sprawdzic czy jest ta wartosc
  const selectFormValue = useRef();
  const numberFormValue = useRef();
  const firstInputFormValue = useRef();
  const secondInputFormValue = useRef();
  const productFormValue = useRef();
  const materialFormValue = useRef();

  const navigate = useNavigate();
  const submit = useSubmit();

  useEffect(() => {
    const nextWorkDayDate = calculateDate();
    setDate(nextWorkDayDate);
    setScheduleData({
      ...scheduleData,
      scheduledOn: nextWorkDayDate,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getProductMaterials(scheduleData.productId);
        setProductMaterials(fetchedData.materials);
      } catch (error) {
        console.log(error);
      }
    };
    if (scheduleData.productId) fetchData();
  }, [scheduleData.productId]);

  useEffect(() => {
    if (schedule) setScheduleData(schedule);
  }, []);

  useEffect(() => {
    console.log("scheduleData: ", scheduleData);
  }, [scheduleData]);

  const handleValidation = () => {
    const isCurrentValid = { ...isValid };

    const fields = [
      selectFormValue,
      numberFormValue,
      productFormValue,
      materialFormValue,
    ];
    const radioFields = [firstInputFormValue, secondInputFormValue];

    fields.forEach((field) => {
      if (field.current.value === "") {
        isCurrentValid[field.current.name] = true;
      } else {
        isCurrentValid[field.current.name] = false;
      }
    });

    radioFields.forEach((field) => {
      if (scheduleData[field.current.name] === "") {
        isCurrentValid[field.current.name] = true;
      } else {
        isCurrentValid[field.current.name] = false;
      }
    });

    setIsValid(isCurrentValid);

    return Object.values(isCurrentValid).every((field) => field === false)
      ? true
      : false;
  };

  const calculateDate = () => {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    if (date.getDay() === 0) date.setDate(date.getDate() + 1);
    if (date.getDay() === 6) date.setDate(date.getDate() + 2);

    return date.toLocaleDateString("en-CA");
  };

  const formHandler = (event) => {
    setScheduleData({
      ...scheduleData,
      [event.target.name]: event.target.value,
    });
  };

  const productFormHandler = (id) => {
    const product = fetchedData.products.find(
      (product) => product.id === Number(id)
    );
    setScheduleData({
      ...scheduleData,
      productId: product.id,
      productName: product.name,
      materialId: "",
    });
  };

  const materialFormHandler = (id) => {
    const material = productMaterials.find(
      (material) => material.id === Number(id)
    );
    setScheduleData({
      ...scheduleData,
      materialId: material.id,
      materialName: material.name,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) submit(event.currentTarget);
  };

  // ***********************************
  // przerobic moze na jeden modal w zaleznosci od argumentu?
  const addProductModal = () => {
    setModal(
      <ScheduleFormModal
        show={true}
        close={closeProductModal}
        products={fetchedData.products}
        productFormHandler={productFormHandler}
        productId={scheduleData.productId}
      />
    );
  };

  const closeProductModal = () => {
    setModal(null);
  };

  const addMaterialModal = () => {
    setMaterialModal(
      <ScheduleFormMaterialmodal
        show={true}
        close={closeMaterialModal}
        materialFormHandler={materialFormHandler}
        materialId={scheduleData.materialId}
        productMaterials={productMaterials}
      />
    );
  };

  const closeMaterialModal = () => {
    setMaterialModal(null);
  };
  // ***********************************

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setScheduleData({
      ...scheduleData,
      scheduledOn: newDate.$d.toLocaleDateString("en-CA"),
    });
  };

  const formSelectHandler = (id) => {
    const selectedSeamstressId = id;
    if (id === "")
      return setScheduleData({
        ...scheduleData,
        seamstressId: "",
        seamstressName: "",
      });
    const selectedSeamstressName = fetchedData.seamstresses.find(
      (seamstress) => seamstress.id === Number(id)
    ).name;
    setScheduleData({
      ...scheduleData,
      seamstressId: selectedSeamstressId,
      seamstressName: selectedSeamstressName,
    });
  };

  return (
    <Form onSubmit={handleSubmit} method={schedule ? "put" : "post"}>
      <Container>
        <Row>
          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <ScheduleDatePicker
              date={date}
              handleDateChange={handleDateChange}
            />
          </Col>

          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <ScheduleFormSelect
              list={fetchedData.seamstresses}
              selectFormValue={selectFormValue}
              isValid={isValid.seamstresses}
              selectName="seamstressId"
              formHandler={formSelectHandler}
              selectedValue={scheduleData.seamstressId}
            />
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <Form.Control
              type="text"
              placeholder="Informacje o produkcie"
              value={
                scheduleData.productName
                  ? scheduleData.productName +
                    " | nr kat: " +
                    scheduleData.productId
                  : "Wybierz produkt"
              }
              disabled
              isInvalid={isValid.productId}
            />
            <Form.Control
              type="hidden"
              name="productId"
              value={scheduleData.productId}
              ref={productFormValue}
            />
            <Form.Control
              type="hidden"
              name="productName"
              value={scheduleData.productName}
            />
            <Form.Control.Feedback type="invalid">
              Produkt musi być wybrany z listy.
            </Form.Control.Feedback>
          </Col>

          <Col className="col-top-margin col-bottom-margin" xl={1}>
            {modal}
            <Button
              onClick={addProductModal}
              className="w-100"
              variant="warning"
            >
              {scheduleData.productId ? <ReplayIcon /> : <AddIcon />}
            </Button>
          </Col>

          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <Form.Control
              type="text"
              placeholder="Wybierz materiał"
              value={
                scheduleData.materialName
                  ? scheduleData.materialName +
                    " | nr kat: " +
                    scheduleData.materialId
                  : "Wybierz materiał"
              }
              disabled
              isInvalid={isValid.materialId}
            />
            <Form.Control
              type="hidden"
              name="materialId"
              value={scheduleData.materialId}
              ref={materialFormValue}
            />
            <Form.Control
              type="hidden"
              name="materialName"
              value={scheduleData.materialName}
            />
            <Form.Control.Feedback type="invalid">
              Materiał musi być wybrany z listy.
            </Form.Control.Feedback>
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={1}>
            {materialModal}
            <Button
              onClick={addMaterialModal}
              className="w-100"
              variant="info"
              disabled={!scheduleData.productId}
            >
              {scheduleData.materialId ? <ReplayIcon /> : <AddIcon />}
            </Button>
          </Col>

          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <Form.Control
              id="amount"
              type="number"
              placeholder="Podaj ilość"
              value={scheduleData.amount}
              name="amount"
              min={1}
              onChange={formHandler}
              ref={numberFormValue}
              isInvalid={isValid.amount}
            />
            <Form.Control.Feedback type="invalid">
              Ilośc musi być podana.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col className="col-top-margin col-bottom-margin">
            <ScheduleFormRadio
              list={fetchedData.sizes}
              inputFormValue={firstInputFormValue}
              checkName="sizeId"
              displayName="Wybierz rozmiar"
              isValid={isValid.sizeId}
              handleChange={formHandler}
              inputValue={scheduleData.sizeId}
            />
          </Col>
          <Col className="col-top-margin col-bottom-margin">
            <ScheduleFormRadio
              list={fetchedData.colours}
              inputFormValue={secondInputFormValue}
              checkName="colourId"
              displayName="Wybierz kolor"
              isValid={isValid.colourId}
              handleChange={formHandler}
              inputValue={scheduleData.colourId}
            />
            <Form.Control
              type="hidden"
              name="scheduledOn"
              value={scheduleData.scheduledOn}
            />
            <Form.Control type="hidden" name="id" value={scheduleData.id} />
            <Form.Control
              type="hidden"
              name="status"
              value={scheduleData.status}
            />
            <Form.Control
              type="hidden"
              name="priority"
              value={scheduleData.priority}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <Button
              onClick={() => navigate(-1)}
              className="w-100"
              variant="secondary"
            >
              Anuluj
            </Button>
          </Col>
          <Col className="col-top-margin col-bottom-margin" xl={2}>
            <Button type="submit" className="w-100">
              {scheduleData.id ? "Zatwierdź zmiany" : "Dodaj szycie"}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default ScheduleForm;
