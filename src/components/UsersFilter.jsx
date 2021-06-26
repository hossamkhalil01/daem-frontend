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

export const UserFilter = ({ filter, setFilter, onUpdateFilterdState }) => {
  const handleChange = (prop) => (event) => {
    if (!event.target.value) return setFilter({ ...filter, [prop]: null });
    setFilter({ ...filter, [prop]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateFilterdState((filterd) => !filterd);
    console.log(filter);
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
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                type="text"
                value={filter.name}
                onChange={handleChange("name")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="state">Role</InputLabel>
            <Select
              native
              id="state"
              value={filter.role}
              onChange={handleChange("role")}
            >
              <option selected></option>
              <option value={"moderator"}>Moderator</option>
              <option value={"doctor"}>Doctor</option>
              <option value={"user"}>User</option>
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
