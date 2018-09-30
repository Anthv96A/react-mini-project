import React, { Component } from 'react';
import Auxiliary from '../../hoc/Aux/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import { withErrorHandler } from '../../hoc/WithErrorHandler/WithErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState = ingredients => {

        const sumUpPrice = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, current) => sum + current, 0)

        this.setState({ purchaseable: sumUpPrice > 0 })
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
        this.setState({ purchasing: true })
    };

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = async () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(`${encodeURI(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        }
        queryParams.push(`price=${this.state.totalPrice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: 'checkout',
            search: `?${queryString}`
        })
    }

    removeIngredientHandler = (type) => {

        const newCount = this.state.ingredients[type] - 1;

        if (newCount < 0) {
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


    async componentDidMount() {
        try {
            const resolved = await axios.get('/ingredients.json')
            this.setState({
                ingredients: resolved.data
            })
        } catch (error) {
            console.log(error);
            this.setState({ error: true })
        }
    }


    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = (disableInfo[key] <= 0) ? true : false;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>The data cannot be loaded</p> : <Spinner />

        if (this.state.ingredients != null) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        IngredientAdded={this.addIngredientHandler}
                        RemoveIngredient={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>)

            orderSummary = <OrderSummary
                dismiss={this.purchaseCancelledHandler}
                continued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
            />
        }


        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} dismiss={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>

        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);