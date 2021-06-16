import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";

export default function AssignDoctor({ doctors,ticketId }) {
  const { t } = useTranslation();
  return (
    <Autocomplete
      id="size-small-standard"
      size="medium"
      style={{ width: 200 }}
      options={doctors}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={t("assign-doctor")} />
      )}
    />
  );
}
