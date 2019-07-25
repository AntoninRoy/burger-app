import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat : 1.3,
    bacon : 0.7
};

const addIngredient = (state,action) =>{
    const updatedIngredient ={[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state,updatedState);
};
const removeIngredient = (state,action) =>{
    const updatedIngredient ={[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state,updatedState);
};

const setIngredients = (state, action) => {
    let total = 4;
    for (let key in action.ingredients){
        total += action.ingredients[key] * INGREDIENT_PRICES[key]
    }
    return updateObject(state, {
        ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat,
        },
        totalPrice: total,
        error: false
    });
};

const fetchIngredientsFailed = (state, updatedState) => {
    return updateObject(state, {error : true});
};

const burgerBuilder = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:  return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state,action)
        default: return state;
    }
};

export default burgerBuilder;