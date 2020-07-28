import React from 'react';
import { Link } from 'react-router-dom';

function BtnBackToMainPg() {
    return <Link to="/"><h2>&larr; Go to the main page</h2></Link>;
}

export default BtnBackToMainPg