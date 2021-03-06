import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Popover from "@material-ui/core/Popover";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import i18next from "i18next";
import moment from 'moment';
import localization from 'moment/locale/ar';
import React from "react";
import { useTranslation } from "react-i18next";
import storage from "../utils/storage";


const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ar: { label: "العربية", dir: "rtl", active: false },
};

export default function LanguageSelect() {
  const selected = storage.get("i18nextLng") || "en";
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  React.useEffect(() => {
    moment.updateLocale(t("language"), localization);
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {languageMap[selected].label}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <List>
            <ListSubheader>{t("select_language")}</ListSubheader>
            {Object.keys(languageMap)?.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                  moment.updateLocale(item, localization);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
}
