import React, { useState } from "react";
import receiptRenderItems from "./receiptRenderItems.module.css";
import { Item, ItemsState } from "../../features/items/items";

interface Props {
  _id: string;
  items: ItemsState;
  setOnItemChange: any;
}

const RenderItemsForReceipt = ({ _id, items, setOnItemChange }: Props) => {
  const [counter, setCounter] = useState(3);

  const test = React.useCallback(
    ({ name, price, wholesalePrice, barcode, _id: item_id }: Item) => (
      <div key={item_id} className={receiptRenderItems.flexRowDiv}>
        <div>{name}</div>
        <div>{price}</div>
        <div>{wholesalePrice}</div>
        <div>{barcode ? barcode : "لا يوجد"}</div>
        <div>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              setOnItemChange({
                name,
                price,
                wholesalePrice,
                barcode,
                _id: item_id,
                itemQuantity: +e.target.quantity.value,
                r5_id: _id,
              });
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
      </div>
    ),
    [_id, setOnItemChange]
  );

  const renderItems = items.items.map((item) => test(item));

  return (
    <div>
      <div className={receiptRenderItems.flexRowDiv}>
        <div>اسم المنتج</div>
        <div>سعر</div>
        <div>سعر جمله</div>
        <div>barcode</div>

        <div>اضافه للفاتوره</div>
      </div>

      {renderItems.length > 3
        ? renderItems.slice(counter === 3 ? 0 : counter - 3, counter)
        : renderItems}
      <div className={receiptRenderItems.flexRowButtons}>
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
            <button onClick={() => setCounter((prev) => prev - 3)}>
              {" "}
              &gt;
            </button>
          ) : (
            <button disabled onClick={() => setCounter((prev) => prev - 3)}>
              &gt;
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(RenderItemsForReceipt);
