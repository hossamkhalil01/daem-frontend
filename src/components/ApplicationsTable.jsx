import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { BASE_URL } from "../api/urls";
import capitalize from "../utils/capitalize";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ApplicationsTable = ({ applications }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleViewApplication = (application) => {
    history.push({
      pathname: `/admin/doctor-application/view`,
      state: { application },
    });
  };
  const checkEmptyTable = () => {
    if (applications.length) return;

    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <h4 className="alert alert-info text-center">
            {t("no-applications")}
          </h4>
        </TableCell>
      </TableRow>
    );
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">{t("applicant-name")}</TableCell>
            <TableCell align="center">{t("email")}</TableCell>
            <TableCell align="center">{t("speciality")}</TableCell>
            <TableCell align="center">{t("state")}</TableCell>
            <TableCell align="center">{t("actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkEmptyTable()}

          {applications.map((application) => (
            <TableRow key={application._id}>
              <TableCell component="th" scope="row">
                <Avatar
                  alt="avatar"
                  src={`${BASE_URL}/${application.applicant.avatar}`}
                />
              </TableCell>
              <TableCell align="center">
                {capitalize(application.applicant.firstname) +
                  " " +
                  capitalize(application.applicant.lastname)}
              </TableCell>
              <TableCell align="center">
                {application.applicant.email}
              </TableCell>
              <TableCell align="center">{t(application.speciality)}</TableCell>
              <TableCell align="center">
                <div className="lead">
                  <span
                    className={
                      application.status === "approved"
                        ? "badge bg-success"
                        : application.status === "pending"
                        ? "badge bg-warning"
                        : "badge bg-danger"
                    }
                  >
                    {t(application.status)}
                  </span>
                </div>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleViewApplication(application)}
                >
                  {t("view")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationsTable;
