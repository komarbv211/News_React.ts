import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TokenPayload } from '../../models/accounts';
import { accountService } from '../../services/accountsService';
import { tokenService } from '../../services/tokenService';
// Define a type for the slice state
interface AccountState {
    account: TokenPayload | null;
    isAuth: boolean;
}
// Define the initial state using that type
const initialState: AccountState = {
    account: tokenService.getPayload(),
    isAuth: accountService.isAuthenticated()
}
export const accountSlice = createSlice({
    name: 'account',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clear: (state) => {
            state.account = null;
            state.isAuth = false;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setAccount: (state, action: PayloadAction<TokenPayload>) => {
            state.account = action.payload;
            state.isAuth = true;
        }
    },
});
export const { clear, setAccount } = accountSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectAccount = (state: RootState) => state.account.account;
export const selectIsAuth = (state: RootState) => state.account.isAuth
export default accountSlice.reducer