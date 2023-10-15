
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import Register from "./pages/Register"
import axios from "axios"
import { UserContextProvider } from "./context/userContext"
import Account from "./pages/Account"
import PlacesPage from "./components/PlacesForm"
import PlacesForm from "./pages/PlacesPage"
import BookingPage from "./pages/BookingPage"
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
      <Route path="/account/accommodation" element={<PlacesForm/>}/>
      <Route path="account/accommodation/new" element={<PlacesPage/>}/>
      <Route path="account/bookings" element={<BookingPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
