import React from 'react';
import classes from './Modal.css'
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

export const modal = props => {
    const style = {
        transform:  props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
    }
    return(
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.dismiss.bind(this)} />
            <div style={style} className={classes.Modal}>
                {props.children}
            </div>
        </Auxiliary>
)};

export default modal;