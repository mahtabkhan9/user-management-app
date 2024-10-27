import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'


function App() {
  
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/edit/:id" element={<Update/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
