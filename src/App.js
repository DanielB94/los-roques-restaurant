import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RouteSwitch from './components/RouteSwitch';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { UserContext } from './context/UserContext';
import { MenuContext } from './context/MenuContext';
import { OrderContext } from './context/OrderContext';
import { ErrorContext } from './context/ErrorContext';
import { RewardContext } from './context/RewardContext';
import { ApiUrlContext } from './context/ApiUrlContext';
import { socket } from './socket';
import { OptionContext } from './context/OptionContext';
import AdminRouter from './components/admin/AdminRouter';
import { AdminContext } from './context/AdminContext';
import AdminNavbar from './components/admin/AdminNavbar';
import { OpenContext } from './context/OpenContext';

function App() {
  const apiUrl = 'https://api.losroquesrestaurant.com';
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([])
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [reward, setReward] = useState(null);
  const [option, setOption] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [storeStatus, setStoreStatus] = useState(true);

  function Item(name, price, mods, picture, category, reward, priceInCents, quantity) {
    this.name = name
    this.price = price
    this.mods = mods
    this.picture = picture
    this.category = category
    this.reward = reward
    this.priceInCents = priceInCents
    this.quantity = 1
  }

  const handlerAddButton = (product, mods) => {

    const newItem = new Item(product.name, product.price, mods, product.picture, product.category, product.reward, product.priceInCents);
    setCartItems([...cartItems, newItem]);
  
  }

  return (
    <Router>
      <OpenContext.Provider value={{storeStatus, setStoreStatus}}>
        <ApiUrlContext.Provider value={apiUrl}>
          <OrderContext.Provider value={{orders, setOrders}}>
            <UserContext.Provider value={{ userInfo, setUserInfo}}>
              <MenuContext.Provider value={[category, setCategory]}>
                <ErrorContext.Provider value={{error, setError}}>
                  <RewardContext.Provider value={{reward, setReward}}>
                    <OptionContext.Provider value={{option, setOption}}>
                      <AdminContext.Provider value={{admin, setAdmin}} >
                        {admin ? <div>
                          <AdminNavbar />
                          <AdminRouter />
                          </div> :
                        <div>
                          <NavBar cartItems={cartItems}/>
                          <RouteSwitch cartItems={cartItems} setCartItems={setCartItems} handlerAddButton={handlerAddButton} orders={orders}/>
                          <Footer />
                        </div>}
                      </AdminContext.Provider>
                    </OptionContext.Provider>
                  </RewardContext.Provider>
                </ErrorContext.Provider>
              </MenuContext.Provider>
            </UserContext.Provider>
          </OrderContext.Provider>
        </ApiUrlContext.Provider>
      </OpenContext.Provider>
    </Router>
  );
}

export default App;
