import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api/urls";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import * as userService from "../services/userService";
import "../styles/UserProfile.css";
import validate from "../utils/validations";
import Alert from "@material-ui/lab/Alert";

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

export default function UserProfile() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const classes = useStyles();
  const [user, setUser] = useState(currentUser);
  const [success, setSuccess] = useState(false);

  const [imageSource, setImageSource] = useState(
    BASE_URL + "/" + currentUser.avatar
  );

  useEffect(() => {}, []);

  const [formValidations, setFormValidations] = useState({
    avatar: { err: false, msg: "" },
    firstname: { err: false, msg: "" },
    lastname: { err: false, msg: "" },
    // DOB: { err: false, msg: "" },
    diseases: { err: false, msg: "" },
  });

  const [updatable, setUpdatable] = useState(false);

  const checkRequiredFields = () => {
    let hasErrors = false;
    let errors = [];
    const validationsObj = { ...formValidations };

    Object.keys(formValidations).forEach((field) => {
      if (field !== "avatar") {
        errors = validate.required(user[field]);
      }

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
    const errors = [""];

    if (msg.includes("User validation failed: ")) {
      const dbValidationErrors = msg.split("User validation failed: ");
      dbValidationErrors.forEach((element) => {
        errors.push(element);
      });
    } else {
      errors[0] = msg;
    }

    const validationsObj = { ...formValidations };

    let errsArray = [];

    if (errors[1]) errsArray = errors[1].split(", ");

    for (const e of errsArray) {
      Object.keys(formValidations).forEach((field) => {
        if (e.includes(field))
          validationsObj[field] = { err: true, msg: e.split(`${field}: `) };
      });
    }
    if (errors[0].length > 0) {
      validationsObj["avatar"] = { err: true, msg: errors[0] };
    }

    setFormValidations(validationsObj);
  };

  const handleUploadClick = (event) => {
    setUser({
      ...user,
      avatar: event.target.files[0],
    });
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageSource(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    formValidations.avatar = { err: false, msg: "" };
  };

  const handleChange = (prop, validationMethod) => (event) => {
    let err = false;
    let msg = "";

    if (validationMethod) {
      // call the method with password as param if the prop is confirm password
      const errorsArr = validationMethod(event.target.value);

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

    setUser({ ...user, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all the required fields exists
    if (!checkRequiredFields()) return;

    // don't submit if there are errors
    if (!isFormValid()) return;

    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      // DOB: user.DOB,
      diseases: user.diseases,
    };

    // create form data
    const formData = new FormData();

    // append the data
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("avatar", user.avatar);

    // submit request to the backend
    try {
      const {
        data: { data },
      } = await userService.updateUser(formData);
      setCurrentUser(data);
      setSuccess(true);
    } catch (err) {
      // registration validations
      const msg = err.response.data.message;
      checkServerValidation(msg);
      setSuccess(false);
    }
  };

  return (
    <>
      {success ? (
        <Alert severity="success" className="w-25">
          Profile Updated Successfully
        </Alert>
      ) : null}

      <div className="main-content">
        <div className="container mt-7">
          <div className="row">
            <div className="col-xl-8 m-auto order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <img
                        src={imageSource}
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Link to="/home" className="btn btn-sm btn-info mr-4">
                      Back To Home
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats mt-md-5">
                        <div className="lead">{user.email}</div>
                        {/* <div className="text-muted">{user.email}</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div>switch on to update profile data</div>
                    <Switch
                      checked={updatable}
                      onChange={() => {
                        setUpdatable(!updatable);
                      }}
                      name="checkedA"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    <form
                      onSubmit={handleSubmit}
                      className="row justify-content-center"
                    >
                      <Paper
                        style={{ padding: 16, maxWidth: 600 }}
                        elevation={3}
                      >
                        <Grid
                          container
                          // alignItems="flex-start"
                          justify="center"
                          spacing={2}
                        >
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <InputLabel htmlFor="firstname" required>
                                First Name
                              </InputLabel>
                              <Input
                                id="firstname"
                                type="text"
                                value={user.firstname}
                                onChange={handleChange(
                                  "firstname",
                                  validate.name
                                )}
                                error={formValidations.firstname.err}
                                readOnly={!updatable}
                                disableUnderline={!updatable}
                              />
                            </FormControl>
                            <FormHelperText
                              error={formValidations.firstname.err}
                            >
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
                                value={user.lastname}
                                onChange={handleChange(
                                  "lastname",
                                  validate.name
                                )}
                                error={formValidations.lastname.err}
                                readOnly={!updatable}
                                disableUnderline={!updatable}
                              />
                              <FormHelperText
                                error={formValidations.lastname.err}
                              >
                                {formValidations.lastname.msg}
                              </FormHelperText>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <InputLabel htmlFor="diseases">Diseases</InputLabel>
                            <FormControl fullWidth>
                              <TextareaAutosize
                                //   labelId="diseases"
                                rowsMin={3}
                                rowsMax={5}
                                aria-label="maximum height"
                                placeholder="Please describe any diseases you have that might be useful to know"
                                value={user.diseases}
                                onChange={handleChange("diseases")}
                                disabled={!updatable}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Button
                                variant="contained"
                                component="label"
                                color="secondary"
                                disabled={!updatable}
                                startIcon={<CloudUploadIcon />}
                              >
                                Profile Picture
                                <input
                                  accept="image/*"
                                  id="avatar"
                                  type="file"
                                  onChange={handleUploadClick}
                                  disabled={!updatable}
                                  hidden
                                />
                              </Button>
                            </FormControl>
                            <FormHelperText error={formValidations.avatar.err}>
                              {formValidations.avatar.msg}
                            </FormHelperText>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            className={classes.submit}
                          >
                            {updatable ? (
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Done
                              </Button>
                            ) : null}
                          </Grid>
                        </Grid>
                      </Paper>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
