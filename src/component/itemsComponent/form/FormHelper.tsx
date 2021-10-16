import { Form, Field } from "react-final-form";
import { ReactElement } from "react";
import { useAppDispatch } from "./../../../app/hooks";
import FormHelperCss from "./FormHelper.module.css";
import inputFiled, { IntiValues, Props, validate } from "./FormHelperFunctions";

export default function FormHelper({
  initialValues,
  dispatcher,
  id,
}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const handleSubmit = ({
    name,
    price,
    barcode,
    wholesalePrice,
    barcodeState,
  }: IntiValues) => {
    console.log(barcodeState ? barcode : null);
    if (id) {
      if (barcodeState)
        dispatch(
          dispatcher({
            name,
            price,
            barcode,
            wholesalePrice,
            id,
          })
        );
      else
        dispatch(
          dispatcher({
            name,
            price,
            wholesalePrice,
            id,
            barcode: barcodeState ? barcode : null,
          })
        );
    } else {
      if (barcodeState)
        dispatch(dispatcher({ name, price, barcode, wholesalePrice }));
      else dispatch(dispatcher({ name, price, wholesalePrice }));
    }
  };

  return (
    <div className={FormHelperCss.formContainer}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
      >
        {({ handleSubmit, submitting, pristine, values, form }) => (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              form.reset();
              form.restart();
            }}
            className={FormHelperCss.formHelper}
          >
            {inputFiled("name", "ادخل الاسم", FormHelperCss.inputFormHelper)}
            <div>
              هل يوجد باركود؟
              <Field
                name="barcodeState"
                component="input"
                type="checkbox"
                defaultValue={true}
              />
            </div>
            {values.barcodeState &&
              inputFiled(
                "barcode",
                "ادخل barcode",
                FormHelperCss.inputFormHelper
              )}
            {inputFiled("price", "ادخل سعر", FormHelperCss.inputFormHelper)}
            {inputFiled(
              "wholesalePrice",
              "ادخل سعر الجمله",
              FormHelperCss.inputFormHelper
            )}
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={() => form.reset()}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </form>
        )}
      </Form>
    </div>
  );
}
