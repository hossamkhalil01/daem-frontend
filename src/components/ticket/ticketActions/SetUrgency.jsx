import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useTranslation } from "react-i18next";

export default function SetUrgency({ ticketId }) {
  const { t } = useTranslation();

  return (
    <FormControl style={{ width: 80 }}>
      <InputLabel id="demo-simple-select-label">{t("urgency")}</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select">
        <MenuItem value={0}>{t("low")}</MenuItem>
        <MenuItem value={1}>{t("medium")}</MenuItem>
        <MenuItem value={2}>{t("high")}</MenuItem>
        <MenuItem value={3}>{t("critical")}</MenuItem>
      </Select>
    </FormControl>
  );
}
