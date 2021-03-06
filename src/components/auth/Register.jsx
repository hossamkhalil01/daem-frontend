import { FormHelperText } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import * as authService from "../../services/authService";
import socket from "../../socketConfig";
import validate from "../../utils/validations";

const Register = ({ setAuthenticated }) => {
  const history = useHistory();
  const {t} = useTranslation();

  const { setCurrentUser } = useCurrentUser();
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    confirmPassword: "",
    dob: "",
    diseases: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all the required fields exists
    if (!checkRequiredFields()) return;

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

    // submit request to the backend
    try {
      await authService.register(formData);
      const user = await authService.login(data);
      setCurrentUser(user);
      // socket.emit("authenticated");
      history.push("/");
    } catch (err) {
      // registration validations
      const msg = err.response.data.message;
      checkServerValidation(msg);
    }
  };

  return (
    <>
      <h3 className="login-heading mb-4 text-center">{t("register")}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-label-group">
          <input
            type="text"
            id="firstname"
            value={formValues.firstname}
            onChange={handleChange("firstname", validate.name)}
            className={
              formValidations.firstname.err
                ? "form-control error"
                : "form-control "
            }
            placeholder="First Name*"
            autoFocus
          />
          <label htmlFor="firstname">{t("first-name")} *</label>
          <FormHelperText error={formValidations.firstname.err}>
            {formValidations.firstname.msg}
          </FormHelperText>
        </div>
        <div className="form-label-group">
          <input
            type="text"
            id="lastname"
            value={formValues.lastname}
            onChange={handleChange("lastname", validate.name)}
            className={
              formValidations.lastname.err
                ? "form-control error"
                : "form-control "
            }
            placeholder="Last Name*"
          />
          <label htmlFor="lastname">{t("last-name")} *</label>
          <FormHelperText error={formValidations.lastname.err}>
            {formValidations.lastname.msg}
          </FormHelperText>
        </div>

        <div className="form-label-group">
          <input
            type="text"
            id="email"
            value={formValues.email}
            onChange={handleChange("email", validate.email)}
            className={
              formValidations.email.err ? "form-control error" : "form-control "
            }
            autoComplete="username"
            placeholder="Email*"
          />
          <label htmlFor="email">{t("email")} *</label>
          <FormHelperText error={formValidations.email.err}>
            {formValidations.email.msg}
          </FormHelperText>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="password"
            className={
              formValidations.password.err
                ? "form-control error"
                : "form-control "
            }
            placeholder="Password*"
            onChange={handleChange("password", validate.password)}
            value={formValues.password}
            autoComplete="current-password"
          />
          <label htmlFor="password">{t("password")} *</label>
          <FormHelperText error={formValidations.password.err}>
            {formValidations.password.msg}
          </FormHelperText>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="confirm-password"
            className={
              formValidations.confirmPassword.err
                ? "form-control error"
                : "form-control "
            }
            placeholder="Confirm Password*"
            onChange={handleChange("confirmPassword", validate.passwordsMatch)}
            value={formValues.confirmPassword}
            autoComplete="current-password"
          />
          <label htmlFor="confirm-password">{t("confirm-password")} *</label>
          <FormHelperText error={formValidations.confirmPassword.err}>
            {formValidations.confirmPassword.msg}
          </FormHelperText>
        </div>

        <div className="row justify-content-around">
          <div className="form-label-group col-md-12 col-lg-6">
            <select
              id="gender"
              value={formValues.gender}
              className={
                formValidations.gender.err
                  ? "form-control error"
                  : "form-control"
              }
              onChange={handleChange("gender")}
            >
              <option value="" disabled>
              {t("gender")} *
              </option>
              <option value="male">{t("male")}</option>
              <option value="female">{t("female")}</option>
            </select>
            <FormHelperText error={formValidations.gender.err}>
              {formValidations.gender.msg}
            </FormHelperText>
          </div>
          <div className="form-label-group col-md-12 col-lg-6">
            <input
              type="date"
              id="dob"
              onChange={handleChange("dob", validate.dateOfBirth)}
              className={
                formValidations.dob.err ? "form-control error" : "form-control"
              }
            />
            <label htmlFor="dob ">{t("date-of-birth")} *</label>

            <FormHelperText error={formValidations.dob.err}>
              {formValidations.dob.msg}
            </FormHelperText>
          </div>
        </div>

        <div className="form-label-group row justify-content-center">
          <textarea
            id="diseases"
            name="diseases"
            rows="3"
            placeholder={t("diseases-placeholder")}
            value={formValues.diseases}
            onChange={handleChange("diseases")}
          />
        </div>

        <button
          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
          type="submit"
        >
          {t("register")}
        </button>
        <div className="text-center">
        {t("already-has-account")}
          <NavLink to="/login" exact>
            {" "}
            {t("login")}
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default Register;
