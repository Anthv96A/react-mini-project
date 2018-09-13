import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDraw from '../Navigation/SideDraw/SideDraw';


class Layout extends Component {

    state = {
        showSideDraw: true
    }

    sideDrawClosedHandler = () => {
        this.setState({showSideDraw:false})
    }

    render(){
       return( <Auxiliary>
                <Toolbar/>
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