import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    async componentDidMount(){
        try{
            const response = await axios.get('/orders.json');
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                        id: key
                    })
            }
            this.setState({orders: fetchedOrders});
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({ loading: false});
        }
    }


    render(){

        let allOrders = this.state.orders.map(order => {
            return (
                <Order
                    key={order.id}
                    price={+order.price}
                    ingredients={order.ingredients}
                />
            );
        })


        return(
            <div>
                {allOrders}
            </div>
        )
    }
}
export default withErrorHandler(Orders, axios);