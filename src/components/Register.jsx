import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import React from "react";

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

  const handleChange = (prop) => (event) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: formValues.email,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      password: formValues.password,
      gender: formValues.gender,
    };
    axios.post("http://127.0.0.1:8000/auth/register", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
      <Paper style={{ padding: 16, maxWidth: 600 }} elevation={3}>
        <Grid container alignItems="flex-start" justify="center" spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="firstname" required>
                First Name
              </InputLabel>
              <Input
                id="firstname"
                value={formValues.firstname}
                onChange={handleChange("firstname")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="lastname" required>
                Last Name
              </InputLabel>
              <Input
                id="lastname"
                value={formValues.lastname}
                onChange={handleChange("lastname")}
              />
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
              />
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
                className={classes.selectEmpty}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
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
