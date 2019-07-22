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
        axios.get('/commands')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data["hydra:member"]){
                    fetchedOrders.push({
                        ...JSON.parse(response.data["hydra:member"][key].ingredients),
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
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);