import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }
    componentDidMount() {
        axios.get(' http://127.0.0.1:8000/api/commands')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data["hydra:member"]){
                    fetchedOrders.push({
                        ingredients : JSON.parse(response.data["hydra:member"][key].ingredients),
                        price : response.data["hydra:member"][key].price,
                        id : key
                    });
                }
                this.setState({loading : false,orders : fetchedOrders})
            })
            .catch(error =>{
                this.setState({loading : false})
            });
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order =>(
                    <Order
                        key = {order.id}
                        ingredients = {order.ingredients}
                        price = {order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);