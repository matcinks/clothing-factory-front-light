import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import EditIcon from "@mui/icons-material/Edit";

const MaterialsListEntry = ({ material }) => {
  const { id, name, additionalDescription, composition, price, priceUnit } =
    material;

  const displayComposition = composition.map((item, index) => (
    <div key={index}>
      {item.percentage}% {item.rawMaterial}
    </div>
  ));

  return (
    <>
      <td>{id}</td>
      <td>{name}</td>
      <td>{additionalDescription}</td>
      <td>{displayComposition}</td>
      <td>
        {price} {priceUnit}
      </td>
      <td>
        <Link to={"/products/materials/" + id + "/edit"}>
          <Button size="sm">
            <EditIcon />
          </Button>
        </Link>
      </td>
    </>
  );
};
export default MaterialsListEntry;
