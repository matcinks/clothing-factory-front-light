import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";

import ProductFormModalCheckbox from "./ProductFormModalCheckbox";

const ProductFormModal = ({
  displayModal,
  handleCloseModal,
  materials,
  productMaterials,
  isCheckboxInitiallyChecked,
  handleProductMaterialsChange,
}) => {
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  useEffect(() => {
    setSelectedMaterials(productMaterials);
  }, [productMaterials, handleCloseModal]);

  const handleMaterialsSelection = (id) => {
    let newSelectedMaterials = [];

    selectedMaterials.includes(id)
      ? (newSelectedMaterials = selectedMaterials.filter(
          (selectedId) => selectedId !== id
        ))
      : (newSelectedMaterials = [...selectedMaterials, id]);
    setSelectedMaterials(newSelectedMaterials);
  };

  const handleButtonOnClick = () => {
    handleProductMaterialsChange(selectedMaterials);
    handleCloseModal();
  };

  const checkboxes = useMemo(
    () =>
      materials.map((material) => (
        <ProductFormModalCheckbox
          key={material.id}
          material={material}
          checkboxState={isCheckboxInitiallyChecked(
            material.id,
            productMaterials
          )}
          handleMaterialsSelection={handleMaterialsSelection}
        />
      )),
    [materials, productMaterials, selectedMaterials]
  );

  return (
    <Modal show={displayModal} onHide={handleCloseModal} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Wybierz materiały</Modal.Title>
      </Modal.Header>
      <Modal.Body>{checkboxes}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Anuluj
        </Button>
        <Button variant="primary" onClick={handleButtonOnClick}>
          {productMaterials.length ? "Zamień" : "Dodaj"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;
