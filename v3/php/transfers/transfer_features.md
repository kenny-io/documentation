# Transfer Features
Here are other features that the Flutterwave transfer API offers:

1. Get transfer fee
2. Get transfer balance
3. Account verification

##Get transfer fee
When making transfers individually or in bulk, some times you would want to know how much you're getting charged as transaction fees for these transfers. Flutterwave makes it possible to fetch these transfer fees in your preferred currencies via our API's. Here's a sample request:

##Change snippet to PHP
```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.ravepay.co/v2/gpx/transfers/fee',
  qs: { 
        "seckey": "YOUR_SECRET_KEY",
        "currency": "NGN"
  },
  headers:
   { 'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
``` 

###Sample response
When you've made a successful request, you will get a response containing a list of all your transfer fees in the format below:

```json
{
  "status": "success",
  "message": "TRANSFER-FEES",
  "data": [
    {
      "id": 1,
      "fee_type": "value",
      "currency": "NGN",
      "fee": 45,
      "entity": "account",
      "createdAt": null,
      "updatedAt": null,
      "deletedAt": null,
      "AccountId": 1
    },
    {
      "id": 111,
      "fee_type": "value",
      "currency": "NGN",
      "fee": 0,
      "entity": "barter",
      "createdAt": null,
      "updatedAt": null,
      "deletedAt": null,
      "AccountId": 1
    }
  ]
}
```

##Get transfer balance
Flutterwave makes it possible for you to get your current available balance programatically. This is particularly helpful in situations where you intend to confirm that you have enough available balance before initiating certain transfers. Here's a sample request:
##Change snippet to PHP

```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/balance', {
    json: {
        "seckey": "YOUR_SECRET_KEY",
        "currency": "NGN"
}
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(body)
})
``` 

###Sample response
When you've made a successful request, you will get a response that looks like the one below:

```json
{
  "status": "success",
  "message": "WALLET-BALANCE",
  "data": {
    "Id": 46547,
    "ShortName": "NGN",
    "WalletNumber": "6635000112321",
    "AvailableBalance": 1126
  }
}
```

##Account verification
When making transfers to user supplied bank accounts, we provide you the ability to verify that such accounts are valid before making transfers to them. Here's a sample verification implementation:

##Change snippet to PHP

```javascript
var request = require('request')
request.post('https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account', {
    json: {
        "recipientaccount": "01*****458",
        "destbankcode": "058",
        "PBFPubKey": "YOUR_PUBLIC_KEY",
        "currency": "",
        "country": ""
}
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(body)
})
``` 

###Request parameters
The table below defines the parameters and descriptions of the request object we constructed above to verify an account. 

| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `recipientaccount ` 	| True 	| This is the account to validate.	|
| `destbankcode ` 	| True 	| This is the bank mapped to the account, get a list of banks codes from the [List of Banks for Transfer](https://developer.flutterwave.com/reference#list-of-banks-for-transfer).	|
| `PBFPubKey ` 	| True 	| This is your merchant public key.| 
`currency ` 	| True 	| Add this only when resolving a Ghanian account. Expected value is GHS.
`country ` 	| True 	| Add this only when resolving a Ghanian account. Expected value is GH. 


###Sample response

```json
{
  "status": "success",
  "message": "ACCOUNT RESOLVED",
  "data": {
    "data": {
      "responsecode": "00",
      "accountnumber": "01*****458",
      "accountname": " EZE EKENE",
      "responsemessage": "Approved Or Completed Successfully",
      "phonenumber": null,
      "uniquereference": "1580056088140-233",
      "internalreference": null
    },
    "status": "success"
  }
}
```