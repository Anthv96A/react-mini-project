import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationBarItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div>MENU</div>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
            <nav className={classes.DesktopOnly}>
                <NavigationBarItems/>
            </nav>
        </header>
    )
}

export default toolbar;