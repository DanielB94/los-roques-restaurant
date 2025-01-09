import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { ApiUrlContext } from '../context/ApiUrlContext';
import { Autocomplete, GoogleMap, useJsApiLoader, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import './styles/deliveryModal.css'

const Delivery = (props) => {
    const libraries = ['places'];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API, // Replace with your actual API key
        libraries: ['places']
      });

    const { destination, setDestination, deliveryTotal, setDeliveryTotal, deliveryModal, setDeliveryModal, handlerAddButton } = props;

    const apiUrl = useContext(ApiUrlContext);

    const autocompleteRef = useRef(null);

    const [direction, setDirection] = useState(null);
    const [houseNumber, setHouseNumber] = useState(null);

    const deliveryPriceHandler = async (e) => {
        e.preventDefault();
        
        const result = await axios.post(`${apiUrl}/api/delivery`, {destination}, { withCredentials: true })
        
        let value = result.data.distance[0].map(r => r.value);
        let valueInMiles = value / 1000 / 1.6;
        let price = valueInMiles * 1.7;
        let formattedPrice = price.toFixed(2);

        if (valueInMiles <= 5 ) {
            setDeliveryTotal(8.5);
        } else {
            setDeliveryTotal(formattedPrice);
        }
        setDirection(`${destination} ${houseNumber}`);
        console.log(value);
        console.log(deliveryTotal);
        console.log(direction);
    }
    
    const handleOnPlaceChanged = () => {
        let address = autocompleteRef.current.getPlaces();
        console.log(address);
        setDirection(address[0].formatted_address);
        setDestination(address[0].formatted_address);
        console.log(direction);
    }

    const cancelDelivery = () => {
        setDeliveryTotal(0);
        setDeliveryModal(false);
    }

    const product = {
        name: 'Delivery',
        price: deliveryTotal,
        priceInCents: deliveryModal * 100,
        image: undefined,
        category: undefined,
        reward: undefined,
        quantity: 1
    }

    const deliveryHandler = (product) => {
        handlerAddButton(product)
        setDeliveryModal(false);
    }

  return (
    <div className='deliveryContainer'>
        {!isLoaded ? <div>Loading...</div> :
            <div className='deliveryModal'>
                <button className='x' onClick={cancelDelivery}>X</button>
                <form onSubmit={deliveryPriceHandler}>
                    <StandaloneSearchBox
                        onLoad={(ref) => autocompleteRef.current = ref}
                        onPlacesChanged={handleOnPlaceChanged}>

                        <input type="text" placeholder='Direccion' required/>
                    </StandaloneSearchBox>
                    <input type="text" placeholder='Numero casa/apto' onChange={(e) => setHouseNumber(e.target.value)} required/>
                    <button className='cta'>Consultar</button>
                </form>
                {deliveryTotal === 0 ? null :
                    <div className='deliveryInfo'>
                        <p>El precio del delivery es de: ${deliveryTotal}</p>
                        <button className='cta' onClick={deliveryHandler(product)}>Agregar delivery</button>
                        <button className='cta' onClick={cancelDelivery}>Cancelar</button>
                    </div>
                }
            </div>
        }
    </div>
  )
}

export default Delivery;
