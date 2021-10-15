import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import jannaApi from "../../Api/jannaApi";

export interface Item {
  name: string;
  barcode?: string | null | undefined;
  price: number;
  wholesalePrice: number;
  id?: string;
}
interface ItemsAxios {
  data: Item[];
}
type ItemsState = {
  items: Item[];
  status: "loading" | "loaded" | "error" | "idle";
};

const initialState: ItemsState = {
  items: [],
  status: "idle",
};
type prams = {
  type: string;
  value: string;
};
export const queryAllItems = createAsyncThunk(
  "items/queryAllItems",
  async ({ type, value }: prams) => {
    const { data }: ItemsAxios = await jannaApi.get(
      `/items?type=${type}&value=${value}`
    );
    return data;
  }
);
export const addItem = createAsyncThunk("items/addItem", async (item: Item) => {
  await jannaApi.post(`/items`, item);
});
export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (item: Item) => {
    await jannaApi.put(`/items/${item.id}`, item);
    console.log(item.id);
  }
);

export type AddItem = typeof addItem;
export type UpdateItem = typeof updateItem;

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(queryAllItems.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(
        queryAllItems.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          console.log(action.payload);
          return { ...state, status: "loaded", items: action.payload };
        }
      )
      .addCase(queryAllItems.rejected, (state, action: PayloadAction<any>) => {
        return { ...state, err: action, status: "error" };
      })
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state) => {
        state.status = "loaded";
      })
      .addCase(addItem.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
      })
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.status = "loaded";
      })
      .addCase(updateItem.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
      });
  },
});

export { itemsSlice };
export default itemsSlice.reducer;
