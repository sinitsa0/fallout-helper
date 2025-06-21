import { configureStore } from '@reduxjs/toolkit';
import { saveState } from './storage';
import falloutSlice, { FALLOUT_STATE } from './cart.slice';

export const store = configureStore({
    reducer: {
        fallout: falloutSlice
    }
});

store.subscribe(() => {
    saveState(store.getState().fallout, FALLOUT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
