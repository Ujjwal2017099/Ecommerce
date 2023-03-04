import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../../Configuration/config'

const Navbar = ({user}) => {

  const navigate = useNavigate();

  const HandleLogout = (e)=>{
    auth.signOut().then(()=>{
      navigate('/login');
    })
  }

  return (
    <nav className='navbar bg-info'>
      <div className="left-nav">

      </div>
      <div className="right-nav px-4 ">
        {!user&&<>
          <div ><Link className='link text-dark' to='/signup'>Signup</Link></div>
          <div><Link className='link text-dark ms-2' to='/login'>Login</Link></div> 
        </>}

        {
          user&&<>
            <div className='nav-align'><Link className='link text-dark ' to='/'>{user}</Link></div>
            <div className='nav-align'>
              <Link to='/cart' className="link ms-3">
                <Icon icon={shoppingCart} size={20}/>
              </Link>
              {/* <span>{totalQty}</span> */}
            </div>
            <div className='btn btn-danger btn-md ms-3' onClick={HandleLogout} >LOGOUT</div>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar