import React, {Component} from 'react';
import {connect } from 'react-redux';


import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import  withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes  from '../../store/actions';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat : 1.3,
    bacon : 0.7
}
class BurgerBuilder extends Component {
    state = {
       // ingredients : null,
        purchasable: false,
        totalPrice : 4,
        purchasing : false,
        loading : false,
        error : false,
    };

    componentDidMount() {
        /*
        axios.get('/ingredients')
            .then(response => {
                const data = response.data['hydra:member'];
                let ingredients = [];
                data.forEach(element => {
                    ingredients[element['name']] = element['value'];
                })
                this.setState({ingredients: ingredients })
            })
            .catch(error =>{
                this.setState({error:true})
            });*/
    }


    //cette syntaxe fonction seulement s'il est n'est pas assignée à un event
    updatePurchaseState (updatedIngredients){
        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey]
            })
            .reduce((sum,el)=> {
                return sum +el
            },0);
        this.setState({purchasable : sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }
    purchaseContinueHandler = () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');

        console.log(queryString);
        this.props.history.push({
            pathname : '/checkout',
            search : '?'+queryString
        });
    };


    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = null;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredient's can't be loaded</p> : <Spinner/>;

        if(this.props.ings){
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price ={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered ={this.purchaseHandler}

                    />
                </Aux>;
                orderSummary =  <OrderSummary
                price ={this.state.totalPrice}
                ingredients ={ this.props.ings }
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }


        return (
           <Aux>
               <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                   {orderSummary}
               </Modal>
               {burger}
           </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));