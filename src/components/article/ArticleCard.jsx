import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useHistory } from "react-router";

export default function ArticleCard({ article }) {
  const history = useHistory();
  const handleArticleRedirection = () =>
    history.push(`/article/${article._id}`);

  return (
    <div class="grid">
      <div class="card">
        <div class="card__image">
          <img
            src="https://cdn.altibbi.com/cdn/image/2021/06/27/90e15fbe5f2f2178283267b08fa19d1c.png"
            alt=""
          />
          <div class="card__overlay card__overlay--indigo">
            <div class="card__overlay-content">
              <ul class="card__meta">
                <li>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{" "}
                  {moment(article.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
                </li>
              </ul>
              <div className="card__title">
                <p onClick={handleArticleRedirection}>{article.title}</p>
              </div>
              <ul class="card__meta card__meta--last">
                <li>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                  {article.author.role === "doctor" ? "Dr." : ""}
                  {article.author.firstname + " " + article.author.lastname}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
