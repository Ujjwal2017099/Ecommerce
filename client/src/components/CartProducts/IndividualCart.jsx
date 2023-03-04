import React from 'react'
import {auth,fs} from '../../Configuration/config'

const IndividualCart = ({product}) => {
  const handleDeleteFromCart = ()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(product.ID).delete().then(()=>{
          console.log('Successfully deleted');
        })
      }
    })
  }
  return (
    <div className="card mb-3 " style={{width: "18rem"}}>
      <img src={product.url} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{product.Title}</h5>
        <p className="card-text">{product.Description}</p>
        <p className="card-text">Price : {product.Price}</p>
      </div>
      <div className='btn btn-danger btn-md card-btn m-3' onClick={handleDeleteFromCart}>Delete</div>
    </div>
  )
}

export default IndividualCart