import React from "react";
import { calculateTotalPrice, detectChanges } from "./ReceiptHelper";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Receipt,
  updateReceiptDb,
  ReceiptArray,
} from "../../../features/receipt/receipt";

interface Props {
  ReceiptItem: Receipt;
  ReceiptItems: ReceiptArray;
  receiptRenderItems: any;
  _id: string;
  i: number;
}

const RenderReceiptItems = ({
  ReceiptItem: {
    name,
    price,
    wholesalePrice,
    barcode,
    _id: item_Id,
    quantity,
    totalPrice,
    // wholesalePriceTotalPrice,
  },
  receiptRenderItems,
  ReceiptItems,
  _id,
  i,
}: Props) => {
  const [changedQuantity, setChangedQuantity] = React.useState<number>(
    quantity || 1
  );
  const dispatcher = useAppDispatch();

  const selectorReceipt = useAppSelector((state) =>
    state.receiptState.receipt.find((receipt) => receipt._id === _id)
  );

  React.useEffect(() => {
    setChangedQuantity(selectorReceipt?.items[i].quantity || quantity);
  }, [selectorReceipt?.items, i, quantity]);

  React.useEffect(() => {
    const filteredReceiptItem: Receipt[] = ReceiptItems.items.filter(
      (a: Receipt) => detectChanges("old", { name, barcode } as any, a)
    );
    let myTimer: any;
    if (changedQuantity !== quantity) {
      filteredReceiptItem.splice(i, 0, {
        name,
        price,
        wholesalePrice,
        barcode,
        quantity: changedQuantity,
        totalPrice: calculateTotalPrice(price, changedQuantity),
        wholesalePriceTotalPrice: calculateTotalPrice(
          wholesalePrice,
          changedQuantity
        ),
      });
      clearTimeout(myTimer);
      myTimer = setTimeout(() => {
        dispatcher(
          updateReceiptDb({
            ...ReceiptItems,
            _id,
            items: [...filteredReceiptItem],
          })
        );
      }, 500);
    }

    return () => {
      // console.log("clean up");
      return clearTimeout(myTimer);
    };
  }, [
    ReceiptItems,
    _id,
    barcode,
    changedQuantity,
    dispatcher,
    i,
    name,
    price,
    quantity,

    wholesalePrice,
  ]);

  return (
    <div>
      <div key={item_Id} className={receiptRenderItems.flexRowDiv}>
        <div>{name}</div>
        <div>{price}</div>
        <div>{wholesalePrice}</div>
        <div>{barcode ? barcode : "لا يوجد"}</div>
        <div>{quantity}</div>
        <div>{totalPrice}</div>
        <div>
          عدد
          <input
            type="number"
            min="1"
            max="15"
            value={changedQuantity}
            onChange={(e) => {
              setChangedQuantity(
                e.target.valueAsNumber === 0 ? 1 : e.target.valueAsNumber
              );
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              const filteredReceiptItem: Receipt[] = ReceiptItems.items.filter(
                (a: Receipt) =>
                  detectChanges("old", { name, barcode } as any, a)
              );
              dispatcher(
                updateReceiptDb({
                  ...ReceiptItems,
                  _id,
                  items: [...filteredReceiptItem],
                })
              );
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RenderReceiptItems);
