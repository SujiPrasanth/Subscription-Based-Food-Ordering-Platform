import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Mainlayout from "./Layout/Mainlayout";
import Authlayout from "./Layout/Authlayout";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Plans from "./pages/Plans";
import Overview from "./admin/overview";
import AdminLayout from "./Layout/Adminlayout";
import Users from "./admin/users";
import Products from "./admin/products";
import Productlist from "./admin/productlist";
import Cart from "./pages/Cart";
import Paymentsuccess from "./pages/Paymentsuccess";
import Orders from "./admin/orders";
import Userorder from "./pages/userorder";
import About from "./pages/About";

const  router = createBrowserRouter([
 {
  element:<Mainlayout />,
  children:[
    {
      path:"/",
      element:<Home />
    },
    {
      path:"/pricing",
      element:<Pricing />
    },{
      path:"/about",
      element:<About />
    },
    {
      path:"/plans",
      element:<Plans />
    },
    {
      path:"/cart",
      element:<Cart />
    },{
      path:"userorders",
      element:<Userorder />
    },
    {
      path:"/paymentsuccess",
      element:<Paymentsuccess />
    }
  ]
 },
 {
  element:<Authlayout />,
  children:[
    {
      path:"/signin",
      element:<Signin />
    },
    {
      path:"/signup",
      element:<Signup />
    }
  ]
 },{
  element:<AdminLayout />,
  children:[
    {
      path:"/overview",
      element:<Overview />
    },
    {
      path:"/users",
      element:<Users />
    },
    {
      path:"/products",
      element:<Products />
    },
    {
      path:"/productlist",
      element:<Productlist />
    },{
      path:"/products/:id",
      element:<Products />
    },{
      path:"/orders",
      element:<Orders />
    }
  ]
 }
])

function App() {
  return (
  
      <RouterProvider router={router}></RouterProvider>
    
  );
}

export default App;
