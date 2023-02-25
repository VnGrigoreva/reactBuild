import {Home, Error404} from '@/pages';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
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

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
