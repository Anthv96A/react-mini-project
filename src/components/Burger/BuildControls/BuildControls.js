import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad', type: 'salad'},
    {label : 'Bacon', type: 'bacon'},
    {label : 'Cheese', type: 'cheese'},
    {label : 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>£{props.totalPrice.toFixed(2)}</strong> </p>
        {controls.map(control => {
            return <BuildControl
             key={control.label} 
             label={control.label} 
             add={props.IngredientAdded.bind(this, control.type)}
             remove={props.RemoveIngredient.bind(this,control.type)}
             disabled={props.disabled[control.type]}
             />
        })}
        <button className={classes.OrderButton}
         disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
);

export default buildControls;