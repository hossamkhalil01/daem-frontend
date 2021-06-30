import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useHistory } from "react-router";
import { BASE_URL } from "../../api/urls";

export default function ArticleCard({ article }) {
  const history = useHistory();
  const handleArticleRedirection = () =>
    history.push(`/articles/${article._id}`);

  return (
    <div className="card article-card">
      <div className="card__image">
        <img src={BASE_URL + "/" + article.image} alt="" />
        <div className="card__overlay card__overlay--indigo">
          <div className="card__overlay-content">
            <ul className="card__meta">
              <li>
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{" "}
                {moment(article.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
              </li>
            </ul>
            <div className="card__title">
              <p onClick={handleArticleRedirection}>{article.title}</p>
            </div>
            <ul className="card__meta card__meta--last">
              <li>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                {article.author.role === "doctor" ? "Dr. " : ""}
                {article.author.firstname + " " + article.author.lastname}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
