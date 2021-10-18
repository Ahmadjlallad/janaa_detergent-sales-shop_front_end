import * as React from "react";
import { Link } from "react-router-dom";
import headerCss from "./Header.module.css";
import { connect } from "react-redux";
import { ReceiptArray } from "./../features/receipt/receipt";
import { RouteChildrenProps } from "react-router";

export interface IAppProps extends RouteChildrenProps {
  receipts?: ReceiptArray[] | any[] | any;
  status?: string;
}

class App extends React.Component<IAppProps> {
  public render() {
    const { receipts } = this.props;
    return (
      <div className={headerCss.navbar}>
        <Link
          className={headerCss.links}
          to={`/receipt/${receipts.length > 0 ? receipts[0]._id : null}`}
        >
          محاسبه
        </Link>
        {receipts?.length > 0 &&
          receipts.map(({ _id, receiptNumber }: ReceiptArray) => (
            <Link
              key={_id}
              className={headerCss.links}
              to={`/receipt/${_id}`}
              style={{
                color:
                  this.props.location.pathname.split("/")[2] === _id
                    ? "#e84545"
                    : "#d9dafc",
              }}
            >
              فتوره رقم: {receiptNumber}
            </Link>
          ))}
        <Link className={headerCss.links} to="/">
          منتجات
        </Link>
        <Link className={headerCss.links} to="/AddItem">
          اظف منتج
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
export default connect(mapStateToProps, {})(App);
