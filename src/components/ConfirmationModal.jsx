import {
  default as Button
} from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
  
  export default function ConfirmationModal({ openModal , setOpenModal , confirm}) {
    const { t } = useTranslation();
    const handeleConfirm = ()=>{
      confirm();
    }
    const handleCancel = () => {
      setOpenModal(false);
    };
    
    return (
      <>
        <Dialog
          open={openModal}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
        >
          <DialogTitle id="alert-dialog-title">{t("confirmation")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("delete-confirmation")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handeleConfirm} color="primary">
              {t("sure")}
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus>
              {t("cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  