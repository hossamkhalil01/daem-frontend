import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../api/urls";
import capitalize from "../utils/capitalize";
import RoleSelector from "./RoleSelector";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UsersTable = ({ users, onSelectionError }) => {
  const { t } = useTranslation();

  const checkEmptyTable = () => {
    if (users.length) return;

    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <h4 className="alert alert-info text-center">
            {t("no-users")}
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
            <TableCell>#</TableCell>
            <TableCell align="center">{t("first-name")}</TableCell>
            <TableCell align="center">{t("last-name")}</TableCell>
            <TableCell align="center">{t("email")}</TableCell>
            <TableCell align="center">{t("role")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkEmptyTable()}

          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell align="center" component="th" scope="row">
                <Avatar alt="avatar" src={`${BASE_URL}/${user.avatar}`} />
              </TableCell>
              <TableCell align="center">{capitalize(user.firstname)}</TableCell>
              <TableCell align="center">{capitalize(user.lastname)}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">
                <RoleSelector user={user} onError={onSelectionError} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
