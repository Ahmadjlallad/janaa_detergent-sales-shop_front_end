import * as React from "react";
import { Link } from "react-router-dom";
import headerCss from "./Header.module.css";
export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className={headerCss.navbar}>
        <Link className={headerCss.links} to="/">
          محاسبه
        </Link>
        <Link className={headerCss.links} to="/Add">
          اظف منتج
        </Link>
      </div>
    );
  }
}
