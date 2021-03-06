import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationTiems =(props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/data">Table</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {!props.isAuthenticated
            ?  <NavigationItem link="/auth">Authenticate</NavigationItem>
            :  <NavigationItem link="/logout">Logout</NavigationItem>}

    </ul>
);

export default navigationTiems;