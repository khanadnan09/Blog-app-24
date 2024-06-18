import { Outlet } from "react-router-dom"
import Navbar from "./Comp/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
