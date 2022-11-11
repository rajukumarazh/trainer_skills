/* eslint-disable array-callback-return */
export default function jsonToCsv(tableData, columns) {
  var csv = "";
  columns.map((column, index) => {
    if (column.selector) {
      csv += column.name;
      if (index < columns.length - 1) {
        csv += ",";
      }
    }
  });
  csv += "\n";

  tableData.forEach((v) => {
    columns.map((column, index) => {
      if (column.selector) {
        csv += column.selector(v);
        if (index < columns.length - 1) {
          csv += ",";
        }
      }
    });
    csv += "\n";
  });
  return csv;
}
