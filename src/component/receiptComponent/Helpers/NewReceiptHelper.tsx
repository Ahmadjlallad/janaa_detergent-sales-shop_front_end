import { AppDispatch } from "../../../app/store";
import { Item } from "../../../features/items/items";
import {
  Receipt,
  ReceiptArray,
  updateReceiptDb,
} from "../../../features/receipt/receipt";
import { calculateTotalPrice, DetectChanges } from "./ReceiptHelper";

interface newItem extends Item {
  itemQuantity: number;
}
export const setQuantityFromSearch = (
  receipt: ReceiptArray,
  detectChanges: DetectChanges,
  { name, price, wholesalePrice, barcode, itemQuantity }: newItem,
  dispatcher: AppDispatch,
  _id: string
) => {
  let didNotChangedQuantity: Receipt[] = receipt?.items?.filter(
    (receipt: Receipt) =>
      detectChanges("old", { barcode, name } as Item, receipt)
  );

  let changedQuantity: Receipt | any = receipt?.items?.find(
    (receipt: Receipt) =>
      detectChanges("new", { barcode, name } as Item, receipt)
  );
  // console.log("oldItems", didNotChangedQuantity);
  // console.log("changedQuantity", changedQuantity);
  if (didNotChangedQuantity === undefined) didNotChangedQuantity = [];
  if (changedQuantity) {
    changedQuantity = { ...changedQuantity };
    changedQuantity.quantity = changedQuantity.quantity + itemQuantity;
    changedQuantity.totalPrice = changedQuantity.wholesalePriceTotalPrice =
      calculateTotalPrice(wholesalePrice, changedQuantity.quantity);
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
      quantity: itemQuantity,
      wholesalePrice,
      totalPrice: calculateTotalPrice(price, itemQuantity),
      wholesalePriceTotalPrice: calculateTotalPrice(
        wholesalePrice,
        itemQuantity
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
};
