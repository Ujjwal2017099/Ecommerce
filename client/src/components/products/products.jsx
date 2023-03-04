import React from 'react'
import Individualprd from './Individualprd'

const Products = ({products,addToCart}) => {
    // console.log(products);
  return products.map((individualprd)=>{
    return <div className='col-sm-3 mt-3 mb-3 mb-sm-0'><Individualprd addToCart={addToCart} key={individualprd.ID} individualprd={individualprd} /></div>
  })
}

export default Products