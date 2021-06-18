import axios from "axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { auto } from "@popperjs/core";
import Button from "@material-ui/core/Button";
import { createTicket } from "../../services/ticketsService";

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

export default function TicketForm() {
  const classes = useStyles();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();

    // Update the formData object with subject
    formData.append("subject", subject);

    // Update the formData object with description
    formData.append("description", description);

    // Update the formData object with images array
    // formData.append("images", images);

    for (const key of Object.keys(images)) {
      formData.append("images", images[key]);
    }

    // Request made to the backend api
    // Send formData object
    createTicket(formData);
  };
  return (
    <>
      <div className="text-center" style={{ margin: auto }}>
        <h2>Submit new ticket</h2>
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
            style={{ margin: 10 }}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
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
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <div className="w-100 text-start">
            <label htmlFor="images" className="p-3">
              Upload related images if any:{" "}
            </label>
            <input
              name="ticketImages"
              accept="image/*"
              id="images"
              multiple
              type="file"
              className="form-control"
              onChange={(event) => {
                setImages(event.target.files);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="m-auto mt-3"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
