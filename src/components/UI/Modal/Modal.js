import React, {Component} from 'react';
import classes from './Modal.css'
import Auxiliary from '../../../hoc/Aux/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextstate){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        const style = {
            transform:  this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1': '0'
        }
        return(
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.dismiss} />
                <div style={style} className={classes.Modal}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }

}
export default Modal;