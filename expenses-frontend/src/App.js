import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Banks from "./pages/Banks";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/banks' element={<Banks/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
