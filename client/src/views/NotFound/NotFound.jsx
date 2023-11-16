//import
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="notFound">
            <h1>Oh no, we couldn't find this page 😢</h1>
            <Link to="/">Go back</Link>
        </div>
    );
}

export default NotFound;
