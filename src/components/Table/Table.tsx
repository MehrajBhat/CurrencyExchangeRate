import React from "react";

interface TableProps {
  data: string[];
  currencyList: { [currencyCode: string]: string };
  columnHeading: string[];
  setColmnHeading: any;
}

export default function Table({
  data,
  currencyList,
  columnHeading,
  setColmnHeading,
}: TableProps) {
  debugger;
  // remove column from table
  const deleteColumnHandler = (item: any) => {
    const filteredArray = columnHeading.filter((i: any) => i !== item);
    columnHeading.length > 3 && setColmnHeading(filteredArray);
  };

  return (
    <table
      style={{
        marginTop: "50px",
        border: "1px solid black",
        borderCollapse: "collapse",
      }}
    >
      <tr>
        <th style={{ border: "1px solid black", padding: "5px" }}>Date</th>
        {columnHeading.map((item: any) => (
          <th style={{ border: "1px solid black", padding: "5px" }}>
            {currencyList[item]}
            {columnHeading.length > 3 && (
              <i
                onClick={() => deleteColumnHandler(item)}
                className="fa fa-times"
                aria-hidden="true"
                style={{
                  color: "red",
                  marginLeft: "10px",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              ></i>
            )}
          </th>
        ))}
      </tr>
      <tbody>
        {data && data.length > 0 ? (
          data.map((rowData: any, rowIndex: number) => (
            <tr key={rowIndex}>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {rowData.newDate}
              </td>
              {columnHeading.map((item: any, colIndex: number) => (
                <td
                  key={colIndex}
                  style={{ border: "1px solid black", padding: "5px" }}
                >
                  {rowData.rate ? rowData.rate[item] : "N/A"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columnHeading.length + 1}>No data found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}