import { ModeToggle } from "@/components/mode-toggle";
import { useAppSelector } from "@/stores/store";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Home = () => {
    const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-5">
      <div className="flex flex-row justify-between items-center">
      <h1 className="text-2xl font-bold">Hello, Theme Switcher!</h1>
      <ModeToggle/>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      <Outlet/>

      {/* <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs> */}

      </div>
      <p className="mt-4">Current theme: {theme}</p>
    </div>
  );
};

export default Home;