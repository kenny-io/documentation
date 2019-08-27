# Overview

# Ravepay Nodejs Library v1.0.0

Getting Started With The Nodejs SDK
==================
The official Nodejs SDK for making both Account and Card charges


** NOTES

<div class="notes">
When a transfer is initiated, it comes with a status NEW this means the transfer has been queued for processing, and you would need to use the reference you passed to call the <a href="#">Fetch a Transfer</a> endpoint to retrieve the updated status of the transfer.
</div>

** END NOTE


Step 1: Install the SDK
------
Install rave in your project

```
npm install ravepay
```

Step 2: Initialise the SDK
------

```
var Ravepay = require('ravepay');
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

**If you pass true as the value for **PRODUCTION_FLAG**, the library will use the production url
as the base for all calls. Otherwise it will use the staging base url;**


```
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'http://'
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'
```

`throwing this in there`

Step 3: Create a transfer recipient
-------
**To charge a card, construct an object with the payment details and pass to
ravePay Card charge method.**

```
var payload = {
            "cardno": "5438898014560229",
            "cvv": "789",
            "expirymonth": "07",
            "expiryyear": "18",
            "currency": "NGN",
            "pin": "7552",
            "country": "NG",
            "amount": "10",
            "email": "user@example.com",
            "phonenumber": "1234555",
            "suggested_auth": "PIN",
            "firstname": "user1",
            "lastname": "user2",
            "IP": "355426087298442",
            "txRef": "MC-7663-YU",
            "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
};
```


Step 4: Get the transfer fee
------------


Step 5: Initiate the transfer
---------


Step 6: Handle your transfer callback
--------


Step 7: Verify the transfer status
-------


