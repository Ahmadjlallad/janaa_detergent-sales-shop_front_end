import FormHelper from "./form/FormHelper";
import { updateItem } from "./../../features/items/items";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./model.css";
interface InitialValues {
  name: string;
  barcode?: string | null | undefined;
  price: number;
  wholesalePrice: number;
  _id?: string;
}
interface Props {
  initialValues: InitialValues;
}
const EditItem = ({ initialValues }: Props) => {
  const [state, setState] = useState(false);
  const ModRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ModRef.current) {
      ModRef.current.focus();
    }
    const ModRefInuseEffect = ModRef.current;
    ModRef.current?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        setState(false);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setState(false);
      }
    });
    return () => {
      ModRefInuseEffect?.removeEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          setState(false);
        }
      });
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setState(false);
        }
      });
    };
  }, [ModRef, state]);
  return (
    <>
      <button
        onClick={() => {
          setState(true);
        }}
      >
        تعديل
      </button>
      {state &&
        ReactDOM.createPortal(
          <div className="model-container" ref={ModRef}>
            <div className="model-centered">
              <FormHelper
                dispatcher={updateItem}
                initialValues={{
                  ...initialValues,
                  barcodeState: initialValues.barcode ? true : false,
                }}
                _id={initialValues._id}
              />
              <button
                onClick={() => {
                  setState(false);
                }}
              >
                اغلاق
              </button>
            </div>
          </div>,
          document.getElementById("modal") as HTMLElement
        )}{" "}
    </>
  );
};
export default EditItem;
