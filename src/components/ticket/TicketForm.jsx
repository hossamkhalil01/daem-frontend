import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  createTicket,
  updateTicketDoctor,
  updateTicketModerator,
  updateTicketUser,
} from "../../services/ticketsService";
import validate from "../../utils/validations";

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

export default function TicketForm({ ticket, onCreation }) {
  const classes = useStyles();
  const [curTicket, setCurTicket] = useState({
    subject: "",
    description: "",
    images: [],
  });
  const [editMode, setEditMode] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (ticket) {
      setCurTicket(ticket);
      setEditMode(true);
    }
  }, [ticket]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const redirectToTickets = () => {
    history.push(`/tickets`);
  };

  const [formValidations, setFormValidations] = useState({
    images: { err: false, msg: "" },
    subject: { err: false, msg: "" },
    description: { err: false, msg: "" },
  });

  const checkRequiredFields = () => {
    let hasErrors = false;
    let errors = [];
    const validationsObj = { ...formValidations };

    Object.keys(formValidations).forEach((field) => {
      if (field !== "images") {
        errors = validate.required(curTicket[field]);
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
    if (msg.includes("Ticket validation failed: ")) {
      errors[1] = msg.split("Ticket validation failed: ");
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
      validationsObj.images = { err: true, msg: msg };
    }

    setFormValidations(validationsObj);
  };

  const handleUploadClick = (event) => {
    setCurTicket({
      ...curTicket,
      images: event.target.files,
    });
    if (event.target.files.length > 5) {
      formValidations.images = {
        err: true,
        msg: "Max Count Of Allowed images is 5!",
      };
    } else {
      formValidations.images = { err: false, msg: "" };
    }
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

    setCurTicket({ ...curTicket, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if all the required fields exists
    if (!checkRequiredFields()) return;

    // don't submit if there are errors
    if (!isFormValid()) return;

    // Create an object of formData
    let formData = new FormData();

    // Update the formData object with subject
    formData.append("subject", curTicket.subject);

    // Update the formData object with description
    formData.append("description", curTicket.description);

    // Update the formData object with images array

    for (const key of Object.keys(curTicket.images)) {
      formData.append("images", curTicket.images[key]);
    }

    try {
      // Request made to the backend api
      if (ticket) {
        // Send formData object in case of update
        // updateTicket based on role

        if (currentUser.role === "moderator") {
          const res = await updateTicketModerator(ticket._id, formData);
          onCreation(res.data.data);
        } else if (currentUser.role === "doctor") {
          const res = await updateTicketDoctor(ticket._id, formData);
          onCreation(res.data.data);
        } else {
          const res = await updateTicketUser(ticket._id, formData);
          onCreation(res.data.data);
        }
      } else {
        // Send formData object
        const res = await createTicket(formData);
        onCreation(res.data.data);
      }
    } catch (err) {
      if (err.response.data.data === "exceeded-limit") {
        setAlertMessage(err.response.data.data);
        setOpenAlert(true);
      } else {
        const msg = err.response.data.message;
        checkServerValidation(msg);
      }
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
        <h2>{editMode ? "Edit" : "New"} Ticket</h2>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {formValidations.subject.err ? (
            <small className="text-danger">{formValidations.subject.msg}</small>
          ) : null}
          <TextField
            error={formValidations.subject.err}
            id="subject"
            label="Ticket Subject"
            placeholder="Subject"
            variant="outlined"
            fullWidth
            multiline
            style={{ margin: 10 }}
            onChange={handleChange("subject", validate.subject)}
            value={curTicket.subject}
          />

          {formValidations.description.err ? (
            <small className="text-danger">
              {formValidations.description.msg}
            </small>
          ) : null}

          <TextField
            error={formValidations.description.err}
            id="description"
            label="Ticket Description"
            placeholder="Description"
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            style={{ margin: 10 }}
            onChange={handleChange("description", validate.description)}
            value={curTicket.description}
          />

          {formValidations.images.err ? (
            <small className="text-danger">{formValidations.images.msg}</small>
          ) : null}
          <div className="w-100 text-start">
            <label htmlFor="images" className="pe-3">
              Upload related images if any (max 5):{" "}
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              id="images"
              multiple
              // className="form-control"
              onChange={handleUploadClick}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="m-auto mt-5"
            disabled={
              formValidations.images.err ||
              formValidations.subject.err ||
              formValidations.description.err
                ? true
                : false
            }
          >
            {editMode ? "Save" : "Submit"}
          </Button>
        </form>
      </div>

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(alertMessage)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            {t("ok")}
          </Button>
          <Button onClick={redirectToTickets} color="primary" autoFocus>
            {t("go-to-tickets")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
