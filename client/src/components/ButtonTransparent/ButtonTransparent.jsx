//imports
import React from 'react'
import './ButtonTransparent.css'

const ButtonTransparent = ({ children }) => {
  return (
    <button className="button-transparent">
      {children}
    </button>
  );
};

export default ButtonTransparent;