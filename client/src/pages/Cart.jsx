import React ,{useState,useEffect} from 'react'
import Navbar from '../components/navbar/navbar'
import {auth,fs} from '../Configuration/config'
import CartProducts from '../components/CartProducts/CartProducts'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate();
    const GetCurrUser = ()=>{
    const [user,setuser] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          fs.collection('users').doc(user.uid).get().then(curr=>{
            setuser(curr.data().Name);
          })
        }else{
          setuser(null);
        }
      })
    },[])
    return user;
  }

   const user = GetCurrUser();

  const [cart,setCart] = useState([]);

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Cart '+ user.uid).onSnapshot(curr=>{
                const newCart = curr.docs.map((doc)=>({
                    ID : doc.id,
                    ...doc.data()
                }));
                setCart(newCart);
            })
        }else{
            console.log('user is not signed In');
        }
    })
  },[])

  console.log(cart);

  let TotalPayPrice=0;

  const calculatePrice = ()=>{
    
    cart.forEach((e)=>{
        TotalPayPrice+=e.TotalProductPrice;
    })
  }
  calculatePrice();

  const handleToken = async (token)=>{
    // console.log(token);
    const cart = {name : 'All Products',TotalPayPrice}
    const response = await axios.post('http://localhost:4000/checkout',{
      token,
      cart
    })
    console.log(response);
    let status = response.data;
    alert('Payment Done Successfully')
    navigate('/');

    const uid = auth.currentUser.uid;
    const carts = await fs.collection('Cart '+uid).get();
    for(let curr of carts.docs){
      fs.collection('Cart '+uid).doc(curr.id).delete();
    }
  }
  return (
    <div>
        <Navbar user={user}/>
        {
            cart.length > 0 ?
            <>
            <div className="container-fluid">
                <h1 className='text-center'>Cart</h1>
                <div className='row'>
                    <CartProducts cart={cart} />
                </div>
                
            <div className="card" style={{width: "18rem"}}> 
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <h6 className="card-subtitle mb-2 text-muted">Total Price is {TotalPayPrice}</h6>
              </div>
                <StripeCheckout 
                stripeKey='pk_test_51MhxgXSGbAumJYuJnEpScjEjGPNo9Ccd5T3LkjjZowCnXirYZ3GsW8MNKp4tZ8uAFSsxvwr4EAnvC9eCsCldJHdb00nJxljl6L'
                className='m-3'
                token={handleToken}
                billingAddress
                shippingAddress
                name='All Products'
                amount={TotalPayPrice*100}
                >
                    
                </StripeCheckout>
            </div>
            </div>
            </>
                :
            <div className="container-fluid">
                No Products to show
            </div>
        }
    </div>
  )
}

export default Cart