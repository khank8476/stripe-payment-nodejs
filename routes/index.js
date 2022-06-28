var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51H6TvUFCoZeck1x3pp9G7SiG8XTYPTRaRV2IQV4UJfWomExY0dAKwMXtH4AcYYyp6zLH1e6hc8VuA4C5d5pGFKgO00JkF6m0Io');

/* Get Home Page */
router.get('/', function(req, res, next){
    res.render('index', {title: 'stripe checkout example'});
});

router.post('/create-checkout-session', async function(req, res, next){
    try{
        const session = await stripe.checkout.sessions.create({
            customer: 'cus_JAMG0FL0O0a0AI',
            payment_method_types: ['card'],
            mode: "payment",
            line_items: [{
                price: 'price_1L9KYBFCoZeck1x3EGtuFmVO',
                quantity: 1
            }],
            success_url: '/success.html?id={CHECKOUT_SESSION_ID}',
            cancel_url: '/cancel.html'
        })
        res.send({id: session.id});
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = router;