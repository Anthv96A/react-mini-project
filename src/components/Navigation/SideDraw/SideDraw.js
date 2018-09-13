import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDraw.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sideDraw = (props) => {
    let attachedClasses = [classes.SideDraw]

    if(props.showSideDraw){
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }

    const classesRequired = attachedClasses.join(' ');
    
    return (
        <Auxiliary>
            <BackDrop 
                show={props.showSideDraw} 
                clicked={props.close.bind(this)}  />
            <div className={classesRequired}>
                <div className={classes.Logo}>
                    <Logo/>
                    </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
       </Auxiliary>
     );
}

export default sideDraw;