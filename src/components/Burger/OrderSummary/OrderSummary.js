import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'

const orderSummary = props => {

    const style ={
        textTransform: 'capitalize'
    }

    const ingredientSummary = Object.keys(props.ingredients)
            .map(key => <li key={key}><span style={style}>{key}</span>: {props.ingredients[key]} </li>)


    return (
        <Auxiliary>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxiliary>
    );
}

export default orderSummary;