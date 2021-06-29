import { createContext } from "react";
export const UpdateTicketsListContext = createContext({
  update: false,
  setUpdate: () => {},
});
export const UpdateTicketsListProvider = UpdateTicketsListContext.Provider;
