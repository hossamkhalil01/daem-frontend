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
  TextField,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useHistory } from "react-router-dom";
import * as authService from "../services/authService";
import validate from "../utils/validations";

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
  submit: {
    marginTop: theme.spacing(5),
  },
  textField: {
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "30ch",
  },
  datePicker: {
    marginLeft: theme.spacing(3),
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
    gender: "male",
    confirmPassword: "",
    avatar: "",
    dob: "",
    diseases: "",
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
    dob: { err: false, msg: "" },
  });

  const checkRequriedFields = () => {
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

  const isFormValid = () => {
    for (const key in formValidations) {
      if (formValidations[key].err) return false;
    }
    return true;
  };

  const checkServerValidation = (msg) => {
    const errors = msg.split("User validation failed: ");

    const validationsObj = { ...formValidations };

    let errsArray = ["email: Email already exists"];

    if (errors[1]) errsArray = errors[1].split(", ");

    for (const e of errsArray) {
      Object.keys(formValidations).forEach((field) => {
        if (e.includes(field))
          validationsObj[field] = { err: true, msg: e.split(`${field}: `) };
      });
    }

    setFormValidations(validationsObj);
  };

  const handleChange = (prop, validationMethod) => (event) => {
    let err = false;
    let msg = "";

    if (validationMethod) {
      // call the method with password as param if the prop is confirm password
      const errorsArr =
        prop === "confirmPassword"
          ? validationMethod(formValues.password, event.target.value)
          : validationMethod(event.target.value);

      // set the errors if found
      if (errorsArr.length) {
        err = true;
        msg = errorsArr[0];
      }
    }

    // Set the states
    setFormValidations({
      ...formValidations,
      [prop]: { err, msg },
    });

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
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all the requried fields exists
    if (!checkRequriedFields()) return;

    // don't submit if there are errors
    if (!isFormValid()) return;

    const data = {
      email: formValues.email,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      password: formValues.password,
      gender: formValues.gender,
      DOB: formValues.dob,
      diseases: formValues.diseases,
    };

    // create form data
    const formData = new FormData();

    // append the data
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("avatar", formValues.avatar);

    // sumbit request to the backend
    try {
      await authService.register(formData);
      history.push("/");
    } catch (err) {
      // registeration validations
      const msg = err.response.data.message;
      checkServerValidation(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
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
                onChange={handleChange("firstname", validate.name)}
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
                onChange={handleChange("lastname", validate.name)}
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
                type="text"
                value={formValues.email}
                onChange={handleChange("email", validate.email)}
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
                onChange={handleChange("password", validate.password)}
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
                onChange={handleChange(
                  "confirmPassword",
                  validate.passwordsMatch
                )}
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
            <FormControl required>
              <TextField
                id="dob"
                onChange={handleChange("dob", validate.dateOfBirth)}
                label="Date of Birth *"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.datePicker}
              />
              <FormHelperText
                error={formValidations.dob.err}
                className={classes.datePicker}
              >
                {formValidations.dob.msg}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="diseases">Diseases</InputLabel>

            <FormControl fullWidth>
              <TextareaAutosize
                labelId="diseases"
                rowsMin={3}
                rowsMax={5}
                aria-label="maximum height"
                placeholder="Please describe any diseases you have that might be useful to know"
                value={formValues.diseases}
                onChange={handleChange("diseases")}
              />
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
          <Grid
            container
            direction="row"
            justify="center"
            className={classes.submit}
          >
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
