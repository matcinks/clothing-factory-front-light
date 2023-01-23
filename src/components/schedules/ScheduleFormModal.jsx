import { useEffect, useState } from "react";
import {
  Button,
  FormCheck,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const ScheduleFormModal = ({
  show,
  products,
  close,
  productFormHandler,
  productId,
}) => {
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    setSelectedProductId(productId);
  }, [productId]);

  const handleSelectedProduct = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleOnClick = () => {
    productFormHandler(selectedProductId);
    close();
  };

  const fillProductsList = products.map((product, index) => (
    <FormCheck key={index}>
      <FormCheck.Input
        type="radio"
        name="product"
        id={product.id}
        value={product.id}
        onChange={handleSelectedProduct}
        checked={product.id === Number(selectedProductId)}
      />
      <FormCheck.Label htmlFor={product.id}>
        {[product.name]} | {product.id} | {product.description}
      </FormCheck.Label>
    </FormCheck>
  ));

  return (
    <Modal show={show} onHide={close} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Wybierz produkt</Modal.Title>
      </Modal.Header>
      <Modal.Body>{fillProductsList}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Anuluj
        </Button>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              Wybierz produkt przed dodaniem
            </Tooltip>
          }
          show={!selectedProductId}
        >
          <span className="d-inline-block">
            <Button
              variant="primary"
              disabled={!selectedProductId}
              onClick={handleOnClick}
            >
              Wybierz
            </Button>
          </span>
        </OverlayTrigger>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleFormModal;
