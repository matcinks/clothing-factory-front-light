import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pl";

const ScheduleDatePicker = ({ date, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <DatePicker
        inputFormat="DD-MM-YYYY"
        value={date}
        onChange={(newDate) => handleDateChange(newDate)}
        renderInput={(params) => <TextField {...params} />}
        className="date-picker"
      />
    </LocalizationProvider>
  );
};

export default ScheduleDatePicker;
