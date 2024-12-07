import { React, useCallback, useContext } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout
} from '@stripe/react-stripe-js';
import './styles/checkout.css';
import { OptionContext } from '../context/OptionContext';
import { X } from 'lucide-react';

const stripePromise = loadStripe("pk_test_51Pg8t9RuLD47u0xXTF5u2l5IMcbweVzFJRkBnirmuArI2E4mNBRkilsK27bqtEaKsFTIPdYdjviwpXTJQPgWuYdH00gJM7wQs6");

const CheckoutForm = (props) => {
    const { setCheckoutVisible } = props;
    const { option } = useContext(OptionContext);

  return (
    <div className='checkout'>
      <button className='x dropBtns' onClick={() => setCheckoutVisible(false)}><X size={16}/></button>
        <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={option}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutForm;
