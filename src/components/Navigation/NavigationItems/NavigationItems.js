import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/highscore" exact>HighScore</NavigationItem>
        {/* <NavigationItem link="/psm1">PSM 1</NavigationItem> */}
        <NavigationItem link="/fcm">Push</NavigationItem>
        {/* {props.isAuthenticated ? <NavigationItem link="/psm1">PSM 1</NavigationItem> : null} */}
        {/* {props.isAuthenticated ? <NavigationItem link="/fcm">Push</NavigationItem> : null} */}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;