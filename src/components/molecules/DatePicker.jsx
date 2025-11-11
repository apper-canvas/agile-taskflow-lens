import { format } from "date-fns";
import Input from "@/components/atoms/Input";

const DatePicker = ({ value, onChange, label, error, ...props }) => {
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    onChange(dateValue ? new Date(dateValue + "T00:00:00") : null);
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <Input
      type="date"
      label={label}
      error={error}
      value={formatDateForInput(value)}
      onChange={handleDateChange}
      {...props}
    />
  );
};

export default DatePicker;