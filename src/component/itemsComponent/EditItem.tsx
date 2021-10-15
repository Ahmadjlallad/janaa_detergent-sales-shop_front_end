import FormHelper from "./form/FormHelper";
import { updateItem } from "./../../features/items/items";

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
  return (
    <div>
      <FormHelper
        dispatcher={updateItem}
        initialValues={initialValues}
        id={initialValues._id}
      />
    </div>
  );
};
export default EditItem;
