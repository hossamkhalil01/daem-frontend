import { default as PrimeButton } from "@material-ui/core/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { deleteArticle } from "../../services/articlesService";
import ConfirmationModal from "../ConfirmationModal";

export default function DeleteArticle({ articleId }) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const confirmDeletion = async () => {
    await deleteArticle(articleId);
    setOpenModal(false);
    history.push("/articles");
  };
  return (
    <>
      <PrimeButton
        onClick={handleClickOpen}
        variant="contained"
        color="secondary"
      >
        {t("delete")}
      </PrimeButton>

      <ConfirmationModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        confirm={confirmDeletion}
      />
    </>
  );
}
