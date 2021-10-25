import { Router, Switch, Route } from "react-router-dom";
import AddItem from "./component/itemsComponent/AddItem";
import Search from "./component/itemsComponent/Search";
import Headers from "./component/Header";
import NewReceipt from "./component/receiptComponent/NewReceipt";
import MyHistory from "./MyHistory";
import ShowReceipt from "./component/receiptComponent/showReceipt/Receipt";
function App() {
  return (
    <div className="App">
      <Router history={MyHistory}>
        <div className="right">
          <Route path="/" component={Headers} />
        </div>
        <div className="left">
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/addItem" component={AddItem} />
            <Route path="/receipts" component={ShowReceipt} />
            <Route path="/receipt/:_id" component={NewReceipt} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
