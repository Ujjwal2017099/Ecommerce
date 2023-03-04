import React ,{useState} from 'react'
import {storage,fs} from '../Configuration/config'

const Addproducts = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState(null);

    const [imgErr,setImgErr] = useState('');
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');

    const types = ['image/jpg','image/jpeg','image/png'];
    const HandlePrdImg = (e)=>{
        let selected = e.target.files[0];
        if(selected){
            if(selected && types.includes(selected.type)){
                setImage(selected);
                setImgErr('');
            }
            else{
                setImage(null);
                setImgErr('please select a valid image format');
            }
        }else{
            setImage(null);
            setImgErr('please select a valid image format');
        }
    }

    const HandleProducts = (e)=>{
        e.preventDefault();
        // console.log(title + description + price);
        // console.log(image);
        const upload = storage.ref(`product-images/${image.name}`).put(image);
        upload.on('state_changed',curr=>{
            const progress = (curr.bytesTransferred/curr.totalBytes)*100
            console.log(progress);
        },err=>setError(err.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Products').add({
                    Title:title,
                    Description : description,
                    Price : Number(price),
                    url
                }).then(()=>{
                    setSuccess('Uploaded Successfully');
                    setError('');
                    setImgErr('');
                    setPrice('');
                    setTitle('');
                    setDescription('');
                    document.getElementById('file').value='';
                    setTimeout(()=>{
                        setSuccess('');
                    },3000);
                }).catch((err)=>{
                    setError(err.message);
                })
            })
        })
    }
  return (
    <div className='container mt-5'>
        {
            success&&<>
                <div className="alert alert-success mb-3" role='alert'>{success}</div>
            </>
        }
        <h1>Add Products</h1>
        <form className='form-group' onSubmit={HandleProducts} >
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} className='form-control mb-3' placeholder='Title' required/>
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} className='form-control mb-3' placeholder='Description' required/>
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} vlaue={price} className='form-control mb-3' placeholder='Price' required/>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Add Image</label>
              <input className="form-control" type="file" id="file formFile" onChange={HandlePrdImg} required/>
                {
                    imgErr&&<>
                        <div className="alert alert-danger mt-3" role='alert'>{imgErr}</div>
                    </>
                }
            </div>
            <div>
                <button type='submit' className='btn btn-success btn-md'>
                    SUBMIT
                </button>
            </div>
        </form>
        {
            error&&<>
                <div className="alert alert-danger mt-3" role='alert'>{error}</div>
            </>
        }
    </div>
  )
}

export default Addproducts