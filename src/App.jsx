import './App.css';
import { LandingPage } from './components/pages/Landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GraphsPage } from './components/pages/DataVisualizations/GraphsPage.jsx';
import { NotFoundPage } from './components/pages/NotFound/index.jsx';
import * as React from 'react';
import Profile from './components/pages/Profile/index.jsx';
import { pageWrapper } from './components/layout/PageWrapper.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: pageWrapper(<LandingPage />),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/graphs',
    element: pageWrapper(<GraphsPage />),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/profile',
    element: pageWrapper(<Profile />),
    errorElement: <NotFoundPage />,
  },
]);

export const App = () => {
  return (
    /*  removeD the fixed height and flex classes here */
    <div className='app-container'>
      <RouterProvider router={router} />
    </div>
  );
};