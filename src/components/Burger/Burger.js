import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';


const burger = (props) =>{

    let transformedIngredients = Object.keys(props.ingredients)
            .map(ingredientKey => {
                    return [...Array(props.ingredients[ingredientKey])].map((_,index) =>{
                            return <BurgerIngredient key={ingredientKey + index} 
                             type={ingredientKey} />
                             });
                    }).reduce((arr, currentVal) => {
                        return arr.concat(currentVal);  
                    },[])
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please add some ingredients</p>
    }
    

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;