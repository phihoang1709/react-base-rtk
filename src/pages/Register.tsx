import { useAppSelector } from "@/stores/store";
const Register = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Hello, Theme Switcher!</h1>

      </div>
      <p className="mt-4">Current theme: {theme}</p>
    </div>
  );
};

export default Register;