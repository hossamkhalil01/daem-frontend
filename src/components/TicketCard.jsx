import { TextField } from "@material-ui/core";
import PrimeButton from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import "../styles/TicketCard.css";

export default function TicketCard({ ticket }) {
  const { t } = useTranslation();
  const doctors = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
  ];
  return (
    <div className="ticket-card">
      <div className="ticket__header">
        <h3>{ticket.subject}</h3>
        <p>
          <span>{t(ticket.gender)}</span>
          {" , "}
          <span>{ticket.age + " " + t("year")}</span>
        </p>
      </div>
      <div className="ticket__body">
        <p>{ticket.description}</p>
      </div>
      <hr />
      <div className="ticket__footer">
        <Autocomplete
          id="size-small-standard"
          size="medium"
          style={{ width: 200 }}
          options={doctors}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Assign Doctor" />
          )}
        />{" "}
        <FormControl style={{ width: 80 }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={10}>Low</MenuItem>
            <MenuItem value={20}>Medium</MenuItem>
            <MenuItem value={30}>High</MenuItem>
            <MenuItem value={30}>Critical</MenuItem>
          </Select>
        </FormControl>{" "}
        <PrimeButton variant="contained" color="secondary">
          Delete
        </PrimeButton>
      </div>
    </div>
  );
}
