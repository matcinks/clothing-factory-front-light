import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const EditEntry = ({ property, handleCancelEdit, handleSubmitEdit }) => {
  const [name, setName] = useState(property.name);

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    handleSubmitEdit(property.id, name, property.createdAt);
  };

  return (
    <tr>
      <td>{property.id}</td>
      <td>
        <Form onSubmit={handleSubmitForm} id="editForm">
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            style={{ textAlign: "center" }}
          />
        </Form>
      </td>
      <td>
        <Button onClick={handleCancelEdit} size="sm" variant="outline-danger">
          <ClearIcon />
        </Button>
        <Button
          type="submit"
          form="editForm"
          size="sm"
          variant="outline-success"
        >
          <CheckIcon />
        </Button>
      </td>
    </tr>
  );
};

export default EditEntry;
