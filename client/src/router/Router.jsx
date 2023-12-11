//imports
//pages
import Login from "../views/Auth/Login/Login";
import Register from "../views/Auth/Register/Register";
import Frontpage from "../views/FrontPage/FrontPage";
import Dashboard from "../views/Dashboard/Dashboard";

//product component
import Product from "../views/Product/Product";

//webshop page
import WebshopFrontpage from "../views/Webshop/WebshopFrontPage/WebshopFrontpage";
import WebshopEdit from "../views/Webshop/WebshopEdit/WebshopEdit";
//checkout
import Checkout from "../views/Checkout/Checkout";

//404 page
import NotFound from "../views/NotFound/NotFound";

//contexts
import { AuthProvider } from "../contexts/AuthContext";

//guarded routes
import AnonymousRoute from "../routes/AnonymousRoute";
import PrivateRoute from "../routes/PrivateRoute";

import {
  BrowserRouter as RouterContainer,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "../Layout";

export default function Router() {
  return (
    <RouterContainer>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/webshops/:webshop/edit" element={<WebshopEdit />} />
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route path="/" element={<Frontpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/webshops/:webshop" element={<WebshopFrontpage />} />
            <Route
              path="/webshops/:webshop/products/:product"
              element={<Product />}
            />
          </Route>
          <Route path="/webshops/:webshop/checkout" element={<Checkout />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </RouterContainer>
  );
}
