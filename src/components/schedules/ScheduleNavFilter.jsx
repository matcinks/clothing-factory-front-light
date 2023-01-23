import { FormSelect } from "react-bootstrap";

const ScheduleNavFilter = ({ filterList, handleFilter }) => {
  const fillOptions = filterList.map((item, index) => (
    <option key={index} value={item.id}>
      {item.name}
    </option>
  ));

  const handleSelect = (e) => {
    handleFilter(e.target.value);
  };

  return (
    <FormSelect name="filterSewingSchedule" onChange={handleSelect}>
      <option value="">Filtrowanie po pracowniku</option>
      {fillOptions}
    </FormSelect>
  );
};

export default ScheduleNavFilter;
