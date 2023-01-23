import { useEffect, useState } from "react";
import { FormControl, FormSelect } from "react-bootstrap";

const ScheduleFormSelect = ({
  list,
  selectFormValue,
  isValid,
  selectName,
  formHandler,
  selectedValue,
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [selectedValue]);

  const fillSelectList = list.map((entry, index) => (
    <option key={index} value={entry.id}>
      {entry.name}
    </option>
  ));

  const selectHandler = (event) => {
    setSelected(event.target.value);
    formHandler(event.target.value);
  };

  return (
    <>
      <FormSelect
        name={selectName}
        value={selected}
        onChange={selectHandler}
        ref={selectFormValue}
        isInvalid={isValid}
      >
        <option value="">Pracownik</option>
        {fillSelectList}
      </FormSelect>
      <FormControl.Feedback type="invalid">
        Pracownik musi być wybrany z listy.
      </FormControl.Feedback>
    </>
  );
};

export default ScheduleFormSelect;
