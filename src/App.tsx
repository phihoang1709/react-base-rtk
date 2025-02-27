import { createBrowserRouter, 
  // Navigate, 
  RouterProvider } from 'react-router-dom';
import routesPath from '@/constants/routes';
import ErrorPage from "@/pages/ErrorPage";
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import ImageEditor from './pages/ImageEditor';
const {
  ROOT, 
  // LOGIN
 } = routesPath;

// const PrivateRoute = ({ children }: {children: React.ReactNode}) => {
//   const token = localStorage.getItem('auth-token');
//   if (!token) {
//     return <Navigate to={LOGIN} replace />;
//   }
//   return children;
// };

const routes = createBrowserRouter([
  {
    path: ROOT,
    element: <MainLayout/> ,
    children: [
      { index: true, element: <Home/> },
      { path: "/edit", element: <ImageEditor/> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);


function App() {
  return <RouterProvider router={routes} />;
}

export default App;
