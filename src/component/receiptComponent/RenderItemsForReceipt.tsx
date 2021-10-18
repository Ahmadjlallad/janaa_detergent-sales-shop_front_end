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
import { calculateTotalPrice, detectChanges } from "./Helpers/ReceiptHelper";
import { Item } from "../../features/items/items";

interface Props {
  _id: string;
  receipt: ReceiptArray | any;
}

const RenderItemsForReceipt = ({ _id, receipt }: Props) => {
  const [counter, setCounter] = useState(3);

  const dispatcher = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.items);
  const renderItems = items.items.map(
    ({ name, price, wholesalePrice, barcode, _id: item_id }) => (
      <div key={item_id} className={receiptRenderItems.flexRowDiv}>
        <div>{name}</div>
        <div>{price}</div>
        <div>{wholesalePrice}</div>
        <div>{barcode ? barcode : "لا يوجد"}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let didNotChangedQuantity: Receipt[] = receipt?.items?.filter(
              (receipt: Receipt) =>
                detectChanges("old", { barcode, name } as Item, receipt)
            );
            let changedQuantity: Receipt = receipt?.items?.find(
              (receipt: Receipt) =>
                detectChanges("new", { barcode, name } as Item, receipt)
            );
            // console.log("oldItems", didNotChangedQuantity);
            // console.log("changedQuantity", changedQuantity);
            const myTarget: any = e.target;
            if (didNotChangedQuantity === undefined) didNotChangedQuantity = [];
            if (changedQuantity) {
              changedQuantity = { ...changedQuantity };
              changedQuantity.quantity =
                changedQuantity.quantity + +myTarget.quantity.value;
              changedQuantity.totalPrice =
                changedQuantity.wholesalePriceTotalPrice = calculateTotalPrice(
                  wholesalePrice,
                  changedQuantity.quantity
                );
              changedQuantity.totalPrice = calculateTotalPrice(
                price,
                changedQuantity.quantity
              );
              const newItem: Receipt[] = [
                ...didNotChangedQuantity,
                { ...changedQuantity },
              ];
              dispatcher(updateReceiptDb({ ...receipt, _id, items: newItem }));
            } else {
              didNotChangedQuantity.push({
                name,
                barcode,
                price,
                quantity: +myTarget.quantity.value,
                wholesalePrice,
                totalPrice: calculateTotalPrice(
                  price,
                  +myTarget.quantity.value
                ),
                wholesalePriceTotalPrice: calculateTotalPrice(
                  wholesalePrice,
                  +myTarget.quantity.value
                ),
              });
              dispatcher(
                updateReceiptDb({
                  ...receipt,
                  items: didNotChangedQuantity,
                  _id,
                })
              );
            }
            // console.log(+myTarget.quantity.value);
          }}
        >
          <div>
            <input
              defaultValue={1}
              min="1"
              max="15"
              type="number"
              name="quantity"
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
      {renderItems.length > 0 && renderItems.length > 3 ? (
        renderItems.length > 3 && renderItems.length - counter > 0 ? (
          <button onClick={() => setCounter((prev) => prev + 3)}>&lt;</button>
        ) : (
          <button
            disabled={true}
            onClick={() => setCounter((prev) => prev + 3)}
          >
            &lt;
          </button>
        )
      ) : null}
      <div>{renderItems.length > 3 && counter - 3}</div>
      {renderItems.length > 0 && renderItems.length > 3 ? (
        renderItems.length > 3 && counter !== 3 ? (
          <button onClick={() => setCounter((prev) => prev - 3)}> &gt;</button>
        ) : (
          <button disabled onClick={() => setCounter((prev) => prev - 3)}>
            &gt;
          </button>
        )
      ) : null}
    </div>
  );
};

export default RenderItemsForReceipt;
