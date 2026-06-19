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
import YarnApp from './components/Yarn/YarnApp';
import QuizApp from './components/Quiz/QuizApp';

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log("Starting app with environment", process.env.NODE_ENV);

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
  },
  {
    path: "/quiz",
    element: <QuizApp />,
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
