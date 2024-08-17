import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import OfflineApp from './OfflineApp';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import YarnApp from './YarnApp';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/offline",
    element: <OfflineApp />,
  },
  {
    path: "/yarn",
    element: <YarnApp />,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
