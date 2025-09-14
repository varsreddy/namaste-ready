// import React from "react";
// import ReactDOM from "react-dom/client";

// const parent = React.createElement("div", { id: "parent" },
//   React.createElement(
//     "div",
//     { id: "child" },
//     React.createElement("h1", {}, "I am h1 tag")
//   ),
// );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent);




import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About name={"Varshuuu"} location={"India"} contact={"123-456-7890"} />,
      },
      {
        path:"/contact",
        element:<Contact />
      },
      {
        path:"/restaurant/:resId",
        element:<RestaurantMenu />
      }
    ],
    errorElement: <Error />
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

