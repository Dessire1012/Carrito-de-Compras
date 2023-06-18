import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Productos} />
          <Route path="/carrito" component={Carrito} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
