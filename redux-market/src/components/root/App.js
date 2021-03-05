import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CartDetail from '../cart/CartDetail';
import Navi from '../navi/Navi';
import AddOrUpdateProduct from '../products/AddOrUpdateProduct';
import Dashboard from './Dashboard';
import NotFound from '../common/NotFound';

function App() {
  return (
    <div>
      <Navi/>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/product" exact component={Dashboard} />
        <Route path="/cart" exact component={CartDetail} />
        <Route path="/saveproduct/:productId" component={AddOrUpdateProduct} />
        <Route path="/saveproduct/" exact component={AddOrUpdateProduct} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
