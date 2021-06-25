import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { BASE_URL } from "../api/urls";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function DoctorCard({ doctor }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="User Image"
          height="140"
          image={BASE_URL + "/" + doctor.avatar}
          title="User Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {doctor.firstname + " " + doctor.lastname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>Email: {doctor.email}</p>
            <p>Age: {doctor.age}</p>
            <p>Gender: {doctor.gender}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
