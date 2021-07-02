import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateTicketDoctor } from "../../services/ticketsService";

export default function SetState({ ticketId, ticketState }) {
  const { t } = useTranslation();
  const [state, setState] = useState(ticketState);

  const handleChange = async (event) => {
    await updateTicketDoctor(ticketId, { state: event.target.value });
    setState(event.target.value);
  };

  return (
    <FormControl style={{ width: 80 }}>
      <InputLabel>{t("state")}</InputLabel>
      <Select
        value={state || ""}
        onChange={handleChange}
        labelId="demo-simple-select-label"
        id={ticketId}
      >
        <MenuItem value={"unresolved"}>{t("unresolved")}</MenuItem>
        <MenuItem value={"resolved"}>{t("resolved")}</MenuItem>
        <MenuItem value={"expired"}>{t("expired")}</MenuItem>
      </Select>
    </FormControl>
  );
}
