import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationBarItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDraw/DrawToggle/DrawToggle';

const toolbar = (props) => {

    return(
        <header className={classes.Toolbar}>
            <DrawToggle toggle={props.toggler.bind(this)}/>
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