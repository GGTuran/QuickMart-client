import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NewsletterState = {
    subscribers: string[];
};

const initialState: NewsletterState = {
    subscribers: ["john.doe@example.com", "jane.smith@example.com"],
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
        unsubscribe: (state, action: PayloadAction<string>) => {
            state.subscribers = state.subscribers.filter(
                (subscriber) => subscriber !== action.payload
            );
        },
    },
});

export const { subscribe, unsubscribe } = newsletterSlice.actions;
export default newsletterSlice.reducer;
