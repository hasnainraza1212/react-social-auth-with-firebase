import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Protected from "./Pages/Protected/Protected";
import Login from "./Pages/Login/Login";
import UserInfo from "./Pages/UserInfo/UserInfo";
function App() {


  return (
 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="login" element={<Login/>}/>
        <Route index element={<Protected children={<UserInfo/>}/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
