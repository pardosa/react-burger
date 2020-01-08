import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // componentWillMount() {
    //     this.props.onPurchaseInit();
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    };

    render () {
        let summary = <Redirect to='/' />;

        if (this.props.ings) {
            const purchasedRedir = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedir}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                path={this.props.match.path + '/contact-data'}
                component={ContactData} />
                </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
};

// const  mapDispatchToProps = dispatch => {
//     return {
//         onPurchaseInit: () => dispatch(actions.purchaseInit())
//     }
// };

export default connect(mapStateToProps)(Checkout);