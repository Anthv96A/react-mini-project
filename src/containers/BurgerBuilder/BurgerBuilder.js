import React, { Component } from 'react';
import Auxiliary from '../../hoc/Aux/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState = ingredients => {

        const sumUpPrice = Object.keys(ingredients)
                        .map(key => ingredients[key])
                        .reduce((sum, current) => sum + current , 0)

        this.setState({purchaseable: sumUpPrice > 0})
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
                ...this.state.ingredients
        }
        const priceAdded = INGREDIENT_PRICES[type];

        const newPrice = this.state.totalPrice + priceAdded;
                       
        updatedIngredients[type] = newCount;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    };

    purchaseCancelledHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        alert("You continued!");
    }

    removeIngredientHandler = (type) =>{

        const newCount = this.state.ingredients[type] - 1;

        if(newCount < 0){
            console.warn(`You don't have the ingredient ${type} to remove`)
            return;
        }

        const updatedIngredients = {
            ...this.state.ingredients
        }

        const priceSubstracted = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceSubstracted;     

        updatedIngredients[type] = newCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }


    render(){
        const disableInfo = {
             ...this.state.ingredients
        }

        for(let key in disableInfo){
           disableInfo[key] = (disableInfo[key] <= 0) ? true : false;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} dismiss={this.purchaseCancelledHandler}>
                    <OrderSummary
                     dismiss={this.purchaseCancelledHandler}
                     continued={this.purchaseContinueHandler}
                     ingredients={this.state.ingredients}
                     totalPrice={this.state.totalPrice}
                     />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    IngredientAdded={this.addIngredientHandler}
                    RemoveIngredient={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />

            </Auxiliary>
           
        );
    }
}

export default BurgerBuilder;