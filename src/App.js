import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ShowDetails from './Views/ShowDetails/ShowDetails';
import ShowProducts from './Views/ShowProducts/ShowProducts';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ShowProducts />
          </Route>
          <Route exact path="/slideshow">
            <ShowDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
