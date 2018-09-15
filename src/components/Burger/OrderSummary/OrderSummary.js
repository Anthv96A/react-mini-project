import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Aux/Auxiliary'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
   
    render() {    
            const style = {
                textTransform: 'capitalize'
            }

            const ingredientSummary = Object.keys(this.props.ingredients)
                    .map(key => <li key={key}><span style={style}>{key}</span>: {this.props.ingredients[key]} </li>)

            return (
                <Auxiliary>
                    <h3>Your order</h3>
                    <p>A delicious burger with the following ingredients</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: £{this.props.totalPrice.toFixed(2)} </strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType="Danger" clicked={this.props.dismiss.bind(this)} >CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.continued.bind(this)} >CONTINUE</Button>
                </Auxiliary>
            );
    }
}

export default OrderSummary;