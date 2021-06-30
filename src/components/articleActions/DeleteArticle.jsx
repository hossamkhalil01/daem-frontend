import { default as PrimeButton } from "@material-ui/core/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteArticle } from "../../services/articlesService";
import ConfirmationModal from "../ConfirmationModal";
import { UpdateArticlesListContext } from "../../contexts/updateArticlesListContext";
import { useContext } from "react";

export default function DeleteArticle({ articleId }) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const updated = useContext(UpdateArticlesListContext);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const confirmDeletion = async () => {
    await deleteArticle(articleId);
    setOpenModal(false);
    updated.setUpdate(!updated.update);
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
