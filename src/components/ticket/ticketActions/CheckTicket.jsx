import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { useState } from "react";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckTicket({ ticketId }) {
  const [check, setCheck] = useState(false);

  const handleChange = (event) => {
    setCheck(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <GreenCheckbox
          checked={check}
          onChange={handleChange}
          name="checkedG"
        />
      }
      label="Checked"
    />
  );
}
