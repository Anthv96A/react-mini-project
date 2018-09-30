import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street:  '',
            postcode: ''
        },
        loading: false
    }


     onSubmitDataHandler = async (event) => {
         event.preventDefault();

         this.setState({loading: true});
         const order = {
             ingredients: this.props.ingredients,
             price: this.props.totalPrice,
             customer: {
                 name: 'Anthony Vest',
                 address: {
                     street: 'Street',
                     postCode: 'DH44444',
                     country: 'United Kingdom'
                 },
                 email: 'test@test.com'
             },
             deliveryMethod: 'fastest'
         }
         try {
             await axios.post('/orders.json', order);
             this.props.history.push('/');
         } catch (error) {
             console.log(error);
         }
     }


    componentWillUnmount(){
        this.setState({ loading: false})
    }

    render() {
        let form = (
                    <form>
                        <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                        <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                        <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
                        <input className={classes.Input} type="text" name="postcode" placeholder="Your Postcode"/>
                        <Button btnType="Success" clicked={this.onSubmitDataHandler.bind(this)}>
                            Order
                        </Button>
                    </form> );

        if(this.state.loading){
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                { form }
            </div>
        )
    }

}

export default ContactData;