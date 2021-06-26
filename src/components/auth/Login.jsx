import { FormHelperText } from "@material-ui/core";
import "../../styles/Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as authService from "../../services/authService";
import validate from "../../utils/validations";
import { NavLink } from "react-router-dom";

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
    <div className="container-fluid w-75 mb-2 mt-5">
      <div className="row no-gutter">
        <img
          className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
          src="/assets/images/auth/auth-cover.jpg"
          alt="login-img"
        />
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Welcome back!</h3>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputEmail"
                        value={formValues.email}
                        onChange={handleChange("email", validate.email)}
                        className={
                          formValidations.email.err
                            ? "form-control error"
                            : "form-control "
                        }
                        autoComplete="username"
                        placeholder="Email*"
                        autofocus
                      />
                      <label for="inputEmail">Email *</label>
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
                      <label for="inputPassword">Password *</label>
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
                      <label
                        className="custom-control-label"
                        for="customCheck1"
                      >
                        Remember password
                      </label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <div className="text-center">
                      New to Daem?
                      <NavLink to="/register" exact>
                        Sign up
                      </NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
