import { createBrowserRouter, 

  // Navigate, 
  RouterProvider } from 'react-router-dom';
import routesPath from '@/constants/routes';
import ErrorPage from "@/pages/ErrorPage";
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
const {
  // ROOT, 
  DASHBOARD
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
  // {
  //   path: ROOT,
  //   element: <MainLayout/> ,
  //   children: [
  //     { index: true, element: <Home/> },
  //     { path: "/register", element: <Register /> },
  //     { path: "/login", element: <Login /> },
      

  //   ],
  // },
  {
    path: DASHBOARD,
    element: <MainLayout/> ,
    children: [
      { index: true, element: <Register/> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      

    ],
  },
  { path: '*', element: <ErrorPage /> },
]);


function App() {
  return <RouterProvider router={routes} />;
}

export default App;
