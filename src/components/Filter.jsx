import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { useState } from "react";

export const Filter = () => {
  const [filter, setFilter] = useState({
    from: "",
    to: "",
    state: "opened",
  });
  const [formValidations, setFormValidations] = useState({
    from: { err: false, msg: "" },
    to: { err: false, msg: "" },
  });
  const [errorsExist, setErrorsExist] = useState(false);

  const handleChange = (prop) => (event) => {
    const startDate = new Date(filter.from).getTime();
    const endDate = new Date(filter.to).getTime();
    setFormValidations({
      ...formValidations,
      [prop]: { err: false, msg: "" },
    });
    setErrorsExist(false);
    if (!event.target.value) {
      setFormValidations({
        ...formValidations,
        [prop]: { err: true, msg: "This field is required" },
      });
      setErrorsExist(true);
    } else if (startDate > endDate) {
      setFormValidations({
        ...formValidations,
        [prop]: {
          err: true,
          msg: "Start Date cannot be greater then End Date",
        },
      });
      setErrorsExist(true);
    } else if (Date.now() < startDate - 10000000) {
      setFormValidations({
        ...formValidations,
        [prop]: {
          err: true,
          msg: "Start Date cannot be greater then Today",
        },
      });
      setErrorsExist(true);
    } else if (Date.now() < endDate - 10000000) {
      setFormValidations({
        ...formValidations,
        [prop]: {
          err: true,
          msg: "End Date cannot be greater then Today",
        },
      });
      setErrorsExist(true);
    }
    setFilter({ ...filter, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorsExist) {
      // console.log("filter data = ", filter);
    }
  };
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <Paper
        style={{ padding: 16, maxWidth: 900, margin: "auto" }}
        elevation={3}
      >
        <Grid
          container
          alignItems="baseline"
          alignContent="space-around"
          justify="space-around"
        >
          <Grid item xs={3}>
            <FormControl>
              <InputLabel htmlFor="dateFrom">From</InputLabel>
              <Input
                id="dateFrom"
                type="date"
                required
                value={filter.from}
                onChange={handleChange("from")}
                onBlur={handleChange("from")}
              />
              <FormHelperText error={formValidations.from.err}>
                {formValidations.from.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <InputLabel htmlFor="dateTo">To</InputLabel>
              <Input
                id="dateTo"
                type="date"
                required
                value={filter.to}
                onChange={handleChange("to")}
                onBlur={handleChange("to")}
              />
              <FormHelperText error={formValidations.to.err}>
                {formValidations.to.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="state">State</InputLabel>
            <Select
              native
              id="state"
              value={filter.state}
              onChange={(e) => setFilter({ ...filter, state: e.target.value })}
            >
              <option value={"opened"}>Opened</option>
              <option value={"pinding"}>Pinding</option>
              <option value={"closed"}>Closed</option>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth className="mt-2">
              <Button variant="contained" color="default" type="submit">
                Search
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
