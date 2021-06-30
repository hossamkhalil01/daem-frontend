import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  createTicket,
  updateTicket,
  updateTicketDoctor,
  updateTicketModerator,
  updateTicketUser,
} from "../../services/ticketsService";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errorSubject, setErrorSubject] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);
  const [errorImages, setErrorImages] = useState(false);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (ticket) {
      setSubject(ticket.subject);
      setDescription(ticket.description);
      setEditMode(true);
    }
  }, [ticket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    subject.length < 3 ? setErrorSubject(true) : setErrorSubject(false);
    description.length < 10 ? setErrorDesc(true) : setErrorDesc(false);
    images.length > 5 ? setErrorImages(true) : setErrorImages(false);

    if (!errorSubject && !errorDesc && !errorImages) {
      // Create an object of formData
      let formData = new FormData();

      // Update the formData object with subject
      formData.append("subject", subject);

      // Update the formData object with description
      formData.append("description", description);

      // Update the formData object with images array

      for (const key of Object.keys(images)) {
        formData.append("images", images[key]);
      }

      // Request made to the backend api
      if (ticket) {
        // Send formData object in case of update
        // updateTicket based on role

        if (currentUser.role === "moderator") {
          updateTicketModerator(ticket._id, formData).then((res) => {
            onCreation(res.data.data);
          });
        } else if (currentUser.role === "doctor") {
          updateTicketDoctor(ticket._id, formData).then((res) => {
            onCreation(res.data.data);
          });
        } else {
          updateTicketUser(ticket._id, formData).then((res) => {
            onCreation(res.data.data);
          });
        }
      } else {
        // Send formData object
        createTicket(formData).then((res) => {
          onCreation(res.data.data);
        });
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
          {errorSubject ? (
            <small className="text-danger">
              Min length of subject is 3 characters
            </small>
          ) : null}
          <TextField
            error={errorSubject}
            id="subject"
            label="Ticket Subject"
            placeholder="Subject"
            variant="outlined"
            fullWidth
            multiline
            style={{ margin: 10 }}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value.length < 3) {
                setErrorSubject(true);
              } else {
                setErrorSubject(false);
              }
            }}
            // defaultValue={subject}
            value={subject}
          />

          {errorDesc ? (
            <small className="text-danger">
              Min length of description is 10 characters
            </small>
          ) : null}

          <TextField
            error={errorDesc}
            id="description"
            label="Ticket Description"
            placeholder="Description"
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            style={{ margin: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value.length < 10) {
                setErrorDesc(true);
              } else {
                setErrorDesc(false);
              }
            }}
            // defaultValue={description}
            value={description}
          />

          {errorImages ? (
            <small className="text-danger">Max Images count is 5!</small>
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
              onChange={(e) => {
                if (e.target.files.length > 5) {
                  setErrorImages(true);
                } else {
                  setErrorImages(false);

                  setImages(e.target.files);
                }
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="m-auto mt-5"
            disabled={errorSubject || errorDesc || errorImages ? true : false}
          >
            {editMode ? "Save" : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}
