import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import * as actions from "../../store/actions/index";


class Checkout extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    }


    render(){
        let summary = <Redirect to="/"/>
        const purchasedRedirect = this.props.purchased? <Redirect to="/"/>: null;
        if(this.props.ings){
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path = {this.props.match.path + '/contact-data'}
                component = {ContactData}/>
                </div>)
        }
        return (
            <div>
                {summary}     
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);