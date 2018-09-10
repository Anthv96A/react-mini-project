import React from 'react';
import classes from './Modal.css'

export const modal = props => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default modal;