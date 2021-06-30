import { createContext } from "react";
export const UpdateArticlesListContext = createContext({
  update: false,
  setUpdate: () => {},
});
export const UpdateArticlesListProvider = UpdateArticlesListContext.Provider;
