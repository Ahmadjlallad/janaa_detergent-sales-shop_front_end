import { Receipt } from "../../../features/receipt/receipt";
import showReceiptCss from "./showReceiptCss.module.css";

interface Props {
  item: Receipt;
}

const RenderItemInSelectedReceipt = ({ item }: Props) => {
  return (
    <div key={item._id}>
      <div className={`${showReceiptCss.flexRow} ${showReceiptCss.items}`}>
        <div>{item.name}</div>
        <div>{item.barcode ? item.barcode : "لا يوجد"}</div>
        <div>{item.price}</div>
        <div>{item.wholesalePrice}</div>
        <div>{item.quantity}</div>
        <div>{item.totalPrice}</div>
        <div>{item.wholesalePriceTotalPrice}</div>
      </div>
    </div>
  );
};

export default RenderItemInSelectedReceipt;
