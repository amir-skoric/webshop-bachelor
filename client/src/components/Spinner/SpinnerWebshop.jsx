import React from 'react';
import "./SpinnerWebshop.css"

const SpinnerWebshop = () => {
    return (
        <div className="spinner-container">
            <span className="spinner"></span>
            <p>Loading...</p>
        </div>
    );
}

export default SpinnerWebshop;
