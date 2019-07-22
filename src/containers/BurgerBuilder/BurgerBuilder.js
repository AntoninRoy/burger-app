import React, {Component} from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import  withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat : 1.3,
    bacon : 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        purchasable: false,
        totalPrice : 4,
        purchasing : false,
        loading : false,
        error : false,
    };

    componentDidMount() {
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
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice +priceAddition;
        this.setState({totalPrice: newPrice, ingredients : updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice -priceDeduction;
        this.setState({totalPrice: newPrice, ingredients : updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

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
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = null;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredient's can't be loaded</p> : <Spinner/>;

        if(this.state.ingredients){
            burger =
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price ={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered ={this.purchaseHandler}

                    />
                </Aux>;
            orderSummary =  <OrderSummary
                price ={this.state.totalPrice}
                ingredients ={ this.state.ingredients }
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

export default withErrorHandler(BurgerBuilder,axios);