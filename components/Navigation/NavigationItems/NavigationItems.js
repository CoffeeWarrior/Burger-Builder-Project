import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return(
        <ul className = {classes.NavigationItems}>
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated? 
            <NavigationItem link="/orders">Orders</NavigationItem>
            :null}
            { !props.isAuthenticated? 
            <NavigationItem link="/auth">Authentication</NavigationItem>
            :<NavigationItem link="/logout">Log Out</NavigationItem>}
        </ul>
    );
}

export default navigationItems;