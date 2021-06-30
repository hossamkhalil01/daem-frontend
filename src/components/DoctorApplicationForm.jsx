import { FormHelperText } from "@material-ui/core";
import { useState, useEffect } from "react";
import validate from "../utils/validations";
import * as services from "../services/doctorApplicationsService";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const requriedFields = ["speciality"];

const DoctorApplicationForm = () => {
  const { currentUser } = useCurrentUser();
  const [specialitiesList, setSpecialitiesList] = useState([]);

  const [formValues, setFormValues] = useState({
    speciality: "",
    about: "",
  });

  const [formValidations, setFormValidations] = useState({
    speciality: { err: false, msg: "" },
    about: { err: false, msg: "" },
  });

  useEffect(() => {
    const getAllSpecialities = async () => {
      const {
        data: { data },
      } = await services.getSpecialities();
      setSpecialitiesList(data);
    };

    getAllSpecialities();
  }, []);

  const isValidForm = () => {
    const { speciality, about } = formValidations;

    return !speciality.err && !about.err;
  };

  const checkRequiredFields = () => {
    let hasErrors = false;
    let errors = [];
    const validationsObj = { ...formValidations };

    requriedFields.forEach((field) => {
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

  const checkServerValidation = (msg) => {
    const errors = msg.split("DoctorApplication validation failed: ");

    const validationsObj = { ...formValidations };

    let errsArray = [];

    if (errors) errsArray = errors[1].split(", ");

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

    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkRequiredFields()) return;
    if (!isValidForm()) return;

    const data = {
      speciality: formValues.speciality,
      about: formValues.about,
    };

    // create form data
    const formData = new FormData();

    // append the data
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // sumbit request to the backend
    try {
      services.createApplication(formData);
    } catch (err) {
      // invalid data
      const msg = err.response.data.message;
      checkServerValidation(msg);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="appoinment-wrap mt-5 mt-lg-0 pl-lg-5">
            <h2 className="mb-2 title-color">Book an appoinment</h2>
            <p className="mb-4">
              Mollitia dicta commodi est recusandae iste, natus eum asperiores
              corrupti qui velit . Iste dolorum atque similique praesentium
              soluta.
            </p>
            <form
              onSubmit={handleSubmit}
              className="appoinment-form"
              encType="multipart/form-data"
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <select
                      id="speciality"
                      value={formValues.speciality}
                      className={
                        formValidations.speciality.err
                          ? "form-control error"
                          : "form-control"
                      }
                      onChange={handleChange("speciality")}
                    >
                      <option value="" disabled>
                        Speciality *
                      </option>
                      {specialitiesList.map((speciality, indx) => {
                        return (
                          <option key={indx} value={speciality}>
                            {speciality}
                          </option>
                        );
                      })}
                    </select>
                    <FormHelperText error={formValidations.speciality.err}>
                      {formValidations.speciality.msg}
                    </FormHelperText>
                  </div>
                </div>
              </div>
              <div className="form-group-2 mb-4">
                <textarea
                  name="about"
                  id="about"
                  className="form-control"
                  rows="6"
                  placeholder="Tell us in brief about you, your career and your professional experience."
                  value={formValues.about}
                  onChange={handleChange("about", validate.aboutSection)}
                ></textarea>
                <FormHelperText error={formValidations.about.err}>
                  {formValidations.about.msg}
                </FormHelperText>
              </div>

              <button className="btn btn-main btn-round-full" type="submit">
                Submit<i className="icofont-simple-right ml-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorApplicationForm;
