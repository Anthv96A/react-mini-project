import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.configOrderFormSetup('input','text','Your Name', '', true,3,true,false),
            street: this.configOrderFormSetup('input','text','Your Street', '',true,3,true,false),
            postCode: this.configOrderFormSetup('input','text','Your Postcode', '',true,3,true,false),
            country: this.configOrderFormSetup('input','text','Your Country', '',true,3,true,false),
            email: this.configOrderFormSetup('input','email','Your Email', '',true,3,true,false),
            deliveryMethod: this.configOrderFormSetup('select',
                [
                    { value: 'fastest', displayVal: 'Fastest'},
                    { value: 'cheapest', displayVal: 'Cheapest'}
                ], 'Your Delivery Method', 'fastest',false,0,false,true)
        },
        loading: false
    }

    configOrderFormSetup(typeOfInput,config, placeholder, value, isRequired, minLength, shouldValidate,isValid){
        return {
            elType: typeOfInput,
            elConfig: {
                type: config,
                placeholder: placeholder
            },
            value: value,
            shouldValidate: shouldValidate,
            validation: {
                required: isRequired,
                minLength: minLength
            },
            valid: isValid,
            touched: false

        }
    }



     onSubmitDataHandler = async (event) => {
         event.preventDefault();

         const formData = {};

         for(let key in this.state.orderForm){
             formData[key] = this.state.orderForm[key].value
         }

         this.setState({loading: true});
         const order = {
             ingredients: this.props.ingredients,
             price: this.props.totalPrice,
             orderForm: formData

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

    checkValidation(value, rules){
        let isValid = false;
        if(rules.required){
            isValid = value.trim !== '';
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength;
        }

        return isValid;
    }

    inputChangedHandler = (e, inputId) => {



        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormEl =  { ...updatedOrderForm[inputId] }

        updatedFormEl.value = e.target.value;
        updatedFormEl.valid = this.checkValidation(e.target.value, updatedFormEl.validation);
        updatedFormEl.touched = true;

        updatedOrderForm[inputId] = updatedFormEl;

        this.setState({
            orderForm: updatedOrderForm
        })



    }

    render() {

        const inputFormArray = [];

        for(let key in this.state.orderForm){
            inputFormArray.push({
                key: key,
                config: this.state.orderForm[key]
            })
        }


        const inputFormTypes = inputFormArray.map(t => {
            return (
                <Input key={t.key}
                    elType={t.config.elType}
                    elConfig={t.config.elConfig}
                    value={t.config.value}
                    invalid={!t.config.valid}
                    shouldValidate={t.config.shouldValidate}
                    touched={t.config.touched}
                    changed={(e)=> {this.inputChangedHandler(e,t.key)}}
                />
            );
        })

        let disabled = false;

        for(let i= 0; i < inputFormArray.length; i++ ){
            if(!inputFormArray[i].config.valid){
                disabled = true;
                break;
            }
        }


        let form = (
                    <form onSubmit={this.onSubmitDataHandler}>
                        {inputFormTypes}
                        <Button btnType="Success" disabled={disabled} clicked={this.onSubmitDataHandler.bind(this)}>
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