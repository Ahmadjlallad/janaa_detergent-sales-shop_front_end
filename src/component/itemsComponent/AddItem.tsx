import { addItem } from "./../../features/items/items";
import FormHelper from "./form/FormHelper";

const AddItem = () => {
  return (
    <div>
      <FormHelper
        dispatcher={addItem}
        initialValues={{ barcodeState: true }}
        id={undefined}
      />
    </div>
  );
};

export default AddItem;
