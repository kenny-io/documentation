## Going Live

### Card Charge

```javascript
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
```


### Tokenized Charge

```javascript
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
```