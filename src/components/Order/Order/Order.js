import React from 'react'
import classes from './Order.css'

const order = (props) => {

    const ingredients = [];

    for(let key in props.ingredients){
        ingredients.push({key: key, amount: props.ingredients[key]});
    }


    const listOfOrders = ingredients.map(ingredient => {
        return (
            <li key={ingredient.key} style={{
                textTransform:'capitalize',
                listStyleType: 'none',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc'
            }}>
                <strong>{ingredient.key}</strong>
                ({ingredient.amount})
                </li>
        );
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            <ul>{listOfOrders}</ul>
            <p>Price: <strong>GBP {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;