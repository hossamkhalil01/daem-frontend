import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import { updateUserRole } from "../services/adminService";
import capitalize from "../utils/capitalize";
import ROLES from "../api/roles";

const RoleSelector = ({ user, onError }) => {
  const [selected, setSelected] = useState(user.role);

  const handleChange = async (event) => {
    const newSelection = event.target.value;

    // send update request & update selection
    await updateUserRole(user._id, newSelection)
      .then((res) => setSelected(newSelection))
      .catch((err) => {
        onError(err);
      });
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
