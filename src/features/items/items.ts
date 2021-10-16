import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import jannaApi from "../../Api/jannaApi";
import { RootState } from "../../app/store";

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
  latestQuery: { type: string; value: string };
};

const initialState: ItemsState = {
  items: [],
  status: "idle",
  latestQuery: { type: "", value: "" },
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
export const latestQuery = (state: RootState) => state.items.latestQuery;
export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (item: Item, { getState }): Promise<Item[]> => {
    await jannaApi.put(`/items/${item.id}`, item);
    const { type, value } = latestQuery(getState() as RootState);
    const { data }: ItemsAxios = await jannaApi.get(
      `/items?type=${type}&value=${value}`
    );
    return data;
  }
);
export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id: string, { getState }): Promise<Item[]> => {
    await jannaApi.delete(`/items/${id}`);
    const { type, value } = latestQuery(getState() as RootState);
    const { data }: ItemsAxios = await jannaApi.get(
      `/items?type=${type}&value=${value}`
    );
    return data;
  }
);

export type AddItem = typeof addItem;
export type UpdateItem = typeof updateItem;

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<prams>) => {
      state.latestQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryAllItems.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(
        queryAllItems.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          return { ...state, status: "loaded", items: action.payload };
        }
      )
      .addCase(queryAllItems.rejected, (state, action: PayloadAction<any>) => {
        console.log(action);

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
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<any>) => {
        return { ...state, status: "loaded", items: action.payload };
      })
      .addCase(updateItem.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        console.log(action);
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<any>) => {
        return { ...state, status: "loaded", items: action.payload };
      })
      .addCase(deleteItem.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        console.log(action);
      });
  },
});

export const { setQuery } = itemsSlice.actions;
export { itemsSlice };
export default itemsSlice.reducer;
