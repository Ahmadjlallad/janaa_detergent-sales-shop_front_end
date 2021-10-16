import type { AddItem, UpdateItem } from "../../../features/items/items";
import { Field } from "react-final-form";

export type IntiValues = {
  name?: string;
  price?: number;
  barcode?: string | null | undefined;
  wholesalePrice?: number;
  barcodeState?: boolean;
  id?: string | undefined;
};
export type error = {
  name?: string;
  price?: string;
  barcode?: string;
  wholesalePrice?: string;
};
type e = AddItem | UpdateItem | any;
export interface Props {
  initialValues?: IntiValues | undefined;
  dispatcher: e;
  id?: string;
}
export const validate = (values: any) => {
  const errors: error = {};
  if (!values.name) {
    errors.name = "اجباري";
  }
  if (!values.price) {
    errors.price = "اجباري";
  }
  if (!values.wholesalePrice) {
    errors.wholesalePrice = "اجباري";
  }
  if (values.barcodeState && !values.barcode) {
    errors.barcode = "اجباري";
  }
  return errors;
};
const inputFiled = (name: string, title: string, CssClass: string) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div className={CssClass}>
        <label>{title}</label>

        <input {...input} type="text" placeholder={title} />
        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    )}
  </Field>
);
export default inputFiled;
