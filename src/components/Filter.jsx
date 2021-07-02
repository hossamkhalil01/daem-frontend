import {
  Button,
  FormControl, FormHelperText, Grid,
  Input,
  InputLabel,
  Paper,
  Select
} from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export const Filter = ({ filter, setFilter, onUpdateFilteredState }) => {
  const [formValidations, setFormValidations] = useState({
    from: { err: false, msg: "" },
    to: { err: false, msg: "" },
  });
  const [errorsExist, setErrorsExist] = useState(false);
  const {t}=useTranslation();
  
  const handleChange = (prop) => (event) => {
    setFormValidations({
      ...formValidations,
      [prop]: { err: false, msg: "" },
    });
    setErrorsExist(false);
    if (prop === "from" || prop === "to") {
      const date = new Date(event.target.value).getTime();
      if (Date.now() < date - 10000000) {
        setFormValidations({
          ...formValidations,
          [prop]: {
            err: true,
            msg: `${prop} cannot be greater then Today`,
          },
        });
        setErrorsExist(true);
      }
    }
    const startDate = new Date(filter.from).getTime();
    const endDate = new Date(filter.to).getTime();

    if (startDate > endDate) {
      setFormValidations({
        ...formValidations,
        [prop]: {
          err: true,
          msg: "Start Date cannot be greater then End Date",
        },
      });
      setErrorsExist(true);
    }
    setFilter({ ...filter, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorsExist) {
      onUpdateFilteredState((filtered) => !filtered);
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
          alignContent="space-s"
          justify="space-around"
        >
          <Grid item xs={3}>
            <FormControl>
              <InputLabel htmlFor="dateFrom" shrink={true}>{t("from")}</InputLabel>
              <Input
                id="dateFrom"
                type="date"
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
              <InputLabel htmlFor="dateTo" shrink={true}>{t("to")}</InputLabel>
              <Input
                id="dateTo"
                type="date"
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
            <InputLabel htmlFor="state">{t("state")}</InputLabel>
            <Select
              native
              id="state"
              value={filter.state}
              onChange={(e) => setFilter({ ...filter, state: e.target.value })}
            >
              <option></option>
              <option value={"unresolved"}>{t("unresolved")}</option>
              <option value={"resolved"}>{t("resolved")}</option>
              <option value={"expired"}>{t("expired")}</option>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth className="mt-2 mr-3">
              <Button variant="contained" color="default" type="submit">
              {t("search")}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
