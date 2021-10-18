import React, { useEffect } from "react";
import SearchForm from "./../itemsComponent/SearchForm";
import RenderItemsForReceipt from "./../receiptComponent/RenderItemsForReceipt";
import SearchReceipt from "./SearchReceipt.module.css";
import receiptRenderItems from "./receiptRenderItems.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router";
import {
  addReceiptDb,
  ReceiptArray,
  searchByQAndValue,
} from "./../../features/receipt/receipt";
import RenderReceipt from "./RenderReceipt";
interface Props {}
type Params = {
  _id: string;
};
const NewReceipt = (props: Props) => {
  const dispatch = useAppDispatch();
  const params: Params = useParams();
  const receipt: ReceiptArray[] = useAppSelector(
    (state) => state.receiptState.receipt
  );
  useEffect(() => {
    dispatch(searchByQAndValue());
  }, [dispatch]);
  return (
    <div>
      <div className={receiptRenderItems.flexRow}>
        <SearchForm
          mainCssClass={SearchReceipt.searchForm}
          inputContainerCssClass={SearchReceipt.inputContainer}
          inputCssClass={SearchReceipt.input}
        />
        <RenderItemsForReceipt
          _id={params._id}
          receipt={receipt.find(({ _id: id }) => id === params._id)}
        />
      </div>
      <button
        onClick={() => {
          dispatch(addReceiptDb());
        }}
      >
        فتوره جديده
      </button>
      <RenderReceipt receipt={receipt} _id={params._id} />
    </div>
  );
};
export default NewReceipt;
