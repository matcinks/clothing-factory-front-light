import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const NewEntry = ({ handleAddNew }) => {
  const [newName, setNewName] = useState("");
  const [isAddinRowActive, setIsAddinRowActive] = useState(false);

  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    handleAddNew(newName);
    setNewName("");
    handleToggleAdding();
  };

  const handleToggleAdding = () => {
    setIsAddinRowActive(!isAddinRowActive);
    setNewName("");
  };

  const addingButton = () => (
    <td colSpan={3}>
      <Button onClick={handleToggleAdding} size="sm">
        <AddIcon />
      </Button>
    </td>
  );

  const addingRow = () => (
    <>
      <td></td>
      <td>
        <Form onSubmit={handleSubmitForm} id="newForm">
          <Form.Control
            type="text"
            name="newName"
            placeholder="Nowy atrybut"
            value={newName}
            onChange={handleOnChange}
            style={{ textAlign: "center" }}
          />
        </Form>
      </td>
      <td>
        <Button onClick={handleToggleAdding} size="sm" variant="outline-danger">
          <ClearIcon />
        </Button>
        <Button
          type="submit"
          form="newForm"
          size="sm"
          variant="outline-success"
        >
          <CheckIcon />
        </Button>
      </td>
    </>
  );

  return <tr>{isAddinRowActive ? addingRow() : addingButton()}</tr>;
};

export default NewEntry;
