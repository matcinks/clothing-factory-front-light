import { useEffect, useState } from "react";

import {
  Button,
  FormCheck,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const ScheduleFormMaterialmodal = ({
  close,
  show,
  materialId,
  materialFormHandler,
  productMaterials,
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  useEffect(() => {
    setSelectedMaterialId(materialId);
  }, [materialId]);

  const handleSelectedMaterial = (e) => {
    setSelectedMaterialId(e.target.value);
  };

  const handleOnClick = () => {
    materialFormHandler(selectedMaterialId);
    close();
  };

  const fillMaterialsList = productMaterials.map((material, index) => (
    <FormCheck key={index}>
      <FormCheck.Input
        type="radio"
        name="material"
        id={material.id}
        value={material.id}
        onChange={handleSelectedMaterial}
        checked={material.id === Number(selectedMaterialId)}
      />
      <FormCheck.Label htmlFor={material.id}>
        {[material.name]} | {material.id} | {material.additionalDescription}
      </FormCheck.Label>
    </FormCheck>
  ));

  return (
    <Modal show={show} onHide={close} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Wybierz materiał</Modal.Title>
      </Modal.Header>
      <Modal.Body>{fillMaterialsList}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Anuluj
        </Button>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              Wybierz materiał przed dodaniem
            </Tooltip>
          }
          show={!selectedMaterialId}
        >
          <span className="d-inline-block">
            <Button
              variant="primary"
              disabled={!selectedMaterialId}
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

export default ScheduleFormMaterialmodal;
