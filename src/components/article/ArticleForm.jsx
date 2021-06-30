import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validate from "../../utils/validations";
import { createArticle, updateArticle } from "../../services/articlesService";
import { BASE_URL } from "../../api/urls";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));
export default function ArticleForm({ article, onCreation }) {
  const classes = useStyles();
  const [curArticle, setCurArticle] = useState({
    title: "",
    body: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [imageSource, setImageSource] = useState("");

  useEffect(() => {
    if (article) {
      console.log(article);
      setCurArticle({ ...article });
      setEditMode(true);
      setImageSource(BASE_URL + "/" + article.image);
    }
  }, [article]);

  const [formValidations, setFormValidations] = useState({
    image: { err: false, msg: "" },
    title: { err: false, msg: "" },
    body: { err: false, msg: "" },
  });

  const checkRequiredFields = () => {
    let hasErrors = false;
    let errors = [];
    const validationsObj = { ...formValidations };

    Object.keys(formValidations).forEach((field) => {
      if (field !== "image") {
        errors = validate.required(curArticle[field]);
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
    if (msg.includes("Article validation failed: ")) {
      errors[1] = msg.split("Article validation failed: ");
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
      validationsObj["image"] = { err: true, msg: errors[0] };
    }

    setFormValidations(validationsObj);
  };

  const handleUploadClick = (event) => {
    setCurArticle({
      ...curArticle,
      image: event.target.files[0],
    });

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageSource(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    formValidations.image = { err: false, msg: "" };
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

    setCurArticle({ ...curArticle, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all the required fields exists
    if (!checkRequiredFields()) return;

    // don't submit if there are errors
    if (!isFormValid()) return;

    // Create an object of formData
    let formData = new FormData();

    // Update the formData object with title
    formData.append("title", curArticle.title);

    // Update the formData object with body
    formData.append("body", curArticle.body);

    // Update the formData object with image
    formData.append("image", curArticle.image);

    // submit request to the backend
    try {
      // Send formData object in case of update

      if (article) {
        // Send formData object in case of update
        const res = await updateArticle(article._id, formData);
        onCreation(res.data.data);
      } else {
        // Send formData object
        const res = await createArticle(formData);
        onCreation(res.data.data);
      }
    } catch (err) {
      // registration validations
      const msg = err.response.data.message;
      checkServerValidation(msg);
    }
  };

  return (
    <>
      <div
        className="text-center"
        style={{
          border: "2px solid #09c",
          margin: "2%",
          padding: "2%",
        }}
      >
        <h2>{editMode ? "Edit" : "New"} Article</h2>
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {formValidations.title.err ? (
            <small className="text-danger">{formValidations.title.msg}</small>
          ) : null}
          <TextField
            required
            error={formValidations.title.err}
            id="title"
            label="Article Title"
            placeholder="Title"
            variant="outlined"
            fullWidth
            multiline
            style={{ margin: 10 }}
            onChange={handleChange("title", validate.title)}
            value={curArticle.title}
          />

          {formValidations.body.err ? (
            <small className="text-danger">{formValidations.body.msg}</small>
          ) : null}

          <TextField
            required
            error={formValidations.body.err}
            id="body"
            label="Article Body"
            placeholder="Body"
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            style={{ margin: 10 }}
            onChange={handleChange("body", validate.body)}
            value={curArticle.body}
          />

          {editMode ? (
            <div className="row m-3">
              <img
                src={imageSource}
                alt="Profile"
                width="300"
                height="100"
                className="col-5"
              />
            </div>
          ) : null}

          <div className="w-100 text-start">
            <label htmlFor="images" className="pe-3">
              Upload Article image:{" "}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="images"
              onChange={handleUploadClick}
            />
          </div>

          {formValidations.image.err ? (
            <small className="text-danger">{formValidations.image.msg}</small>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="m-auto mt-3"
            disabled={
              formValidations.title.err || formValidations.body.err
                ? true
                : false
            }
          >
            {editMode ? "Save" : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}
