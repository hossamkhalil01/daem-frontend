import { FormHelperText } from "@material-ui/core";
import { useState, useEffect } from "react";
import validate from "../utils/validations";
import * as services from "../services/doctorApplicationsService";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const requriedFields = ["speciality", "nationalId", "doctorId"];

const DoctorApplicationForm = () => {
  const { currentUser } = useCurrentUser();
  const [specialitiesList, setSpecialitiesList] = useState([]);
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    speciality: "",
    about: "",
    nationalId: null,
    doctorId: null,
  });

  const [formValidations, setFormValidations] = useState({
    speciality: { err: false, msg: "" },
    about: { err: false, msg: "" },
    nationalId: { err: false, msg: "" },
    doctorId: { err: false, msg: "" },
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

  const handleImageChange = (prop, validationMethod) => (event) => {
    const value = event.target.files[0];
    // set value and validate
    handleChange({ prop, value, validationMethod });
  };

  const handleFieldChange = (prop, validationMethod) => (event) => {
    const value = event.target.value;
    // set value and validate
    handleChange({ prop, value, validationMethod });
  };

  const handleChange = ({ prop, value, validationMethod }) => {
    let err = false;
    let msg = "";

    if (validationMethod) {
      const errorsArr = validationMethod(value);
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

    setFormValues({ ...formValues, [prop]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkRequiredFields()) return;
    if (!isValidForm()) return;

    // create form data
    const formData = new FormData();

    // append the data
    Object.keys(formValues).forEach((key) => {
      if (key === "nationalId" || key === "doctorId")
        formData.append("images", formValues[key]);
      else formData.append(key, formValues[key]);
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
            <h2 className="mb-2 title-color">{t("become-doctor-title")}</h2>
            <p className=" mt-5 ">{t("become-doctor-form-header1")} </p>
            <p className="mb-4 ">{t("become-doctor-form-header2")} </p>

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
                      onChange={handleFieldChange("speciality")}
                    >
                      <option value="" disabled>
                        {t("speciality")} *
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
                  placeholder={t("become-doctor-form-about")}
                  value={formValues.about}
                  onChange={handleFieldChange("about", validate.aboutSection)}
                ></textarea>
                <FormHelperText error={formValidations.about.err}>
                  {formValidations.about.msg}
                </FormHelperText>
              </div>
              <div className="row">
                <div class="col-lg-6">
                  <label htmlFor="nationalId" className="text-muted">
                    {t("become-doctor-form-nationalId")}
                  </label>
                  <div class="form-group">
                    <input
                      accept="image/*"
                      id="nationalId"
                      name="nationalId"
                      type="file"
                      class="form-control"
                      onChange={handleImageChange("nationalId")}
                    />
                    <FormHelperText error={formValidations.nationalId.err}>
                      {formValidations.nationalId.msg}
                    </FormHelperText>
                  </div>
                </div>
                <div class="col-lg-6">
                  <label htmlFor="doctorId" className="text-muted">
                    {t("become-doctor-form-doctorId")}
                  </label>
                  <div class="form-group">
                    <input
                      accept="image/*"
                      id="doctorId"
                      name="doctorId"
                      type="file"
                      class="form-control"
                      onChange={handleImageChange("doctorId")}
                    />
                    <FormHelperText error={formValidations.doctorId.err}>
                      {formValidations.doctorId.msg}
                    </FormHelperText>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-main btn-lg btn-round-full mt-3"
                type="submit"
              >
                {t("submit")}
                <i className="icofont-simple-right ml-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorApplicationForm;
