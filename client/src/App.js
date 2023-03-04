import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Addproducts from './pages/Addproducts'
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/AddProducts' element={<Addproducts/>}></Route>
        <Route exact path='/Cart' element={<Cart/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
