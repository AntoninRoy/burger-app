import * as actionTypes from './actionsTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id,orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger=(orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/commands',orderData)
            .then(response => {
                console.log(response)
                dispatch(purchaseBurgerSuccess(response.data.id,orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
};

export const  fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    };
};

export const  fetchOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    };
};

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/commands')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data["hydra:member"]){
                    fetchedOrders.push({
                        ingredients : JSON.parse(response.data["hydra:member"][key].ingredients),
                        price : response.data["hydra:member"][key].price,
                        id : key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error =>{
                dispatch(fetchOrdersFail());
            });
    };
};