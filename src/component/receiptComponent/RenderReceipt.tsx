import React from "react";
import { ReceiptArray, Receipt } from "./../../features/receipt/receipt";
import receiptRenderItems from "./receiptRenderItems.module.css";
interface Props {
  receipt: ReceiptArray[];
  _id: string;
}

const RenderReceipt = ({ receipt, _id }: Props) => {
  const myReceipt: ReceiptArray | any = receipt.find(
    ({ _id: id }) => id === _id
  );

  const renderItems = myReceipt?.items.map(
    ({ name, price, wholesalePrice, barcode, _id }: Receipt) => (
      <div key={_id} className={receiptRenderItems.flexRowDiv}>
        <div>{name}</div>
        <div>{price}</div>
        <div>{wholesalePrice}</div>
        <div>{barcode ? barcode : "لا يوجد barcode"}</div>
        <div>
          <button onClick={() => {}}>عدد</button>
        </div>
        <div>
          <button>Delete</button>
        </div>
      </div>
    )
  );
  return <div>{renderItems}</div>;
};

export default RenderReceipt;
