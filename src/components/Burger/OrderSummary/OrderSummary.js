import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button';

const orderSummary = props => {

    const style = {
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
            <p><strong>Total Price: £{props.totalPrice.toFixed(2)} </strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.dismiss.bind(this)} >CANCEL</Button>
            <Button btnType="Success" clicked={props.continued.bind(this)} >CONTINUE</Button>
        </Auxiliary>
    );
}

export default orderSummary;