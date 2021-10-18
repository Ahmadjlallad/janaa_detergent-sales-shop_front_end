import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import receiptRenderItems from "./receiptRenderItems.module.css";
import {
  updateReceiptDb,
  ReceiptArray,
  Receipt,
} from "./../../features/receipt/receipt";
import { useAppDispatch } from "../../app/hooks";
interface Props {
  _id: string;
  receipt: ReceiptArray | any;
}

const RenderItemsForReceipt = ({ _id, receipt }: Props) => {
  const [counter, setCounter] = useState(3);

  const dispatcher = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.items);
  const renderItems = items.items.map(
    ({ name, price, wholesalePrice, barcode, _id }) => (
      <div key={_id} className={receiptRenderItems.flexRowDiv}>
        <div>{name}</div>
        <div>{price}</div>
        <div>{wholesalePrice}</div>
        <div>{barcode ? barcode : "لا يوجد barcode"}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const oldItems: Receipt[] = receipt?.items?.find(
              ({ barcode: myBarcode }: Receipt) => myBarcode === barcode
            );
            const changedQuantity: Receipt[] = receipt?.items?.find(
              ({ barcode: myBarcode }: Receipt) => myBarcode === barcode
            );
            if (oldItems) {
              const myTarget: any = e.target;
              changedQuantity[0].quantity =
                changedQuantity[0].quantity + myTarget.quantity.value;
              const newItem: Receipt[] = {
                ...oldItems,
                ...changedQuantity,
              };
              dispatcher(updateReceiptDb({ _id, items: newItem }));
            } else {
              dispatcher(updateReceiptDb({ _id, items: newItem }));
            }
          }}
        >
          <div>
            <input
              defaultValue={1}
              min="1"
              max="15"
              type="number"
              name="counter"
            />
          </div>
          <div>
            <button type="submit">+</button>
          </div>
        </form>
      </div>
    )
  );
  return (
    <div>
      <div className={receiptRenderItems.flexRowDiv}>
        <div>اسم المنتج</div>
        <div>سعر</div>
        <div>سعر جمله</div>
        <div>barcode</div>
        <div>عدد</div>
        <div>اضافه للفاتوره</div>
      </div>
      {renderItems.length > 3
        ? renderItems.slice(counter === 3 ? 0 : counter - 3, counter)
        : renderItems}
      {renderItems.length > 3 && renderItems.length - counter > 0 && (
        <button onClick={() => setCounter((prev) => prev + 3)}>&lt;</button>
      )}
      {renderItems.length > 3 && counter - 3}
      {renderItems.length > 3 && counter !== 3 && (
        <button onClick={() => setCounter((prev) => prev - 3)}> &gt;</button>
      )}
    </div>
  );
};

export default RenderItemsForReceipt;
