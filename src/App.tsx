import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItem from "./component/itemsComponent/AddItem";
import Search from "./component/itemsComponent/Search";
import Headers from "./component/Header";
import NewReceipt from "./component/receiptComponent/NewReceipt";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="right">
          <Headers />
        </div>
        <div className="left">
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/addItem" component={AddItem} />
            <Route path="/addReceipt/:_id" component={NewReceipt} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
