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
    gender: "",
    confirmPassword: "",
    avatar: "",
    dob: null,
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
    let genderErr = false;
    let genderMsg = "";
    let dobMsg = "";
    let dobErr = false;

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
      if (e.includes("gender")) {
        genderErr = true;
        genderMsg = e.split("gender: ");
      }
    }
    setFormValidations({
      ...formValidations,
      firstname: { err: firstnameErr, msg: firstnameMsg },
      lastname: { err: lastnameErr, msg: lastnameMsg },
      email: { err: emailErr, msg: emailMsg },
      password: { err: passErr, msg: passMsg },
      gender: { err: genderErr, msg: genderMsg },
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
      avatar: e.target.files[0],
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
                onChange={handleChange("dob")}
                label="Date of Birth *"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.datePicker}
              />
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
