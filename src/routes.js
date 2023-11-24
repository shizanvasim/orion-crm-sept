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
import CrmUsersPage from './pages/CrmUsersPage/CrmUsersPage';
import UserPage2 from './pages/UserPage2';
import SingleBill from './pages/Clients/SingeClient/SingleBill';
import SingleUserPage from './pages/CrmUsersPage/SingleUserPage';
import EditUserpage from './pages/CrmUsersPage/EditUserpage';
import AddUserPage from './pages/CrmUsersPage/AddUserPage';
import AddProduct from './pages/Products/AddProduct';
import EditProduct from './pages/Products/EditProduct';
// import userStore from './stores/UserStore';
// ----------------------------------------------------------------------


export default function Router() {
  const isAuthenticated = localStorage.getItem('token')

  const routes = useRoutes([
    (isAuthenticated ? {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'clients', element: <UserPage /> },
        { path: 'clients-2', element: <UserPage2 /> },
        { path: 'add-new-client', element: <AddNewClient/> },
        { path: 'clients/:clientId', element: <SingleClientPage /> },
        { path: 'clients/:clientId/:billId', element: <SingleBill /> },
        { path: 'clients-2/:clientId', element: <SingleClientPage /> },
        { path: 'edit-client/:clientId', element: <EditClient /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/add-product', element: <AddProduct /> },
        { path: 'products/:productId', element: <SingleProduct /> },
        { path: 'products/:productId/edit-product/:productId', element: <EditProduct /> },
        { path: 'users', element: <CrmUsersPage /> },
        { path: 'users/add-user', element: <AddUserPage /> },
        { path: 'users/:userId', element: <SingleUserPage /> },
        { path: 'users/edit/:userId', element: <EditUserpage /> },
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
