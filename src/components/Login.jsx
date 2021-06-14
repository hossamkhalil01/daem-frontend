import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
} from "@material-ui/core";
import { useState } from "react";

export const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [formValidations, setFormValidations] = useState({
    email: { err: false, msg: "" },
    password: { err: false, msg: "" },
  });
  const [errorsExist, setErrorsExist] = useState(false);

  const handleChange = (prop) => (event) => {
    if (!event.target.value) {
      setFormValidations({
        ...formValidations,
        [prop]: { err: true, msg: "This field is required" },
      });
      setErrorsExist(true);
    } else if (prop === "email") {
      if (
        !event.target.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setFormValidations({
          ...formValidations,
          email: { err: true, msg: "Please enter a valid email." },
        });
        setErrorsExist(true);
      } else {
        setFormValidations({
          ...formValidations,
          email: { err: false, msg: "" },
        });
        setErrorsExist(false);
      }
    } else {
      if (event.target.value.length < 8) {
        setFormValidations({
          ...formValidations,
          [prop]: { err: true, msg: "Password must be at least 8 characters" },
        });
        setErrorsExist(true);
      } else {
        setFormValidations({
          ...formValidations,
          [prop]: { err: false, msg: "" },
        });
        setErrorsExist(false);
      }
    }
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errorsExist) {
      const data = {
        email: formValues.email,
        password: formValues.password,
      };
      console.log(data);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-5"
    >
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
              <Input
                id="email"
                value={formValues.email}
                onBlur={handleChange("email")}
                onChange={handleChange("email")}
                error={formValidations.email.err}
                autoComplete="username"
                type="email"
                required
              />

              <FormHelperText error={formValidations.email.err}>
                {formValidations.email.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                id="password"
                type="password"
                onBlur={handleChange("password")}
                onChange={handleChange("password")}
                error={formValidations.password.err}
                autoComplete="current-password"
                required
              />

              <FormHelperText error={formValidations.password.err}>
                {formValidations.password.msg}
              </FormHelperText>
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
