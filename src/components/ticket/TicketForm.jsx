import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { auto } from "@popperjs/core";
import Button from "@material-ui/core/Button";
import { createTicket, updateTicket } from "../../services/ticketsService";

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

export default function TicketForm({ ticket }) {
  const classes = useStyles();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [editMode, seteditMode] = useState(false);

  useEffect(() => {
    if (ticket) {
      setSubject(ticket.subject);
      setDescription(ticket.description);
      seteditMode(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      updateTicket(ticket._id, formData);
    } else {
      // Send formData object
      createTicket(formData);
    }
  };
  return (
    <>
      <div className="text-center" style={{ margin: auto }}>
        <h2>{editMode ? "Edit" : "Submit new"} ticket</h2>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <TextField
            required
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
            defaultValue={subject}
          />
          <TextField
            required
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
            defaultValue={description}
          />

          <div className="w-100 text-start">
            <label htmlFor="images" className="p-3">
              Upload related images if any:{" "}
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              id="images"
              multiple
              className="form-control"
              onChange={(e) => {
                setImages(e.target.files);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="m-auto mt-3"
          >
            {editMode ? "Edit" : "Add"}
          </Button>
        </form>
      </div>
    </>
  );
}
