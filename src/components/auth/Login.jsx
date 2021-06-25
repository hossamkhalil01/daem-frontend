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
import { useHistory } from "react-router-dom";
import * as authService from "../../services/authService";
import validate from "../../utils/validations";

const Login = () => {
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [formValidations, setFormValidations] = useState({
    email: { err: false, msg: "" },
    password: { err: false, msg: "" },
  });

  const isValidForm = () => {
    const { email, password } = formValidations;

    return !email.err && !password.err;
  };

  const checkRequiredFields = () => {
    let hasErrors = false;
    let errors = [];
    const validationsObj = { ...formValidations };

    Object.keys(formValidations).forEach((field) => {
      errors = validate.required(formValues[field]);

      if (errors.length) {
        hasErrors = true;

        // Set the errors
        validationsObj[field] = { err: true, msg: errors[0] };
      }
    });

    setFormValidations(validationsObj);

    return !hasErrors;
  };

  const handleChange = (prop, validationMethod) => (event) => {
    let err = false;
    let msg = "";

    const errorsArr = validationMethod(event.target.value);

    // set the errors if found
    if (errorsArr.length) {
      err = true;
      msg = errorsArr[0];
    }
    // Set the states
    setFormValidations({
      ...formValidations,
      [prop]: { err, msg },
    });

    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkRequiredFields()) return;
    if (!isValidForm()) return;

    const data = {
      email: formValues.email,
      password: formValues.password,
    };

    // sumbit request to the backend
    try {
      await authService.login(data);
      history.push("/");
    } catch (err) {
      // invalid login credientials
      setFormValidations({
        ...formValidations,
        email: { err: true, msg: "Invalid email or password." },
        password: { err: true, msg: "" },
      });
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
                onChange={handleChange("email", validate.email)}
                error={formValidations.email.err}
                autoComplete="username"
                type="text"
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
                onChange={handleChange("password", validate.password)}
                error={formValidations.password.err}
                autoComplete="current-password"
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

export default Login;
