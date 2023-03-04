import React ,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {auth,fs as fstore} from '../Configuration/config'

const Signup = () => {
    const style={
        marginTop : '20px'
    }
    const navigate = useNavigate();
    const [name,setname] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const [err,seterr] = useState('');
    const [success,setsuccess] = useState('');

    const handelSubmit = (e)=>{
        e.preventDefault();
        // console.log(name);
        // console.log(email);
        // console.log(password);
        auth.createUserWithEmailAndPassword(email,password)
        .then((cred)=>{

            console.log(cred);
            fstore.collection('users').doc(cred.user.uid).set({
                Name : name,
                Email : email,
                Password : password
            }).then(()=>{
                setsuccess('Signup Successfull');
                setemail('');
                setname('');
                setpassword('');
                seterr('');
                setTimeout(()=>{
                    setsuccess('');
                    navigate("/login");
                },3000);
            })
        })
        .catch((error)=>{
            seterr(error.message);
            console.log(error);
        })
    }
  return (
    <div className='container' style={style}>
        <h1 style={style}>SignUp</h1>
        {success&&<>
            <div className="alert alert-success" role='alert'>{success}</div>
        </>}
        <form className='form-group' onSubmit={handelSubmit} >
            <hr />
            <input type="text" onChange={(e)=>{setname(e.target.value)}} value={name} className='form-control' placeholder='Name'  style={style} required />
            <input type="email" onChange={(e)=>{setemail(e.target.value)}} value={email} className='form-control' placeholder='Email' style={style}  required />
            <input type="password" onChange={(e)=>{setpassword(e.target.value)}} value={password} className='form-control' placeholder='Password' style={style}  required />
            <div className="btn-box" style={style}>
                <span>
                    already have an account <Link to='/login' className='link'>Login Here</Link>
                </span>
                <button type="submit" className='btn btn-success btn-md'>Sign Up</button>
            </div>
        </form>
        {err&&<>
            <div className="alert alert-danger" role='alert'>{err}</div>
        </>}
    </div>
  )
}

export default Signup