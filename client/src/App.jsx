
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import Register from "./pages/Register"
import axios from "axios"
import { UserContextProvider } from "./context/userContext"
import Account from "./pages/Account"
import PlacesPage from "./pages/PlacesPage"
import PlacesForm from "./components/PlacesForm"
import BookingPage from "./pages/BookingPage"
import Place from "./pages/Place"
import SingleBooking from "./pages/SingleBooking"
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/account/accommodation" element={<PlacesPage/>}/>
      <Route path="account/accommodation/new" element={<PlacesForm/>}/>
      <Route path="account/bookings" element={<BookingPage/>}/>
      <Route path="account/bookings/:id" element={<SingleBooking/>}/>
      <Route path="account/accommodation/:id" element={<PlacesForm/>}/>
      <Route path="place/:id" element={<Place/>}/>
      <Route path="*" element={<Home/>} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
