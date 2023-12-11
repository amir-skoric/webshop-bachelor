//imports
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart/Cart";


const Layout = () => {
  return (
    <>
      <Cart />
      <Outlet />
    </>
  );
};

export default Layout;
