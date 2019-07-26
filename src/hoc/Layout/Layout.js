import  React,{ Component } from 'react';
import Aux from '../Auxi/Auxi';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawClosedHandler =() => {
        this.setState({showSideDrawer:false})
    }
    sideDrawToggleHandler =() => {
        this.setState((prevState) => {
            return {showSideDrawer:!this.state.showSideDrawer}
        });
    }
    render(){
        return <Aux>
            <Toolbar
                isAuthenticated={ this.props.isAuthenticated }
                drawerToggleClicked ={this.sideDrawToggleHandler}/>
            <SideDraw
                isAuthenticated={ this.props.isAuthenticated }
                open ={this.state.showSideDrawer}
                closed ={this.sideDrawClosedHandler}/>
            <main className ={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    }
};
const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};



export default connect(mapStateToProps,null)(Layout);
