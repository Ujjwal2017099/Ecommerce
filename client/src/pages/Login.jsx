import React ,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {auth} from '../Configuration/config'

const Login = () => {
    const style={
        marginTop : '20px'
    }
    const navigate = useNavigate();
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const [err,seterr] = useState('');
    const [success,setsuccess] = useState('');

    const handelSubmit = (e)=>{
        e.preventDefault();
        // console.log(email);
        // console.log(password);
        auth.signInWithEmailAndPassword(email,password)
        .then(()=>{
            setsuccess('Login Successfull');
            setemail('');
            setpassword('');
            seterr('');
            setTimeout(()=>{
                setsuccess('');
                navigate('/');
            },3000);
        }).catch((err)=>{
            seterr(err.message);
        })
    }

  return (
    <div className='container' style={style}>
        <h1 style={style}>Log In</h1>
        {success&&<>
            <div className="alert alert-success" role='alert'>{success}</div>
        </>}
        <form className='form-group' onSubmit={handelSubmit}>
            <hr />
            <input type="email" onChange={(e)=>{setemail(e.target.value)}} value={email} className='form-control' placeholder='Email' style={style}  required />
            <input type="password" onChange={(e)=>{setpassword(e.target.value)}} value={password} className='form-control' placeholder='Password' style={style}  required />
            <div className="btn-box" style={style}>
                <span>
                    don't have an account <Link to='/signup' className='link'>Signup</Link>
                </span>
                <button type="submit" className='btn btn-success btn-md'>Login</button>
            </div>
        </form>
        {err&&<>
            <div className="alert alert-danger" role='alert'>{err}</div>
        </>}
    </div>
  )
}

export default Login