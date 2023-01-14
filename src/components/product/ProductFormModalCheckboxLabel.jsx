import { Form } from "react-bootstrap";
const ProductFormModalCheckboxLabel = ({ material }) => {
  const { id, name, composition } = material;

  const compositionLabel = () => {
    let compositionSummary = "";
    let checkForLastIndex = 0;
    composition.map((fabric) => {
      checkForLastIndex++;
      compositionSummary += fabric.percentage + "% " + fabric.rawMaterial;
      if (composition.length > 1 && checkForLastIndex !== composition.length)
        compositionSummary += ", ";
    });
    return compositionSummary;
  };

  return (
    <Form.Check.Label style={{ marginLeft: "0.5em" }}>
      {id} | {name} | {compositionLabel()}
    </Form.Check.Label>
  );
};

export default ProductFormModalCheckboxLabel;
