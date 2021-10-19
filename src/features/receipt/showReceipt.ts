import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jannaApi from "../../Api/jannaApi";
import {
  //   Receipt,
  ReceiptArray,
  //   AxiosData,
  AxiosDataAsArray,
  Query,
  todayDate,
} from "./receipt";

export const queryReceipt = createAsyncThunk(
  "showReceipt/queryReceipt",
  async (
    { q, value }: Query = { q: "date", value: todayDate }
  ): Promise<ReceiptArray[]> => {
    const { data }: AxiosDataAsArray = await jannaApi.get(
      `/receipt?q=${q}&value=${value}`
    );
    return data;
  }
);
export const deleteReceipt = createAsyncThunk(
  "showReceipt/deleteReceipt",
  async (_id: string) => {
    await jannaApi.delete(`/receipt/${_id}`);
    return _id;
  }
);
interface init {
  showMyReceipt: ReceiptArray[];
  status: "idle" | "loading" | "loaded" | "failed";
  error?: string;
}
const initialState: init = {
  showMyReceipt: [],
  status: "idle",
};
const showReceipt = createSlice({
  name: "showReceipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(queryReceipt.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(queryReceipt.fulfilled, (state, action) => {
      state.status = "loaded";
      state.showMyReceipt = action.payload;
    });
    builder.addCase(queryReceipt.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deleteReceipt.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteReceipt.fulfilled, (state, action) => {
      state.status = "loaded";
      state.showMyReceipt = state.showMyReceipt.filter(
        ({ _id }) => _id !== action.payload
      );
    });
    builder.addCase(deleteReceipt.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export default showReceipt.reducer;
