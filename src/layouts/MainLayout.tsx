import { Outlet } from "react-router-dom"
const MainLayout = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello, Theme Switcher!</h1>
      <Outlet/>
      </div>
  )
}

export default MainLayout