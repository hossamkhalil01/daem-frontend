import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  FormHelperText,
  InputLabel,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useHistory } from "react-router-dom";
import * as authService from "../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "30ch",
  },
}));

const Register = ({ setAuthenticated }) => {
  const classes = useStyles();
  const history = useHistory();

  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    confirmPassword: "",
    avatarFile: "",
    avatarFileName: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [formValidations, setFormValidations] = React.useState({
    email: { err: false, msg: "" },
    firstname: { err: false, msg: "" },
    lastname: { err: false, msg: "" },
    password: { err: false, msg: "" },
    confirmPassword: { err: false, msg: "" },
    gender: { err: false, msg: "" },
  });
  const [errorsExist, setErrorsExist] = React.useState(false);

  const checkServerValidation = (msg) => {
    const errors = msg.split("User validation failed: ");
    let emailErr = false;
    let emailMsg = "";
    let passErr = false;
    let passMsg = "";
    let firstnameErr = false;
    let firstnameMsg = "";
    let lastnameErr = false;
    let lastnameMsg = "";

    let errsArray = ["email: Email already exists"];

    if (errors[1]) errsArray = errors[1].split(", ");

    for (const e of errsArray) {
      if (e.includes("email")) {
        emailErr = true;
        emailMsg = e.split("email: ");
      }
      if (e.includes("password")) {
        passErr = true;
        passMsg = e.split("password: ");
      }
      if (e.includes("firstname")) {
        firstnameErr = true;
        firstnameMsg = e.split("firstname: ");
      }
      if (e.includes("lastname")) {
        lastnameErr = true;
        lastnameMsg = e.split("lastname: ");
      }
    }
    setFormValidations({
      ...formValidations,
      firstname: { err: firstnameErr, msg: firstnameMsg },
      lastname: { err: lastnameErr, msg: lastnameMsg },
      email: { err: emailErr, msg: emailMsg },
      password: { err: passErr, msg: passMsg },
    });
    setErrorsExist(true);
  };

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
    } else if (prop === "confirmPassword" || prop === "password") {
      if (formValues.password !== event.target.value) {
        setFormValidations({
          ...formValidations,
          password: { err: true, msg: "Passwords don't match." },
          confirmPassword: { err: true, msg: "" },
        });
        setErrorsExist(true);
      } else {
        setFormValidations({
          ...formValidations,
          password: { err: false, msg: "" },
          confirmPassword: { err: false, msg: "" },
        });
        setErrorsExist(false);
      }
    } else {
      setFormValidations({
        ...formValidations,
        [prop]: { err: false, msg: "" },
      });
      setErrorsExist(false);
    }
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormValues({ ...formValues, showPassword: !formValues.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setFormValues({
      ...formValues,
      showConfirmPassword: !formValues.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = (e) => {
    setFormValues({
      ...formValues,
      avatarFile: e.target.files[0],
      avatarFileName: e.target.files[0].name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // don't submit if there are errors
    if (errorsExist) return;

    const data = {
      email: formValues.email,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      password: formValues.password,
      gender: formValues.gender,
    };
    // sumbit request to the backend
    try {
      await authService.register(data);
      history.push("/");
    } catch (err) {
      // registeration validations
      const msg = err.response.data.message;
      checkServerValidation(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Paper style={{ padding: 16, maxWidth: 600 }} elevation={3}>
        <Grid container alignItems="flex-start" justify="center" spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="firstname" required>
                First Name
              </InputLabel>
              <Input
                id="firstname"
                type="text"
                value={formValues.firstname}
                onBlur={handleChange("firstname")}
                onChange={handleChange("firstname")}
                error={formValidations.firstname.err}
              />
            </FormControl>
            <FormHelperText error={formValidations.firstname.err}>
              {formValidations.firstname.msg}
            </FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="lastname" required>
                Last Name
              </InputLabel>
              <Input
                id="lastname"
                type="text"
                value={formValues.lastname}
                onChange={handleChange("lastname")}
                onBlur={handleChange("lastname")}
                error={formValidations.lastname.err}
              />
              <FormHelperText error={formValidations.lastname.err}>
                {formValidations.lastname.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email" required>
                Email address
              </InputLabel>
              <Input
                id="email"
                type="email"
                value={formValues.email}
                onChange={handleChange("email")}
                onBlur={handleChange("email")}
                error={formValidations.email.err}
              />
              <FormHelperText error={formValidations.email.err}>
                {formValidations.email.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                id="password"
                type={formValues.showPassword ? "text" : "password"}
                value={formValues.password}
                onChange={handleChange("password")}
                onBlur={handleChange("password")}
                error={formValidations.password.err}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {formValues.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formValidations.password.err}>
                {formValidations.password.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="confirm-password" required>
                Confirm Password
              </InputLabel>
              <Input
                id="confirm-password"
                type={formValues.showConfirmPassword ? "text" : "password"}
                value={formValues.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleChange("confirmPassword")}
                error={formValidations.confirmPassword.err}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {formValues.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formValidations.confirmPassword.err}>
                {formValidations.confirmPassword.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={formValues.gender}
                onChange={handleChange("gender")}
                onBlur={handleChange("gender")}
                error={formValidations.gender.err}
                className={classes.selectEmpty}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
              <FormHelperText error={formValidations.gender.err}>
                {formValidations.gender.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Button
                variant="contained"
                component="label"
                color="secondary"
                startIcon={<CloudUploadIcon />}
              >
                Profile Picture
                <input
                  accept="image/*"
                  id="avatar"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                  hidden
                />
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default Register;
