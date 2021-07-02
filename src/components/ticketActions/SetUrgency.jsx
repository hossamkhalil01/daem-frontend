import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateTicketDoctor } from "../../services/ticketsService";

export default function SetUrgency({ ticketId, ticketUrgency }) {
  const { t } = useTranslation();
  const [urgency, setUrgency] = useState(ticketUrgency);

  const handleChange = async (event) => {
    await updateTicketDoctor(ticketId, { urgency: event.target.value });
    setUrgency(event.target.value);
  };

  return (
    <FormControl style={{ width: 80 }}>
      <InputLabel>{t("urgency")}</InputLabel>
      <Select
        value={urgency || ""}
        onChange={handleChange}
        labelId="demo-simple-select-label"
        id={ticketId}
      >
        <MenuItem value={0}>{t("low")}</MenuItem>
        <MenuItem value={1}>{t("medium")}</MenuItem>
        <MenuItem value={2}>{t("high")}</MenuItem>
        <MenuItem value={3}>{t("critical")}</MenuItem>
      </Select>
    </FormControl>
  );
}
