import { FormControl, ListGroupItem } from "react-bootstrap";
const ProductFormListGroupItem = ({ material }) => {
  const { additionalDescription, id, name } = material;
  return (
    <ListGroupItem>
      {id} | {name} | {additionalDescription}
      <FormControl type="hidden" name="materials" value={id} />
    </ListGroupItem>
  );
};

export default ProductFormListGroupItem;
