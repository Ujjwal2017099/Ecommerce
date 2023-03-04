import React from 'react'

const Individualprd = ({individualprd,addToCart}) => {
//   console.log(individualprd);
    const handleAddToCart = ()=>{
        addToCart(individualprd);
    }
    return (
    <div className="card mb-3 " style={{width: "18rem"}}>
      <img src={individualprd.url} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{individualprd.Title}</h5>
        <p className="card-text">{individualprd.Description}</p>
        <p className="card-text">Price : {individualprd.Price}</p>
      </div>
      <div className='btn btn-danger btn-md card-btn m-3' onClick={handleAddToCart}>ADD TO CART</div>
    </div>
  )
}

export default Individualprd