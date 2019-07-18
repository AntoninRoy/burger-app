import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name :'',
        email : '',
        adresse: {
            street: '',
            postalCode: ''
        },
        loading : false
    };

    orderHandler = (e) => {
        e.preventDefault();


        this.setState({loading: true});
        const order = {
            "ingredients" : JSON.stringify(this.props.ingredients),
            "price" : this.props.price,
            "delivryMethod" : "fastest",
            "customer" : "Antonin",
            "adress" : {
                "street" : "Testadress",
                "zipcode" : "79340",
                "country" : "France"
            }
        };
        console.log(order);

        axios.post('commands',order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({loading: false})
            });

    }

    render(){
        let form =<form>
            <input className={classes.Input} type ='text' name ="name" placeholder="Your name" />
            <input className={classes.Input} type ='email' name ="email" placeholder="Your email" />
            <input className={classes.Input} type ='text' name ="street" placeholder="Your Street" />
            <input className={classes.Input} type ='text' name ="postal" placeholder="Your Postal code" />
            <Button btnType="Success" clicked ={this.orderHandler}>ORDER</Button>
        </form>;

        if(this.state.loading){
            form =<Spinner/>
        }
        return (
            <div className ={classes.ContactData}>
                <h4>Enter yout contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;