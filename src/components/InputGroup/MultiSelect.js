import React from "react";
import { components } from "react-select";

const MultiSelect = (props) => {
  return (
    <div>
      <components.MultiSelect {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className={`mx-4 ${props.className}`}
        />{" "}
        <label></label>
      </components.MultiSelect>
    </div>
  );
};
export default MultiSelect;
