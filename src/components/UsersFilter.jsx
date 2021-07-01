import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Select
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const UserFilter = ({ filter, setFilter, onUpdateFilterdState }) => {
  const {t} = useTranslation();
  const handleChange = (prop) => (event) => {
    if (!event.target.value) return setFilter({ ...filter, [prop]: null });
    setFilter({ ...filter, [prop]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateFilterdState((filterd) => !filterd);
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
              <InputLabel htmlFor="name">{t("name")}</InputLabel>
              <Input
                id="name"
                type="text"
                value={filter.name}
                onChange={handleChange("name")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="state">{t("role")}</InputLabel>
            <Select
              native
              id="state"
              value={filter.role}
              onChange={handleChange("role")}
            >
              <option selected></option>
              <option value={"moderator"}>{t("moderator")}</option>
              <option value={"doctor"}>{t("doctor")}</option>
              <option value={"user"}>{t("user")}</option>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth className="mt-2">
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
