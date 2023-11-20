import React from 'react';
import "./Spinner.css"

const Spinner = () => {
    return (
        <div className="spinner-container">
            <span className="spinner"></span>
            <p>Loading...</p>
        </div>
    );
}

export default Spinner;
