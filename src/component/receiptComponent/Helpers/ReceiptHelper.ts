import { Receipt } from "../../../features/receipt/receipt";
import { Item } from "../../../features/items/items";

export const detectChanges = (
  typeOfChange: string,
  { barcode: itemBarcode, name: ItemName }: Item,
  { barcode: receiptBarcode, name: receiptItemName }: Receipt
) => {
  if (typeOfChange === "old") {
    if (itemBarcode) return itemBarcode !== receiptBarcode;
    else return ItemName !== receiptItemName;
  }
  if (typeOfChange === "new") {
    if (itemBarcode) return itemBarcode === receiptBarcode;
    else return ItemName === receiptItemName;
  }
};
export const calculateTotalPrice = (itemPrice: number, quantity: number) => {
  return itemPrice * quantity;
};
export const calculateTotalPriceReceipt = (items: Receipt[]) => {
  // console.log(items);
  return [
    items.reduce((acc, { totalPrice }) => acc + totalPrice, 0),
    items.reduce(
      (acc, { wholesalePriceTotalPrice }) => acc + wholesalePriceTotalPrice,
      0
    ),
  ];
};
