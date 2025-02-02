import React, { useContext, useState } from 'react';
import './styles/mods.css';
import { X } from 'lucide-react';
import { OpenContext } from '../context/OpenContext';
import StoreStatus from './StoreStatus';

const Modifications = (props) => {
  const {storeStatus, setStoreStatus} = useContext(OpenContext);
    const { isOpen, setIsOpen, handlerAddButton, product, cartItems, fillUp } = props;
    const [ mods, setMods ] = useState([]);

  /// SELECT AN ITEM FROM THE MODS LISTS ///
    const handleCheckboxChange = event => {
      if (event.target.checked) {
        setMods([...mods, event.target.name]);
      } else {
        const filteredData = mods.filter(item => event.target.name === item.name);
        setMods(filteredData);
      }
    }

        return (
            <div className="dropUp">
                <div className="formHeader">
                    <h2>Modificaciones</h2>
                    <button className='x dropBtns' onClick={() => setIsOpen(false)}><X size={16}/></button>
                </div>
              <form action="#">
                {product.category === 'patacon' ? <div>
                  <label className='modsLabel' htmlFor="verde">patacon Verde
                    <input type="checkbox" name="verde" id="verde" className="checkboxs" onChange={handleCheckboxChange}/>
                  </label>
                  <label className='modsLabel' htmlFor="amarillo">patacon amarillo
                    <input type="checkbox" name="amarillo" id="amarillo" className="checkboxs" onChange={handleCheckboxChange}/>
                  </label>
                </div> : null}
                <label className='modsLabel' htmlFor="verduras">No Verduras
                  <input type="checkbox" name="No verduras" id="verduras" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="jamon">No Jamon
                  <input type="checkbox" name="NO jamon" id="jamon" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="queso">No Queso
                  <input type="checkbox" name="No queso" id="queso" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="bacon">No Bacon
                  <input type="checkbox" name="No bacon" id="bacon" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="papitas">No Papitas
                  <input type="checkbox" name="No papitas" id="papitas" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="ketchup">No Ketchup
                  <input type="checkbox" name="No ketchup" id="ketchup" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="No mustard">No Mustard
                  <input type="checkbox" name="No mustard" id="No mustard" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="tartara">No Tartara
                  <input type="checkbox" name="No tartara" id="tartara" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="maiz">No maiz
                  <input type="checkbox" name="No pan" id="maiz" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <label className='modsLabel' htmlFor="bread">No Bread
                  <input type="checkbox" name="No pan" id="bread" className="checkboxs" onChange={handleCheckboxChange}/>
                </label>
                <button className="done cta" onClick={() => {handlerAddButton(product, mods); setIsOpen(false)}}>Agregar</button>
              </form>
            </div>
          )
}

export default Modifications;
