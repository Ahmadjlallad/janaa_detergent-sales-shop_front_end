import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import jannaApi from "../../Api/jannaApi";
import MyHistory from "../../MyHistory";

export interface Receipt {
  name: string;
  barcode: string | null | undefined;
  price: number;
  quantity: number;
  wholesalePrice: number;
  _id?: string;
  wholesalePriceTotalPrice: number;
  totalPrice: number;
}
export interface ReceiptArray {
  items: Receipt[];
  date?: string;
  time?: string;
  total?: number;
  isPaid?: Boolean;
  netProfit?: number;
  _id?: string;
  receiptNumber?: number;
  receiptNumberForThisDay?: number;
}
export interface InitialState {
  receipt: ReceiptArray[];
  status: "idle" | "loading" | "loaded" | "failed";
  error?: string;
}
export const initialState: InitialState = {
  receipt: [],
  status: "idle",
};
const myDate = new Date();
export const todayDate = `${myDate.getFullYear()}-${
  myDate.getMonth() + 1
}-${myDate.getDate()}`;
console.log(todayDate);
export const init = {
  items: [],
  date: `${todayDate}`,
  time: `${myDate.getHours()}:${myDate.getMinutes()}`,
  total: 0,
  isPaid: false,
  netProfit: 0,
  receiptNumberForThisDay: 0,
};
export type Query = {
  q: string;
  value: string | number | boolean;
};
export interface AxiosData {
  data: ReceiptArray;
}
export interface AxiosDataAsArray {
  data: ReceiptArray[];
}
export const addReceiptDb = createAsyncThunk(
  "receipt/addReceipt",
  async (receipt: ReceiptArray = init) => {
    const { data }: AxiosData = await jannaApi.post("/receipt", receipt);
    console.log(data);
    MyHistory.push(`/receipt/${data._id}`);
    return data;
  }
);
export const updateReceiptDb = createAsyncThunk(
  "receipt/updateReceipt",
  async (receipt: ReceiptArray) => {
    await jannaApi.put(`/receipt/${receipt._id}`, receipt);
    const { data }: AxiosData = await jannaApi.get(
      `/receipt?q=isPaid&value=${false}`
    );
    return data;
  }
);
export const deleteReceiptDb = createAsyncThunk(
  "receipt/deleteReceipt",
  async (_id: string) => {
    await jannaApi.delete(`/receipt/${_id}`);
    const { data }: AxiosData = await jannaApi.get(
      `/receipt?q=isPaid&value=${false}`
    );
    return data;
  }
);
export const searchByQAndValue = createAsyncThunk(
  "receipt/getReceipt",
  async (
    { q, value }: Query = { q: "isPaid", value: false }
  ): Promise<ReceiptArray[]> => {
    const { data }: AxiosDataAsArray = await jannaApi.get(
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
      .addCase(addReceiptDb.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        console.log(action);
        state.error = action.payload.message;
      })
      .addCase(updateReceiptDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateReceiptDb.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receipt = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(
        updateReceiptDb.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          console.log(action);
          state.error = action.payload.message;
        }
      )
      .addCase(searchByQAndValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        searchByQAndValue.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          console.log(action);
          state.error = action.payload.message;
        }
      )
      .addCase(
        searchByQAndValue.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receipt = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(deleteReceiptDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteReceiptDb.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          console.log(action);
          state.error = action.payload.message;
        }
      )
      .addCase(
        deleteReceiptDb.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receipt = action.payload;
          state.status = "loaded";
        }
      );
  },
});
export default receiptSlice.reducer;
