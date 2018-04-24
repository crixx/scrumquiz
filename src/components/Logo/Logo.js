import React from 'react';

import logoimage from '../../assets/images/senacor.svg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={logoimage} alt="Senacor" />
    </div>
);

export default logo;