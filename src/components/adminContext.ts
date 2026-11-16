import { createContext, useContext } from "react";

export const AdminEmbedContext = createContext(false);
export const useAdminEmbedded = () => useContext(AdminEmbedContext);
