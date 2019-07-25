import * as actionTypes from '../actions/actionsTypes';
import { updateObject} from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased : false
};

const purchaseInit = (state,action) => {
    return updateObject(state, { purchased : false});
}
const purchaseSuccess = (state,action) => {
    const newOrder = {
        ...action.orderData,
        id : action.orderId
    };
    return updateObject(state, { loading : false , purchased : true, orders: state.orders.concat(newOrder)});

}
const purchaseFail = (state,action) => {
    return updateObject(state, { loading : false});
}
const purchasBurgerInit = (state,action) => {
    return updateObject(state, { loading : true});
}
const purchasBurgerStart = (state,action) => {
    return updateObject(state, { loading : true});
}
const purchasBurgerSuccess = (state,action) => {
    return updateObject(state, { orders : action.orders, loading : false});
}
const fetchOrdersFail = (state,action) => {
    return updateObject(state, { loading : false});

}



const reducer = (state= initialState, action) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchasBurgerInit(state,action);
        case actionTypes.FETCH_ORDERS_START : return purchasBurgerStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS : return purchasBurgerSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL : return fetchOrdersFail(state,action);
        default:  return state;
    }
};

export default reducer;