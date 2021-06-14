import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
} from "@material-ui/core";

export const Login = () => {
  return (
    <form encType="multipart/form-data" className="mt-5">
      <Paper style={{ padding: 16, maxWidth: 600 }} elevation={3}>
        <Grid
          container
          alignItems="baseline"
          alignContent="space-around"
          justify="space-around"
        >
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email" required>
                Email address
              </InputLabel>
              <Input id="email" type="email" required />
              <FormHelperText>asdsa</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input id="password" required />
              <FormHelperText>password</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className="mt-2">
              <Button variant="contained" color="primary" type="submit">
                Sign In
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
