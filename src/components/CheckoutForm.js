import { React, useCallback, useContext } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { OptionContext } from '../context/OptionContext';

const stripePromise = loadStripe("pk_test_51Pg8t9RuLD47u0xXTF5u2l5IMcbweVzFJRkBnirmuArI2E4mNBRkilsK27bqtEaKsFTIPdYdjviwpXTJQPgWuYdH00gJM7wQs6");

const CheckoutForm = () => {
    
    const { option } = useContext(OptionContext);

  return (
    <div className='checkout'>
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
