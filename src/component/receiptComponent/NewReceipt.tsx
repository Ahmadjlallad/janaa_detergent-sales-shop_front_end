import { useEffect, useState, memo } from "react";
import SearchForm from "./../itemsComponent/SearchForm";
import RenderItemsForReceipt from "./../receiptComponent/RenderItemsForReceipt";
import SearchReceipt from "./SearchReceipt.module.css";
import receiptRenderItems from "./receiptRenderItems.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router";
import { setQuantityFromSearch } from "./Helpers/NewReceiptHelper";
import { RootState } from "../../app/store";
import {
  addReceiptDb,
  ReceiptArray,
  searchByQAndValue,
} from "./../../features/receipt/receipt";
import RenderReceipt from "./RenderReceipt";
import { detectChanges } from "./Helpers/ReceiptHelper";

type Params = {
  _id: string;
};

const NewReceipt = () => {
  const dispatch = useAppDispatch();
  const params: Params = useParams();
  const receipt: ReceiptArray[] = useAppSelector(
    (state) => state.receiptState.receipt
  );
  const items = useAppSelector((state: RootState) => state.items);
  useEffect(() => {
    dispatch(searchByQAndValue());
  }, [dispatch]);
  const [onItemChange, setOnItemChange] = useState<any>(null);

  useEffect(() => {
    if (onItemChange) {
      console.log("useEffect");
      const [selectedReceipt] = receipt.filter(
        ({ _id: id }) => id === onItemChange.r5_id
      );
      setQuantityFromSearch(
        selectedReceipt,
        detectChanges,
        onItemChange,
        dispatch,
        onItemChange.r5_id
      );
      setOnItemChange(null);
      return () => {
        console.log("Cleaned");
        setOnItemChange(null);
      };
    }
  }, [dispatch, onItemChange, receipt]);

  return (
    <div className={receiptRenderItems.newReceiptContainer}>
      <div className={receiptRenderItems.flexRow}>
        <SearchForm
          mainCssClass={SearchReceipt.searchForm}
          inputContainerCssClass={SearchReceipt.inputContainer}
          inputCssClass={SearchReceipt.input}
        />
        <RenderItemsForReceipt
          items={items}
          _id={params._id}
          // receipt={receipt.find(({ _id: id }) => id === params._id)}
          setOnItemChange={setOnItemChange}
        />
      </div>

      <RenderReceipt receipt={receipt} _id={params._id} />
    </div>
  );
};
export default memo(NewReceipt);
