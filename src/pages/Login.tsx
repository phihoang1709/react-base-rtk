import { useAppSelector } from "@/stores/store";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
const Login = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Hello, Theme Switcher!</h1>


        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList>
            <div><Link to={"/login"}>Login</Link></div>
            <div><Link to={"/register"}>Register</Link></div>
          </TabsList>
          <TabsContent value="login">Make changes to your account Login.</TabsContent>
          <TabsContent value="register">Change your password here.</TabsContent>
        </Tabs>

      </div>
      <p className="mt-4">Current theme: {theme}</p>
    </div>
  );
};

export default Login;