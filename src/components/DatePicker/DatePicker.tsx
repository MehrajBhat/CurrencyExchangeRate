import React from "react";

interface DatePickerProps {
  date: string;
  onChange: (selectedOption: any) => void;
}

export default function DatePicker({ date, onChange }: DatePickerProps) {
  return (
    <>
      <label>Select Date : </label>
      <input
        type="date"
        value={date}
        onChange={(event: any) => onChange(event.target.value)}
        style={{ width: "200px", height: "30px" }}
      />
    </>
  );
}
