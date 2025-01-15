import { createSlice } from "@reduxjs/toolkit";
import { removeData, setData } from "../../storage";

interface initialStateProps {
    user?: {
        username: string,
        email: string,
        token: string
    },
    option: {
        showLoginForm: boolean
    }
}

const initialState: initialStateProps = {
    option: {
        showLoginForm: true
    }
};

const accountSlice = createSlice({
    name: 'accountSlice',
    initialState,
    reducers: {
        loadUser(state, action) {
            state.user = action.payload;
        },
        loginOrRegistration(state, action) {
            state.user = action.payload;
            if (action.payload.token) {
                setData('authToken', action.payload.token);
                setData('username', action.payload.username);
            }
        },
        logout(state) {
            state.user = undefined;
            removeData('authToken');
            removeData('username');
        },
        toggleLoginOnRegistrationForms(state) {
            state.option.showLoginForm = !state.option.showLoginForm;
        }
    }
});

export const accountAction = accountSlice.actions;
export default accountSlice.reducer;