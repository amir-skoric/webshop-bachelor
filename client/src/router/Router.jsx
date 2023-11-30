//imports
//pages
import Login from "../views/Auth/Login/Login";
import Register from "../views/Auth/Register/Register";
import Frontpage from "../views/FrontPage/FrontPage";
import Dashboard from "../views/Dashboard/Dashboard";
import Webshop from "../views/Webshop/Webshop";

import NotFound from "../views/NotFound/NotFound";

//contexts
import { AuthProvider } from "../contexts/AuthContext";

//routes
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
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} exact />
            </Route>
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route path="/" element={<Frontpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/webshops/:webshop" element={<Webshop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </RouterContainer>
  );
}
