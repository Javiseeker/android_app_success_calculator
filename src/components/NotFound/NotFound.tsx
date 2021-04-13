import { Typography } from '@material-ui/core';
import React from 'react';
import './NotFound.css';

const NotFound: React.FC = () => {

    return(
        <div>
            <Typography variant="h1" color="primary">Content Not Found!</Typography>
        </div>
    );
};

export default NotFound;