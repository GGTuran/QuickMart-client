import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NewsletterState = {
    subscribers: string[];
};

const initialState: NewsletterState = {
    subscribers: [],
};

const newsletterSlice = createSlice({
    name: "newsletter",
    initialState,
    reducers: {
        subscribe: (state, action: PayloadAction<string>) => {
            if (!state.subscribers.includes(action.payload)) {
                state.subscribers.push(action.payload);
            }
        },
    },
});

export const { subscribe } = newsletterSlice.actions;
export default newsletterSlice.reducer;
