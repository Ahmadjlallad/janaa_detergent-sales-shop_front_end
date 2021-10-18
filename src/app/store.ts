import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import itemsReducer from "../features/items/items";
import receiptReducer from "../features/receipt/receipt";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemsReducer,
    receiptState: receiptReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
