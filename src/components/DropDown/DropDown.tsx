import React, { useState } from "react";

interface DropdownsProps {
  label: string;
  value: string;
  options: any;
  onSelect: (selectedOption: any) => void;
  // disabled: boolean;
}

export default function Dropdown({
  label,
  value,
  options,
  onSelect,
}: // disabled,
DropdownsProps) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <>
      <div style={{ padding: "10px", display: "inline-block" }}>
        <label>{label} : </label>
        <select
          style={{ padding: "6px" }}
          // disabled={label === "Add Currency" ? disabled : false}
          value={selectedOption}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value={value}>{value}</option>
          {Object.entries(options) // option value in asending order
            .sort(
              (
                [keyA, valueA]: [string, string],
                [keyB, valueB]: [string, string]
              ) => valueA.localeCompare(valueB)
            )
            .map(
              ([key, value]: [string, string]) =>
                value.trim() !== "" && (
                  <option key={key} value={key}>
                    {value}
                  </option>
                )
            )}
        </select>
      </div>
    </>
  );
}
