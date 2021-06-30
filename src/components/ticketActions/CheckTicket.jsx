import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateTicketModerator } from "../../services/ticketsService";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckTicket({ ticketId, isChecked }) {
  const [check, setCheck] = useState(isChecked);
  const { t } = useTranslation();

  const handleChange = async (event) => {
    setCheck(event.target.checked);
    await updateTicketModerator(ticketId, { isChecked: event.target.checked });
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
      label={t("checked")}
    />
  );
}
