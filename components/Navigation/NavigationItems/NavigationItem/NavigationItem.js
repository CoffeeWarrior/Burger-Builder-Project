import React from "react";
import { NavLink } from "react-router-dom";

import classes from './NavigationItem.css'

const navigationItem = (props) => {
    return(
        <li className={classes.NavigationItem}>
        <NavLink
        exact={props.exact} 
        activeClassName={classes.active}
        to={props.link} >{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;