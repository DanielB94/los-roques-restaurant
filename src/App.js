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


function App() {
  const apiUrl = 'http://localhost:3200';
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([])
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [reward, setReward] = useState(null);
  const [option, setOption] = useState(null);
  
  socket.on('connect', () => console.log('Connected to server'));

  function Item(name, price, mods, image, category, reward, priceInCents, quantity) {
    this.name = name
    this.price = price
    this.mods = mods
    this.image = image
    this.category = category
    this.reward = reward
    this.priceInCents = priceInCents
    this.quantity = 1
  }

  const handlerAddButton = (product, mods) => {

    const newItem = new Item(product.name, product.price, mods, product.image, product.category, product.reward, product.priceInCents);
    setCartItems([...cartItems, newItem]);
  }

  return (
    <Router>
      <ApiUrlContext.Provider value={apiUrl}>
        <OrderContext.Provider value={{orders, setOrders}}>
          <UserContext.Provider value={{ userInfo, setUserInfo}}>
            <MenuContext.Provider value={[category, setCategory]}>
              <ErrorContext.Provider value={{error, setError}}>
                <RewardContext.Provider value={{reward, setReward}}>
                  <OptionContext.Provider value={{option, setOption}}>
              <NavBar cartItems={cartItems}/>
              <RouteSwitch cartItems={cartItems} setCartItems={setCartItems} handlerAddButton={handlerAddButton} orders={orders}/>
                </OptionContext.Provider>
              </RewardContext.Provider>
            </ErrorContext.Provider>
            </MenuContext.Provider>
          </UserContext.Provider>
          </OrderContext.Provider>
        </ApiUrlContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
