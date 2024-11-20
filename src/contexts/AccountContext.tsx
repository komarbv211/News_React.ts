import React from "react";
import { TokenPayload } from "../models/accounts";

export type AccountContextType = {
    account: TokenPayload | null;
    clear: () => void;
    isAuth: () => boolean;
    setAccount: (payload: TokenPayload | null) => void;
};

export const AccountContext = React.createContext<AccountContextType | null>(null);
