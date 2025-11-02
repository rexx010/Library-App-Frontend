import RootLayout from "./layout/RootLayout.jsx"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import LandingPage from "./landingPage/LandingPage.jsx"
import LoginPage from "./pages/loginPage/LoginPage.jsx"
import SignUp from "./pages/signupPage/SignUp.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Help from "./pages/Help.jsx"
import Service from "./pages/Service.jsx"
import User from "./pages/users/User.jsx"
import UserLayout from "./layout/UserLayout.jsx"
import UserBorrowedBook from "./pages/users/UserBorrowedBook.jsx"
import ReservedBook from "./pages/users/ReservedBook.jsx"
import BookInfo from "./layout/BookInfo.jsx"
import BookDetail from "./components/BookDetail.jsx"
import AdminLayout from "./layout/AdminLayout.jsx"
import Admin from "./pages/admin/Admin.jsx"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/help' element={<Help/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<User/>} />
          <Route path="borrowBooks" element={<UserBorrowedBook/>}/>
          <Route path="reservedBook" element={<ReservedBook/>}/>
          <Route path=":id" element={<BookDetail/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<Admin/>} />
          <Route path=":id" element={<BookDetail/>}/> 
        </Route>
        {/* <Route path="/BookInfo" element={<BookInfo/>}>
          <Route path=""/>
        </Route> */}
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
