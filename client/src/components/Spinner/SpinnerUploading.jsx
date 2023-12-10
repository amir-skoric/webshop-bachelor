import React from 'react';
import "./SpinnerUploading.css"

const SpinnerUploading = () => {
    return (
        <div className="spinner-container-uploading">
            <span className="spinner-uploading"></span>
            <p>Uploading...</p>
        </div>
    );
}

export default SpinnerUploading;
