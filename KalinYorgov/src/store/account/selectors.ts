import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getAuthState = (state: RootState) => state.auth;

export const getUser = createSelector(
    [getAuthState],
    (auth) => auth.user
);

export const getUsername = createSelector(
    [getAuthState],
    (auth) => auth.user?.email
);

export const isLoggedIn = createSelector(
    [getAuthState],
    (auth) => Boolean(auth.user?.email)
);

export const isShowLoginForm = createSelector(
    [getAuthState],
    (auth) => auth.loading === false
);