import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import routesPath from '@/constants/routes';
import ErrorPage from "@/pages/ErrorPage";

const {
  ROOT,
 } = routesPath;

const PrivateRoute = ({ children }: {children: React.ReactNode}) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const routes = createBrowserRouter([
  {
    path: ROOT,
    element: <PrivateRoute><div></div></PrivateRoute> ,
    children: [
      { index: true, element: <div></div> },
      // { index: "/some", element: <div></div> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);


function App() {
  // useEffect(() => {
  //   const token = localStorage.getItem('auth-token');

  //   if (!token) {
  //     loginTma({ initData: initDataRaw, timezone })
  //       .unwrap()
  //       .then((data) => {
  //         console.log('Server response:', data);
  //         localStorage.setItem('auth-token', data.data.token);
  //       })
  //       .catch((error) => console.error('Error:', error));
  //   }
  // }, [login]);

  return <RouterProvider router={routes} />;
}

export default App;
