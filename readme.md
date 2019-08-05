# Ravepay Nodejs Library v1.0.0

## Ravepay Services exposed by the library

- Card Charge
- Tokenized Charge
- Fees
- Banks
- Account Charge 
- Transfers
- Subaccount
- Subscription
- Payment Plan
- Card PreAuthorization

For more information on the services listed above, visit the [Ravepay website](http://rave.flutterwave.com/)

Getting Started With The Nodejs SDK
==================
The official Nodejs SDK for making both Account and Card charges

Step 1
------
Install rave in your project

## How to use
<pre class="code-snippet">
npm install ravepay
</pre>



 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.
 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.

 
<pre class="code-snippet">
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
</pre>

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

<pre class="code-snippet">
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'https://ravesandboxapi.flutterwave.com'

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

</pre>

### Card Charge

<pre class="code-snippet">
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Card.charge(
    {
        "cardno": "5438898014560229",
        "cvv": "564",
        "expirymonth": "10",
        "expiryyear": "20",
        "currency": "NGN",
        "country": "NG",
        "amount": "10",
        "email": "user@gmail.com",
        "phonenumber": "0902620185",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-" + Date.now(),// your unique merchant reference
        "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      }
).then(resp => {
    // console.log(resp.body);

    rave.Card.validate({
        "transaction_reference":resp.body.data.flwRef,
        "otp":12345
    }).then(response => {
        console.log(response.body.data.tx);
        
    })
    
}).catch(err => {
    console.log(err);
    
})
</pre>


### Tokenized Charge

<pre class="code-snippet">
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.TokenCharge.card({
   "currency":"NGN",
   "SECKEY":"FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
   "token":"flw-t0876849e016386b2d-k3n-mock",
   "country":"NG",
   "amount":1000,
   "email":"desola.ade1@gmail.com",
   "firstname":"temi",
   "lastname":"Oyekole",
   "IP":"190.233.222.1",
   "txRef":"MC-7666-YU"
}).then(resp => {
    console.log(resp.body);
}).catch(err => {
    console.log(err);
    
})
</pre>


