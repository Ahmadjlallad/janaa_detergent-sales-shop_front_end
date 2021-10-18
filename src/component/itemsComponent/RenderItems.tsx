import { ReactElement } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Item, deleteItem } from "../../features/items/items";
import "./RenderItems.css";

import EditItem from "./EditItem";
interface items extends Item {
  _id?: string;
}
interface Props {
  selectedItem: items[];
}

export default function RenderItems({ selectedItem }: Props): ReactElement {
  const dispatch = useAppDispatch();
  return (
    <div className="render-items--container">
      <div className="render-items--col">
        <div>اسم المنتج</div>
        <div>barcode</div>
        <div>سعر</div>
        <div>سعر جمله</div>
        <div>تعديل</div>
        <div>حذف</div>
      </div>
      <hr />
      {selectedItem.map(
        ({ name, barcode, price, wholesalePrice, _id }, i, arr) => (
          <div
            className="render-items--col"
            key={name === arr[i - 1]?.name ? i : name}
          >
            <div>{name}</div>
            <div>{barcode ? barcode : "لا يوجد barcode"}</div>
            <div>{price}</div>
            <div>{wholesalePrice}</div>
            <div>
              {" "}
              <EditItem
                initialValues={
                  { name, barcode, price, wholesalePrice, _id } as Item
                }
              />
            </div>
            <div>
              <button
                className="deleteItem"
                onClick={() => dispatch(deleteItem(_id as unknown as string))}
              >
                حذف
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
