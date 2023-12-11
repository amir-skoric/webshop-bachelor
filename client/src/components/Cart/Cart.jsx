//imports
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { webshop } = useParams();
  const [productsInCart, setProductsInCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    return storedCart || [];
  });

  return (
    <Link
      className="cartContainer"
      to={`/webshops/${webshop}/checkout`}
    >
      <img
        style={{ height: 40 }}
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgMTkuNWMwIC44MjktLjY3MiAxLjUtMS41IDEuNXMtMS41LS42NzEtMS41LTEuNWMwLS44MjguNjcyLTEuNSAxLjUtMS41czEuNS42NzIgMS41IDEuNXptMy41LTEuNWMtLjgyOCAwLTEuNS42NzEtMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcxIDEuNS0xLjVjMC0uODI4LS42NzItMS41LTEuNS0xLjV6bTEuMzM2LTVsMS45NzctN2gtMTYuODEzbDIuOTM4IDdoMTEuODk4em00Ljk2OS0xMGwtMy40MzIgMTJoLTEyLjU5N2wuODM5IDJoMTMuMjM5bDMuNDc0LTEyaDEuOTI5bC43NDMtMmgtNC4xOTV6Ii8+PC9zdmc+"
      ></img>
      <p className="cart">{productsInCart.length}</p>
    </Link>
  );
};

export default Cart;
