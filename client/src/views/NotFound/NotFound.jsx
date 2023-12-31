//import
import React from 'react';
import { Link } from "react-router-dom";
import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="notFound">
            <h1>Oh no, we couldn't find this page 😢</h1>
            <Link to={-1}>Go back</Link>
        </div>
    );
}

export default NotFound;
