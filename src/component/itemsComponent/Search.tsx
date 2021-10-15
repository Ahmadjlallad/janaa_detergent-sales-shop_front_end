import { ReactElement } from "react";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import "./Search.css";
import { Item } from "./../../features/items/items";
import SearchForm from "./SearchForm";
import EditItem from "./EditItem";
export default function Search(): ReactElement {
  const search = useAppSelector((state: RootState) => state.items);
  console.log(search);
  console.log(typeof search);
  return (
    <div className="container-search">
      <SearchForm />
      {search.items.length > 0 && (
        <EditItem initialValues={search.items[0] as Item} />
      )}
    </div>
  );
}
