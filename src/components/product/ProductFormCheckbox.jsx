import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
const ProductFormCheckbox = ({
  checkboxElement,
  checkboxName,
  handleCheckboxchange,
  checkboxState,
}) => {
  const [isChecked, setIsChecked] = useState(checkboxState);

  const { id, name } = checkboxElement;

  const handleOnChange = (e) => {
    setIsChecked(!isChecked);
    handleCheckboxchange(id, checkboxName);
  };

  useEffect(() => {
    setIsChecked(checkboxState);
  }, [checkboxState]);

  return (
    <Form.Check
      inline
      type="checkbox"
      name={checkboxName}
      value={id}
      label={name}
      id={id + "-" + name}
      checked={isChecked}
      onChange={handleOnChange}
    />
  );
};

export default ProductFormCheckbox;
