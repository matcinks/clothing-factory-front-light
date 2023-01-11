import { FormControl, FloatingLabel } from "react-bootstrap";
const ProductFormControl = ({ name, placeholder, value, formHandler }) => {
  const handleOnChange = (e) => {
    formHandler(e);
  };

  return (
    <FloatingLabel label={placeholder}>
      <FormControl
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </FloatingLabel>
  );
};

export default ProductFormControl;
