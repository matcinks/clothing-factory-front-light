import { useState } from "react";

import EditEntry from "./EditEntry";
import Entry from "./Entry";

const ListEntry = ({ property, handleUpdateList }) => {
  const [editProperty, setEditProperty] = useState(false);

  const handleOnClickToggleEdit = () => {
    setEditProperty(!editProperty);
  };

  const handleSubmitEdit = (id, name, createdAt) => {
    handleOnClickToggleEdit();
    handleUpdateList(id, name, createdAt);
  };

  return editProperty ? (
    <EditEntry
      property={property}
      handleCancelEdit={handleOnClickToggleEdit}
      handleSubmitEdit={handleSubmitEdit}
    />
  ) : (
    <Entry property={property} handleCallEdit={handleOnClickToggleEdit} />
  );
};
export default ListEntry;
