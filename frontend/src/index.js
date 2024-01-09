import styles from "./index.module.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { FeedRoute, feedLoader }from './routes/feed';
import { DishesRoute, dishesLoader, dishesAction }from './routes/dishes';
import { TodayRoute, todayLoader } from "./routes/today";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TodayRoute/>,
        loader: todayLoader,
    },
    {
        path: "/today",
        element: <TodayRoute/>,
        loader: todayLoader,
    },
    {
        path: "/feed",
        element: <FeedRoute/>,
        loader: feedLoader,
    },
    {
      path: "/dishes/*",
      element: <DishesRoute/>,
      loader: dishesLoader,
      action: dishesAction,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
