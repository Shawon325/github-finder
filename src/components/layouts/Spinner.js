import React, { Fragment } from 'react';

import spinner from '../../assets/images/spinner/spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Loading..." style={spinnerStyle} />
        </Fragment>
    );
};

const spinnerStyle = {
    width: '200px',
    margin: 'auto',
    display: 'block',
};

export default Spinner;
