import React from 'react'
import IndividualCart from './IndividualCart';

const CartProducts = ({cart}) => {
    console.log(cart);
  return cart.map((product)=>{
    return <div className='col-sm-3 mt-3 mb-3 mb-sm-0'><IndividualCart key={cart.ID} product={product} /> </div>
  })
}

export default CartProducts