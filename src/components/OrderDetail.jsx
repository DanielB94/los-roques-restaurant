import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import './styles/orderDetail.css';
import { ApiUrlContext } from '../context/ApiUrlContext';

const OrderDetail = () => {
    const apiUrl  = useContext(ApiUrlContext);
    const [orderDetail, setOrderDetail] = useState(null);

    const locationUrl = window.location.href;
    const idUrl = locationUrl.slice(36,61);

    useEffect(() => {

        const getOrderDetail = (() => 
            axios.get(`${apiUrl}/api/order-details/${idUrl}`, {withCredentials: true})
            .then((result) => { setOrderDetail(result)})
            .catch(err => console.log(err))
        )();
    },[idUrl]);
    console.log(orderDetail)
    
  return (
    <div className='orderDetailContainer'>
      {orderDetail ? <div className='detailContainer'>
        <div className='detailInfo'>
            <h4>Nombre: {orderDetail.data.result.client_name}</h4>
            <h4>Orden ID: {orderDetail.data.result._id}</h4>
            <p>Total Productos: {orderDetail.data.result.totalProducts}</p>
            <p>SubTotal: ${orderDetail.data.result.subTotal}</p>
            <p>Total Taxes: ${orderDetail.data.result.totalTaxes}</p>
            <p>Total: ${orderDetail.data.result.total}</p>
        </div>
      {orderDetail.data.result.cart.map(item => {
        return <div className='itemDetailContainer'>
                    <h2>{item.name}</h2>
                    <ul>{item.mods.map(mod => {
                       return <li>{mod}</li>
                    })}</ul>
                </div>
      })} </div>: null}
    </div>
  )
}

export default OrderDetail;
