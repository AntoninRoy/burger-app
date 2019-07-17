import  React,{ Component } from 'react';
import Aux from '../Auxi/Auxi';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

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
            <Toolbar drawerToggleClicked ={this.sideDrawToggleHandler}/>
            <SideDraw open ={this.state.showSideDrawer} closed ={this.sideDrawClosedHandler}/>
            <main className ={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    }
};

export default Layout;