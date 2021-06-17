import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AssignDoctor({ doctors, ticketId, ticketDoctor }) {
  const { t } = useTranslation();
  const [doctor, setDoctor] = useState(ticketDoctor);

  const handleChange = async (event, newValue) => {
    console.log(newValue);
  };

  return (
    <Autocomplete
      id={ticketId}
      size="medium"
      style={{ width: 200 }}
      options={doctors}
      onChange={handleChange}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={t("assign-doctor")} />
      )}
    />
  );
}
