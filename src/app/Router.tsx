import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {Home, Error404} from '@/pages';

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

const Router = () => <RouterProvider router={router} />;

export default Router;
