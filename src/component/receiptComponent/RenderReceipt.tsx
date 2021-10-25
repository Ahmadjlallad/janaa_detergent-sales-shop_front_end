import React from "react";
import {
  ReceiptArray,
  Receipt,
  updateReceiptDb,
  deleteReceiptDb,
} from "./../../features/receipt/receipt";
import receiptRenderItems from "./receiptRenderItems.module.css";

import RenderReceiptItems from "./Helpers/RenderReceiptItems";
import { useAppDispatch } from "../../app/hooks";
import { calculateTotalPriceReceipt } from "./Helpers/ReceiptHelper";
import { useCallback } from "react";

interface Props {
  receipt: ReceiptArray[];
  _id: string;
}

const RenderReceipt = ({ receipt, _id }: Props) => {
  const dispatcher = useAppDispatch();

  const myReceipt: ReceiptArray[] | any = receipt.find(
    ({ _id: id }) => id === _id
  );

  const renderItems = useCallback(
    () =>
      myReceipt?.items.map((ReceiptItems: Receipt, i: number) => (
        <RenderReceiptItems
          key={ReceiptItems._id}
          receiptRenderItems={receiptRenderItems}
          ReceiptItem={ReceiptItems}
          ReceiptItems={myReceipt}
          _id={_id}
          i={i}
        />
      )),
    [_id, myReceipt]
  );

  return (
    <div className={receiptRenderItems.receiptItemsComponent}>
      <div className={receiptRenderItems.flexRowDiv}>
        <div>الاسم</div>
        <div>سعر</div>
        <div>سعر الجمله</div>
        <div>باركود</div>
        <div>الكميه</div>
        <div>السعر الكلي</div>
        <div>حدد الكميه</div>
        <div></div>
      </div>
      <div>{renderItems()}</div>

      {myReceipt && myReceipt.items.length > 0 && (
        <>
          <div>سعر الكلي:{calculateTotalPriceReceipt(myReceipt.items)[0]}</div>
          <button
            onClick={() => {
              dispatcher(
                updateReceiptDb({
                  ...myReceipt,
                  isPaid: true,
                  netProfit: calculateTotalPriceReceipt(myReceipt.items)[1],
                  total: calculateTotalPriceReceipt(myReceipt.items)[0],
                })
              );
            }}
          >
            تم الدفع
          </button>
        </>
      )}
      {myReceipt && (
        <>
          <button
            onClick={() => {
              dispatcher(deleteReceiptDb(_id));
            }}
          >
            الغاء الفاتوره
          </button>
        </>
      )}
    </div>
  );
};

export default React.memo(RenderReceipt);
