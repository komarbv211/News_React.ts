import { useContext } from "react";
import { AccountContext, AccountContextType } from "./AccountContext";

export const useAccountContext = (): AccountContextType => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useAccountContext must be used within an AccountProvider");
    }
    return context;
};
