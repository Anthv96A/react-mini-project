import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputEl = null;
    const inputClasses = [classes.InputEl];


    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    const finalOutputClasses = inputClasses.join(' ');

    switch (props.elType) {
        case ('input'):
            inputEl = ( <input className={finalOutputClasses}
                             {...props.elConfig} value={props.value} onChange={props.changed} />)
            break;
        case ('textarea'):
            inputEl = (<textarea className={finalOutputClasses}
                                {...props.elConfig} value={props.value} onChange={props.changed}/>)
            break;
        case ('select'):
            inputEl = (
                <select className={finalOutputClasses} {...props.elConfig} value={props.value} onChange={props.changed} >
                    {props.elConfig.type.map(option => {
                       return <option key={option.value} value={option.value}>{option.displayVal}</option>
                    })}
                 </select>
                );
            break;
        default:
            inputEl = (<input className={finalOutputClasses}
                             {...props.elConfig} value={props.value} onChange={props.changed} />)
            break;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{ props.label }</label>
            {inputEl}
        </div>
    );
}

export default input;