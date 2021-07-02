import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { DoctorsContext } from "../../contexts/doctorsContext";
import {
  removeTicketDoctor,
  updateTicketDoctor
} from "../../services/ticketsService";

export default function AssignDoctor({ ticketId, ticketDoctor }) {
  const { t } = useTranslation();
  const clearField = { _id: "", firstname: "", lastname: "" };
  const [doctor, setDoctor] = useState(ticketDoctor || clearField);
  const doctors = useContext(DoctorsContext);

  const handleChange = async (event, newValue) => {
    if (newValue) {
      setDoctor(newValue);
      await updateTicketDoctor(ticketId, { doctor: newValue._id });
    } else {
      setDoctor(clearField);
      await removeTicketDoctor(ticketId);
    }
  };
  const change = async (event) => {
    console.log(event.target.value);
  };

  return (
    <>
    <Autocomplete
      className="ticket-doctor"
      value={doctor || null}
      id={ticketId}
      size="medium"
      style={{ width: 200 }}
      options={[clearField,...doctors]}
      onChange={handleChange}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      getOptionSelected={(option, value) => option._id === value._id}
      renderInput={(params) => (
        <TextField
        onChange = {change}
          value={doctor}
          {...params}
          variant="standard"
          label={t("assign-doctor")}
        />
      )}
    />
    </>
  );
}
