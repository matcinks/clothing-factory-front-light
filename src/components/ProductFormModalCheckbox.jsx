import { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import ProductFormModalCheckboxLabel from "./ProductFormModalCheckboxLabel";

const ProductFormModalCheckbox = ({
  material,
  checkboxState,
  handleMaterialsSelection,
}) => {
  const { id, name } = material;
  const [isChecked, setIsChecked] = useState(checkboxState);

  const handleOnChange = (e) => {
    setIsChecked(!isChecked);
    handleMaterialsSelection(Number(e.target.value));
  };

  const checkboxLabel = useMemo(
    () => <ProductFormModalCheckboxLabel material={material} />,
    [material, checkboxState]
  );

  return (
    <>
      <Form.Check type="checkbox" id={id + "-" + name}>
        <Form.Check.Input
          type="checkbox"
          onChange={handleOnChange}
          name={name}
          value={id}
          checked={isChecked}
        />
        {checkboxLabel}
      </Form.Check>
    </>
  );
};

export default ProductFormModalCheckbox;
