import * as React from "react";
import { Link } from "react-router-dom";
import headerCss from "./Header.module.css";
import { connect } from "react-redux";
import { addReceiptDb, ReceiptArray } from "./../features/receipt/receipt";
import { RouteChildrenProps } from "react-router";
import Clock from "./clock/Clock";
export interface IAppProps extends RouteChildrenProps {
  receipts?: ReceiptArray[] | any[] | any;
  status?: string;
  addReceiptDb: any;
}

class App extends React.Component<IAppProps> {
  public render() {
    const { receipts } = this.props;
    console.log(this.props.location.pathname.split("/")[1]);
    return (
      <div className={headerCss.navbar}>
        <div style={{ color: "#eeeeee" }}>{/* <Clock /> */}</div>
        <button
          onClick={() => {
            this.props.addReceiptDb();
          }}
        >
          فتوره جديده
        </button>
        <div>
          <Link
            className={headerCss.links}
            to={`/receipt/${receipts.length > 0 ? receipts[0]._id : null}`}
            style={{
              color:
                this.props.location.pathname.split("/")[1] === "receipt"
                  ? "var(--header--selected-link)"
                  : "",
            }}
          >
            محاسبه
          </Link>
          <div className={headerCss.ReceiptsLinksContainer}>
            {receipts?.length > 0 &&
              receipts.map(({ _id, receiptNumberForThisDay }: ReceiptArray) => (
                <Link
                  key={_id}
                  className={headerCss.ReceiptsLinks}
                  to={`/receipt/${_id}`}
                  style={{
                    color:
                      this.props.location.pathname.split("/")[2] === _id
                        ? "#000"
                        : "#d9dafc",
                  }}
                >
                  فتوره رقم: {receiptNumberForThisDay}
                </Link>
              ))}
          </div>
        </div>
        <Link
          className={headerCss.links}
          to="/"
          style={{
            color:
              this.props.location.pathname.split("/")[1] === ""
                ? "var(--header--selected-link)"
                : "",
          }}
        >
          منتجات
        </Link>
        <Link
          className={headerCss.links}
          to="/AddItem"
          style={{
            color:
              this.props.location.pathname.split("/")[1] === "AddItem"
                ? "var(--header--selected-link)"
                : "",
          }}
        >
          اظف منتج
        </Link>
        <Link
          className={headerCss.links}
          to="/receipts"
          style={{
            color:
              this.props.location.pathname.split("/")[1] === "receipts"
                ? "#854894"
                : "",
          }}
        >
          ملخص الفواتير
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    receipts: state.receiptState.receipt,
    status: state.receiptState.status,
  };
};
export default connect(mapStateToProps, { addReceiptDb })(
  React.memo(App, (prev, next) => {
    return (
      prev.receipts.length === next.receipts.length &&
      prev.location.pathname === next.location.pathname
    );
  })
);
