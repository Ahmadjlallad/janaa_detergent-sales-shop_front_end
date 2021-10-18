import * as React from "react";
import { Link } from "react-router-dom";
import headerCss from "./Header.module.css";
import { connect } from "react-redux";
import { ReceiptArray } from "./../features/receipt/receipt";
export interface IAppProps {
  receipts?: ReceiptArray[] | any[] | any;
}

class App extends React.Component<IAppProps> {
  public render() {
    const { receipts } = this.props;
    console.log(receipts);
    return (
      <div className={headerCss.navbar}>
        <Link className={headerCss.links} to="/addReceipt/null">
          محاسبه
        </Link>
        {receipts?.length > 0 &&
          receipts.map(({ _id, receiptNumber }: ReceiptArray) => (
            <Link
              key={_id}
              className={headerCss.links}
              to={`/addReceipt/${_id}`}
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
  return { receipts: state.receiptState.receipt };
};
export default connect(mapStateToProps, {})(App);
