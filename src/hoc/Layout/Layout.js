import React, { Component } from 'react';
import Auxiliary from '../Aux/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';


class Layout extends Component {

    state = {
        showSideDraw: false
    }

    sideDrawClosedHandler = () => {
        this.setState({showSideDraw:false})
    }

    sideDrawTogglerHandler = () => {
        this.setState((previousState) => {
            return {
                showSideDraw: !previousState.showSideDraw
            }
        })
    }

    render(){
       return( <Auxiliary>
                <Toolbar toggler={this.sideDrawTogglerHandler} />
                <SideDraw
                showSideDraw ={this.state.showSideDraw}
                close={this.sideDrawClosedHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
         </Auxiliary>
       )
    }

}

export default Layout;