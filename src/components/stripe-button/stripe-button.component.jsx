import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51GqBMtKrB7CStHOT2kqKyVIWcNhx2peFdpdYO8BFKkbZ5yAYFala6uXWmvVoEV2JvZI6qYaqrSLzVb9QLQ1AlXmR00JTUM8Cbg';

    const onToken=token => {
        console.log(token);
        alert("payment successful");
    }

    return (
        <StripeCheckout 
        label = 'Pay Now'
        name = 'FAMstyle shopping Ltd'
        billingAddress
        shippingAddress
        currency="USD"
        image = 'https://sendeyo.com/up/d/f3eb2117da'
        discription={`your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token = {onToken}
        stripeKey={publishableKey}
        />
    );
}
 
export default  StripeCheckoutButton;