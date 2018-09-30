import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem name="Burger Bar" link="/"></NavigationItem>
            <NavigationItem name="Orders" link="/orders"></NavigationItem>
        </ul>
    );
}

export default navigationItems;