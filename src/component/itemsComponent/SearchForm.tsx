import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import { Form, Field } from "react-final-form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { queryAllItems, setQuery } from "./../../features/items/items";

import "./Search.css";
interface props {
  mainCssClass?: string;
  inputContainerCssClass?: string;
  inputCssClass?: string;
}
type FormData = {
  search: string;
  change: string;
};
function SearchForm({
  mainCssClass,
  inputContainerCssClass,
  inputCssClass,
}: props): ReactElement {
  const dispatch = useAppDispatch();
  const handleSubmit = ({ search, change }: FormData) => {
    dispatch(setQuery({ value: search, type: change }));
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
            <form
              onSubmit={handleSubmit}
              className={mainCssClass ? mainCssClass : `search-form`}
            >
              <div
                className={
                  inputContainerCssClass
                    ? inputContainerCssClass
                    : `Search-form--inp--container`
                }
              >
                {values.change !== "all" ? (
                  <Field name="search" component="input" />
                ) : null}
                <Field
                  name="change"
                  component="select"
                  defaultValue="name"
                  className={
                    inputCssClass ? inputCssClass : `Search-form--inp--select`
                  }
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
export default React.memo(SearchForm);
