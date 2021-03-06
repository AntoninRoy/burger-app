import React, { Component } from 'react';
import { Route,Switch, withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import DataPage from './containers/DataPage/DataPage';

import Logout from './containers/Auth/Logout/Logout';
import * as actions from "./store/actions";


class  App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render(){
        let routes = (
            <Switch>
                <Route path='/data' component = {DataPage }/>
                <Route  path="/auth" component={ Auth }/>
                <Route  path="/" exact component={ BurgerBuilder }/>
                <Redirect to ='/data'/>
            </Switch>
        );

        if(this.props.isAuthenticated){
            routes = (
                    <Switch>
                        <Route  path="/auth" component={ Auth }/>
                        <Route  path="/checkout" component={ Checkout }/>
                        <Route  path="/orders" component={ Orders }/>
                        <Route  path="/logout" exact component={ Logout }/>
                        <Route  path="/" exact component={ BurgerBuilder }/>
                        <Redirect to ='/'/>
                    </Switch>
                )
        }
        return (
            <div >
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
  }

}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
