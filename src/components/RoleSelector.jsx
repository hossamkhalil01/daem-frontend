import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";
import capitalize from "../utils/capitalize";
import ROLES from "../api/roles";

const RoleSelector = ({ currentRole, onStatusChange }) => {
  const [selected, setSelected] = useState(currentRole ? currentRole : "");

  const handleChange = (event) => {
    setSelected(event.target.value);
    // emit event to parent
    onStatusChange(event.target.value);
  };

  return (
    <Select
      value={selected}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
    >
      {/* construct the menu items */}
      {Object.values(ROLES).map((role) => (
        <MenuItem key={role} value={role}>
          {capitalize(role)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoleSelector;
