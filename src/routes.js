import { Navigate, useRoutes } from 'react-router-dom';

// MOBX
// import {observer} from 'mobx-react'
// import userStore from './stores/UserStore';


// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SingleClientPage from './pages/Clients/SingleClientPage';
import AddNewClient from './pages/Clients/AddNewClient';
import EditClient from './pages/Clients/EditClient';
import SingleProduct from './pages/Products/SingleProduct';
import LogoutPage from './pages/LogoutPage';
// import userStore from './stores/UserStore';
// ----------------------------------------------------------------------


export default function Router() {
  const isAuthenticated = localStorage.getItem('token')
  // const {username} = userStore

  const routes = useRoutes([
    (isAuthenticated ? {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'clients', element: <UserPage /> },
        { path: 'add-new-client', element: <AddNewClient/> },
        { path: 'clients/:clientId', element: <SingleClientPage /> },
        { path: 'edit-client/:clientId', element: <EditClient /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:productId', element: <SingleProduct /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'logout', element: <LogoutPage /> },
      ],
    } :
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" replace />, index: true },
      ],
    }),
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to={isAuthenticated ? `/dashboard/app` : `/login`} />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
