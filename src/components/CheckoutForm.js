import { React, useCallback, useContext } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout
} from '@stripe/react-stripe-js';
import './styles/checkout.css';
import { OptionContext } from '../context/OptionContext';
import { X } from 'lucide-react';


const CheckoutForm = (props) => {
  const { setCheckoutVisible, stripePromise } = props;
  const { option } = useContext(OptionContext);
  const stripe = loadStripe(stripePromise.publishableKEY);
  
  return (
    <div className='checkout'>
      <button className='x dropBtns' onClick={() => setCheckoutVisible(false)}><X size={16}/></button>
        <EmbeddedCheckoutProvider
        stripe={stripe}
        options={option}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutForm;
