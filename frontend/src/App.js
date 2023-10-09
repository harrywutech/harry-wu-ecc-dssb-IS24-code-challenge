import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from "./components/ProductsPage/ProductsPage";
import ProductItemPage from "./components/ProductItemPage/ProductItemPage";
import NewProductPage from "./components/NewProductPage/NewProductPage";
import UpdateProductPage from "./components/UpdateProductPage/UpdateProductPage";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <ProductsPage />
          </Route>
          <Route path="/products/new" exact>
            <NewProductPage />
          </Route>
          <Route path="/products/update/:productId" exact>
            <UpdateProductPage />
          </Route>
          <Route path="/products/item/:productId" exact>
            <ProductItemPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
