import React from "react";
import { AccountContext} from "./AccountContext";
import { TokenPayload } from "../models/accounts";
import { tokenService } from "../services/tokenService";

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = React.useState<TokenPayload | null>(tokenService.getPayload());

    const clear = () => {
        setAccount(null);
    };

    const isAuth = () => account !== null;

    return (
        <AccountContext.Provider value={{ account, setAccount, clear, isAuth }}>
            {children}
        </AccountContext.Provider>
    );
};
