import { FormHelperText } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import * as authService from "../../services/authService";
import validate from "../../utils/validations";

const Login = () => {
  const history = useHistory();
  const { setCurrentUser } = useCurrentUser();
  const {t} = useTranslation();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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
      const user = await authService.login(data);
      setCurrentUser(user);
      // socket.emit("authenticated",user._id);
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
    <>
      <h3 className="login-heading mb-4 text-center">{t("welcome-back")}</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-label-group">
          <input
            type="text"
            id="inputEmail"
            value={formValues.email}
            onChange={handleChange("email", validate.email)}
            className={
              formValidations.email.err ? "form-control error" : "form-control "
            }
            autoComplete="username"
            placeholder="Email*"
            autoFocus
          />
          <label htmlFor="inputEmail">{t("email")} *</label>
          <FormHelperText error={formValidations.email.err}>
            {formValidations.email.msg}
          </FormHelperText>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
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
          <label htmlFor="inputPassword">{t("password")} *</label>
          <FormHelperText error={formValidations.password.err}>
            {formValidations.password.msg}
          </FormHelperText>
        </div>

        <div className="custom-control custom-checkbox mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            {t("remember-password")}
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
          type="submit"
        >
          {t("login")}
        </button>
        <div className="text-center">
        {t("new-to-daem")}
          <NavLink to="/register" exact>
            {" "}
            {t("register")}
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default Login;
