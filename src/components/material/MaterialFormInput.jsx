import { FloatingLabel, FormControl } from "react-bootstrap";

const MaterialFormInput = ({ label, name, value, handler, type, as }) => {
  return (
    <FloatingLabel label={label} style={{ height: "100%" }}>
      <FormControl
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={handler}
        as={as}
        style={{ height: "100%" }}
      />
    </FloatingLabel>
  );
};

export default MaterialFormInput;
