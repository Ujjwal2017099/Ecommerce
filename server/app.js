const express = require('express');
const cors = require('cors');
const {v4:uuidv4} = require('uuid');
const stripe = require("stripe")(
    "sk_test_51MhxgXSGbAumJYuJJmviG8SLcxUdMUXiSnwwCD48HOhD2qyEDJ5i0zzHNy5gS0VNg5jlL8MzNN6K5nVAZE1Q0jtJ00lmgXlNLQ"
);

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Thank You for visiting our Website');
})

app.post('/checkout',async (req,res)=>{
    let err,status;
    try {
        const {cart,token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source : token.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount : cart.TotalPayPrice,
            currency : 'usd',
            customer: customer.id,
            receipt_email : token.email,
            description : 'description',
            shipping:{
                name : token.card.name,
                address:{
                    line1 : token.card.address_line1,
                    line2 : token.card.address_line2,
                    city : token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },{idempotencyKey : key})
        status='success'
    } catch (error) {
        err = error;
        status='error';
        console.log(error);
    }
    res.json({status});
})

app.listen(4000,()=>{
    console.log('server started');
})