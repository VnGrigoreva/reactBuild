import {Home, Error404} from '@/pages';
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />,
  },
  // {
  //   path: '/somePath',
  //   element: <SomeComponemt />,
  // },
]);

const Router = () => {
  return <RouterProvider router={router} />;
}

export default Router;
