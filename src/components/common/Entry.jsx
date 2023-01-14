import { Button } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";

const Entry = ({ property, handleCallEdit }) => {
  return (
    <tr>
      <td>{property.id}</td>
      <td>{property.name}</td>
      <td>
        <Button onClick={handleCallEdit} size="sm">
          <EditIcon />
        </Button>
      </td>
    </tr>
  );
};

export default Entry;
