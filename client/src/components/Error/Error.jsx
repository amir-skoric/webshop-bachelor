import React from 'react';
import "./Error.css"

const ResponseMsg = ({ children }) => {
    return (
      <p className="error">
        {children}
      </p>
    );
  };

export default ResponseMsg;
