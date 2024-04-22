import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<h1>Profile</h1>}/>
        <Route path="/services" element={<h1>Services</h1>}/>
        <Route path="/services/:id" element={<h1>Service</h1>}/>
        <Route path="/vets" element={<h1>Vets</h1>}/>
        <Route path="/vets/:id" element={<h1>Vet</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;