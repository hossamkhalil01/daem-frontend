import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { DoctorsContext } from "../../contexts/doctorsContext";
import {
  removeTicketDoctor,
  updateTicket
} from "../../services/ticketsService";

export default function AssignDoctor({ ticketId, ticketDoctor }) {
  const { t } = useTranslation();
  const clearField = { _id: "", firstname: "", lastname: "" };
  const [doctor, setDoctor] = useState(ticketDoctor || clearField);
  const doctors = useContext(DoctorsContext);

  const handleChange = async (event, newValue) => {
    if (newValue) {
      setDoctor(newValue);
      await updateTicket(ticketId, { doctor: newValue._id });
    } else {
      setDoctor(clearField);
      await removeTicketDoctor(ticketId);
    }
  };

  return (
    <Autocomplete
      value={doctor || clearField}
      id={ticketId}
      size="medium"
      style={{ width: 200 }}
      options={doctors}
      onChange={handleChange}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      getOptionSelected={(option, value) => option._id === value._id}
      renderInput={(params) => (
        <TextField
          value={doctor}
          {...params}
          variant="standard"
          label={t("assign-doctor")}
        />
      )}
    />
  );
}
