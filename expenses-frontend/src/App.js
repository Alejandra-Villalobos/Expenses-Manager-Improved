import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
