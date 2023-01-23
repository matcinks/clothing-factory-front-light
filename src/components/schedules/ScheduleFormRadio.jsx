import { useEffect, useState } from "react";

import { FormControl, FormCheck, FormLabel } from "react-bootstrap";

const ScheduleFormRadio = ({
  list,
  inputFormValue,
  checkName,
  displayName,
  isValid,
  handleChange,
  inputValue,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const fillCheckboxes = list.map((entry, index) => (
    <FormCheck
      key={index}
      type="radio"
      name={checkName}
      value={entry.id}
      label={entry.name}
      id={entry.name}
      isInvalid={isValid}
      onChange={handleChange}
      ref={inputFormValue}
      inline
      checked={entry.id === Number(value)}
    />
  ));

  return (
    <div className={isValid ? "form-control is-invalid" : "form-control"}>
      <FormLabel>{displayName}</FormLabel>
      <br />
      {fillCheckboxes}
      <FormControl.Feedback type="invalid" className={isValid ? "d-block" : ""}>
        To pole musi być wybrane.
      </FormControl.Feedback>
    </div>
  );
};

export default ScheduleFormRadio;
