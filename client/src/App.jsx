
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import Register from "./components/Register"
import axios from "axios"
import { UserContextProvider } from "./context/userContext"
import Account from "./pages/Account"
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/account/:subpage?" element={<Account/>}/>
      <Route path="account/:subpage/:action" element={<Account/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
