import React,{useState,useEffect} from 'react'
import Navbar from '../components/navbar/navbar'
import {auth,fs} from '../Configuration/config'
import Products from '../components/products/products'
import { useNavigate } from 'react-router-dom'

const Home = () => {
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

  const GetUserId = ()=>{
    const [user,setuser] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setuser(user.uid);
        }
      })
    },[])
    return user;
  }

  const user = GetCurrUser();
  const uid = GetUserId();
  // console.log(user);
  const [products,setProducts] = useState([]);

  const GetProducts = async ()=>{
    const products = await fs.collection('Products').get();
    const pArray = [];
    for(var prd of products.docs){
      var data = prd.data();
      data.ID = prd.id;
      pArray.push({...data})
      if(pArray.length === products.docs.length){
        setProducts(pArray);
      }
    }
  }

  useEffect(()=>{
    GetProducts();
  },[])

    let Product;
    const addToCart = (product)=>{
      if(uid !== null){
        // console.log(product);
        Product = product;
        Product['qty']=1;
        Product['TotalProductPrice'] = Product.qty*Product.Price;
        fs.collection('Cart '+uid).doc(product.ID).set(Product).then(()=>{
          console.log('success');
        })
      }else{
        navigate('/login');
      }
    }

  return (
    <div>
        <Navbar user={user}/>
        {
          products.length > 0 ?
          <div className='container-fluid'>
            <h1 className='text-center'>Products</h1>
            <div className='row'>
              <Products products={products} addToCart={addToCart} />
            </div>
          </div>:
          <div className='container-fluid'>
            Loading Please Wait...
          </div>
        }
    </div>
  )
}

export default Home