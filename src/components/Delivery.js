import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { ApiUrlContext } from '../context/ApiUrlContext';
import { Autocomplete, GoogleMap, useJsApiLoader, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';


const Delivery = (props) => {

    const libraries = ['places'];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBy0XJopJw9Ls3XjTlBaHu_ZBfZV5z3Jvs', // Replace with your actual API key
        libraries: ['places']
      });

    const { destination, setDestination } = props;

    const apiUrl = useContext(ApiUrlContext);

    const autocompleteRef = useRef(null);

    const [direction, setDirection] = useState(null);
    const [houseNumber, setHouseNumber] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [ valueTotal, setValueTotal] = useState(null);

    const deliveryHandler = async (e) => {
        e.preventDefault();
        setDestination(`${direction} ${houseNumber} ${zipCode}`);
        
        const result = await axios.post(`${apiUrl}/api/delivery`, {destination}, { withCredentials: true })
        let value = result.data.distance[0].map(r => r.value);
        setValueTotal((value / 1000) / 1.6 * 1.7);
        console.log(valueTotal);
    }

    const handleOnPlaceChanged = () => {
        let address = autocompleteRef.current.getPlaces();
        console.log(address);
    }

  return (
    <div>
        {!isLoaded ? <div>Loading...</div> : 
            <form onSubmit={deliveryHandler}>
            <StandaloneSearchBox
                onLoad={(ref) => autocompleteRef.current = ref}
                onPlacesChanged={handleOnPlaceChanged}>

                <input type="text" placeholder='Direccion' onChange={(e) => {setDirection(e.target.value); console.log(direction)}} required/>
            </StandaloneSearchBox>
        <input type="text" placeholder='Numero casa/apto' onChange={(e) => setHouseNumber(e.target.value)} required/>
        <button>Consultar</button>
      </form>
        }
    </div>
  )
}

export default Delivery;
