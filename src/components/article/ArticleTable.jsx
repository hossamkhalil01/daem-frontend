import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/urls";
import DeleteArticle from "../../components/articleActions/DeleteArticle";
import capitalize from "../../utils/capitalize";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  body: {
    maxWidth: "25ch",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const ArticleTable = ({ articles }) => {
  const checkEmptyTable = () => {
    if (articles.length) return;

    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <h4 className="alert alert-info text-center">{t("no-articles")}</h4>
        </TableCell>
      </TableRow>
    );
  };
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">{t("title")}</TableCell>
              <TableCell align="center">{t("body")}</TableCell>
              <TableCell align="center">{t("author")}</TableCell>
              <TableCell align="center">{t("date")}</TableCell>

              <TableCell align="center">{t("delete")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkEmptyTable()}

            {articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell align="center" component="th" scope="row">
                  <Avatar alt="avatar" src={`${BASE_URL}/${article.image}`} />
                </TableCell>
                <TableCell align="center">
                  <Link to={`/articles/${article._id}`} key={article._id}>
                    {capitalize(article.title)}
                  </Link>
                </TableCell>
                <TableCell className={classes.body} align="center">
                  {capitalize(article.body)}
                </TableCell>
                <TableCell align="center">
                  {article.author.firstname + " " + article.author.lastname}
                </TableCell>
                <TableCell align="center">
                  {moment(article.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
                </TableCell>
                <TableCell align="center">
                  <DeleteArticle articleId={article._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ArticleTable;
