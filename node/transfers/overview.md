# Transfer Overview

Learn about Transfers, a seamless way to payout using Rave in multiple currencies.
***

## image from github
![Alt text](https://about.canva.com/wp-content/uploads/sites/3/2016/08/Band-Logo.png)



![3D FLOW](../assets/images/Slide1.png)



With Rave, you can initiate single and bulk transfers to bank accounts and mobile money accounts across Africa. Make transfers to vendors, partners or marketplace merchants all from your rave profile or via API. 

You can either use the money you have earned as income i.e. Money collected from your customer's using rave or fund your balance on rave to initiate transfers to bank accounts & mobile money wallets in:

- `Nigeria` 
- `United States`
- `Ghana`  
- `Kenya` 
- `Uganda` 
- `Tanzania`
- `Rwanda`
- `South Africa`
- `Zambia`
- `Ivory Coast`

Transfers can be done from the dashboard or using our [APIs](https://flutterwavedevelopers.readme.io/v2.0/reference#how-transfers-work). We would describe the process to complete a transfer on your rave dashboard below.


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


