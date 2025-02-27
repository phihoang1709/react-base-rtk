import { ModeToggle } from "@/components/mode-toggle";
import { useAppSelector } from "@/stores/store";

const Home = () => {
    const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold">Hello, Theme Switcher!</h1>
      <ModeToggle/>
      <p className="mt-4">Current theme: {theme}</p>
    </div>
  );
};

export default Home;