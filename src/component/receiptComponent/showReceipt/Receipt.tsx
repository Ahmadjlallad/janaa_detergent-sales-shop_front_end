import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  queryReceipt,
  deleteReceipt,
} from "../../../features/receipt/showReceipt";
import showReceiptCss from "./showReceiptCss.module.css";
import RenderItemInSelectedReceipt from "./RenderItemInSelectedReceipt";
import { ReceiptArray, todayDate } from "../../../features/receipt/receipt";

// const extractNumberFromObj = (obj, extractFrom: string) => {
//   // obj.map(({ extractFrom }) => extractFrom)
//   //   .reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
// };
interface Obj {
  total?: number;
  netProfit?: number;
}
function extractNumberFromObj<Type extends Obj>(
  arr: Type[],
  extractFrom: "total" | "netProfit"
): number {
  if (arr.length === 0) return 0;
  return arr
    .map((obj) => obj[extractFrom] ?? 0)
    .reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
}
const Receipt = () => {
  const dispatcher = useAppDispatch();
  const receipt = useAppSelector((state) => state.showReceipt);
  const [selectedDate, setSelectedDate] = useState<string>(todayDate);
  useEffect(() => {
    dispatcher(queryReceipt({ q: "date", value: selectedDate }));
  }, [dispatcher, selectedDate]);

  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  return (
    <div>
      <h1 dir="ltr">Receipt</h1>
      <div>
        <input
          type="date"
          name="date"
          id="date"
          onChange={(e) => {
            setSelectedDate(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className={showReceiptCss.flexRow} style={{ width: "95%" }}>
        <div>رقم الفتوره لليوم</div>
        <div>تاريخ</div>
        <div>الوقت</div>
        <div>السعر الكلي</div>
        <div>ربح الاجمالي</div>
      </div>
      {receipt.showMyReceipt.map((receipt) => (
        <div key={receipt._id}>
          <div
            className={showReceiptCss.border}
            style={{
              cursor: "pointer",
              transition:
                selectedReceipt === receipt._id ? "all 0.5s ease-in-out" : "",
            }}
            onClick={(e) => {
              console.log(e.target !== e.currentTarget.querySelector("button"));
              if (e.target !== e.currentTarget.querySelector("button")) {
                if (selectedReceipt === receipt._id) setSelectedReceipt(null);
                else setSelectedReceipt(receipt._id || null);
              }
            }}
          >
            <div className={showReceiptCss.flexRow}>
              <div>{receipt.receiptNumberForThisDay}</div>
              <div>{receipt.date}</div>
              <div>{receipt.time}</div>
              <div>{receipt.netProfit}</div>
              <div>{receipt.total}</div>
              <div>
                <button
                  onClick={() => dispatcher(deleteReceipt(receipt._id ?? ""))}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              receipt._id === selectedReceipt
                ? showReceiptCss.show
                : showReceiptCss.hide
            }
          >
            <div
              className={`${showReceiptCss.flexRow} ${showReceiptCss.items}`}
            >
              <div>الاسم</div>
              <div>باركود</div>
              <div>سعر</div>
              <div>سعر الجمله</div>
              <div>الكميه</div>
              <div>السعر الكلي</div>
              <div>السعر الاجمالي</div>
            </div>
            {receipt.items.map((item) => (
              <RenderItemInSelectedReceipt item={item} key={item._id} />
            ))}
          </div>
        </div>
      ))}
      <div>
        {receipt.showMyReceipt.length > 0 &&
          extractNumberFromObj<ReceiptArray>(
            receipt.showMyReceipt,
            "netProfit"
          )}
      </div>
      <div>
        {receipt.showMyReceipt.length > 0 &&
          extractNumberFromObj<ReceiptArray>(receipt.showMyReceipt, "total")}
      </div>
    </div>
  );
};

export default Receipt;
