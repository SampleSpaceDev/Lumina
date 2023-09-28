import { useContext } from "react";
import { AppContext, AppContextType } from "../contexts";

export function useAppContext(): AppContextType {
    return useContext(AppContext);
}