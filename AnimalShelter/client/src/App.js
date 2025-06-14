import './App.css';
import { Routes, Route, useLocation} from "react-router-dom";

import Login from "./components/LoginTemp"
import Reg from "./components/RegTemp"
import Main from './components/MainPage';
import Create from './components/Create';
import Detail from './components/Detail'
import Update from './components/Update';
import Report from './components/Report';
import AllReports from './components/AllReports';
import CreateProduct from './components/CreateProduct';
import Shop from './components/Shop';
import Navbar from './components/Navbar';
import AboutUs from "./components/AboutUs"


function App() {
  //const [socket] =useState(()=>io(':8000'))
  const location = useLocation();
  const noNavRoutes = ['/login', '/register','/'];


  //useEffect(()=>{console.log("is this running on ??") return ()=>socket.disconnect(true)},[socket])
  return (
    <div className="App">
     {!noNavRoutes.includes(location.pathname) && <Navbar/>} 
     <Routes>
     <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Reg/>}/>
      <Route path='/dashboard' element={<Main/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/pets/:id' element={<Detail/>}/>
      <Route path='/pets/:id/update' element={<Update/>}/>
      <Route path='/pets/report/create' element={<Report/>}/>
      <Route path='/pets/report' element={<AllReports/>}/>
      <Route path='/product/create' element={<CreateProduct/>}/>
      <Route path='/product' element={<Shop/>}/>
      <Route path='/aboutUs' element={<AboutUs/>}/>


     
      </Routes>
    </div>
  );
}

export default App;
