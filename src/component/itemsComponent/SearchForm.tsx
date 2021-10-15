import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import { Form, Field } from "react-final-form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { queryAllItems } from "./../../features/items/items";

import "./Search.css";

type FormData = {
  search: string;
  change: string;
};
export default function SearchForm(): ReactElement {
  const dispatch = useAppDispatch();
  const handleSubmit = ({ search, change }: FormData) => {
    console.log(search, change);
    if (change === "all")
      dispatch(queryAllItems({ value: search, type: change }));
    else
      dispatch(
        queryAllItems({
          value: search,
          type: change,
        })
      );
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit} className="search-form">
              <div className="Search-form--inp--container">
                {values.change !== "all" ? (
                  <Field name="search" component="input" />
                ) : null}
                <Field
                  name="change"
                  component="select"
                  defaultValue="name"
                  className="Search-form--inp--select"
                >
                  <option value="barcode">barcode</option>
                  <option value="name">الاسم</option>
                  <option value="all">كل المنتجات</option>
                </Field>
              </div>
              {values.search ? (
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} size="2x" />
                </button>
              ) : values.change === "all" ? (
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} size="2x" />
                </button>
              ) : (
                <button type="submit" disabled>
                  <FontAwesomeIcon icon={faSearch} size="2x" />
                </button>
              )}
            </form>
          );
        }}
      </Form>
    </>
  );
}
