import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import jannaApi from "../../Api/jannaApi";
export interface Receipt {
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  wholesalePrice: number;
  _id?: string;
}
export interface ReceiptArray {
  items: Receipt[];
  date?: string;
  time?: string;
  total: number;
  isPaid: Boolean;
  netProfit: number;
  _id?: string;
  receiptNumber?: number;
}
interface InitialState {
  receipt: ReceiptArray[];
  status: "idle" | "loading" | "loaded" | "failed";
}
const initialState: InitialState = {
  receipt: [],
  status: "idle",
};
const init = {
  items: [],
  date: "",
  time: "",
  total: 0,
  isPaid: false,
  netProfit: 0,
};
type Query = {
  q: string;
  value: string | number | boolean;
};
interface AxiosData {
  data: ReceiptArray[];
}
export const addReceiptDb = createAsyncThunk(
  "receipt/addReceipt",
  async (receipt: ReceiptArray = init) => {
    const { data }: AxiosData = await jannaApi.post("/receipt", receipt);
    return data;
  }
);
export const updateReceiptDb = createAsyncThunk(
  "receipt/updateReceipt",
  async (receipt: ReceiptArray) => {
    const { data }: AxiosData = await jannaApi.put(
      `/receipt/${receipt._id}`,
      receipt
    );
    return data;
  }
);
export const searchByQAndValue = createAsyncThunk(
  "receipt/getReceipt",
  async (
    { q, value }: Query = { q: "isPaid", value: false }
  ): Promise<ReceiptArray[]> => {
    const { data }: AxiosData = await jannaApi.get(
      `/receipt?q=${q}&value=${value}`
    );
    return data;
  }
);

const receiptSlice = createSlice({
  name: "receiptState",
  initialState,
  reducers: {
    addReceipt: (state, action: PayloadAction<ReceiptArray>) => {
      state.receipt.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReceiptDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReceiptDb.fulfilled, (state, action: PayloadAction<any>) => {
        state.receipt.push(action.payload);
        state.status = "loaded";
      })
      .addCase(updateReceiptDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateReceiptDb.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receipt.push(action.payload);
          state.status = "loaded";
        }
      )
      .addCase(searchByQAndValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        searchByQAndValue.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receipt = action.payload;
          state.status = "loaded";
        }
      );
  },
});
export default receiptSlice.reducer;
