# Transfer Recipients

If you have a list of transfer recipients, then the process of transfering money from your Flutterwave balance to the recipients accounts becomes faster. 

###Create a transfer recipient 
The first step to making a transfer is to create the transfer recipient. Basically, you would call our [create recipient endpoint](https://developer.flutterwave.com/reference#create-a-transfer-recipient) with the details of the recipient (Bank account no, Bank ISO) and your secret key. 

This recipient will be create on your account and assigned a unique reference. This is not a mandatory step as you can as well provide the recipient bank details while initiating a transfer, however, if you have an existing recipient, you can easily pass their `id` instead. 
Here's a sample implementation for creating a recipient:

##Change snippets to PHP
```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/transfers/beneficiaries/create
', {
    json: {
        "account_bank": "063",
        "account_number": "00*****310",
        "seckey": "YOUR_SECRET_KEY"
	}
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(body)
})
``` 
#### Request parameters
The table below defines the parameters and descriptions of the request object we constructed above to create a new recipient. 

| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `account_bank` 	| True 	| This is the recipient's bank ISO code, use this [List of Banks](https://developer.flutterwave.com/reference#list-of-banks) to retrieve a list of all supported banks with their respective ISO codes. Ex: "063", "044" etc. 	|
| `account_number` 	| True 	| This is the bank account number of the recipient. 	|
| `seckey` 	| True 	| This is your merchant secret key, see how to get your API keys from your dashboard [here](https://developer.flutterwave.com/reference#api-keys-1) | 


#### Sample response
Here's a sample response you will get when your recipient creation request is processed successfully: 

```json
{
    "status": "success",
    "message": "BENEFICIARY-CREATED",
    "data": {
        "id": 400570,
        "account_number": "00*****310",
        "bank_code": "063",
        "fullname": "EKENE EZE",
        "date_created": "2020-01-23T12:32:23.000Z",
        "bank_name": "ACCESS BANK PLC (DIAMOND)"
    }
}
```

###List transfer recipients
To view a list of all the available transfer recipients on your account, make a request to our [beneficiaries endpoint](https://developer.flutterwave.com/reference#fetch-recipients) with your merchant secret key. Here's a sample implementation:
##Change snippets to PHP
```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.ravepay.co/v2/gpx/transfers/beneficiaries',
  qs: { 
  	seckey: 'YOUR_SECRET_KEY' 
  },
  headers:
   { 'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

###Sample response
Flutterwave will return a response in this format to provide you more information about the recipients under your account:

```json
{
    "status": "success",
    "message": "QUERIED-BENEFICIARIES",
    "data": {
        "page_info": {
            "total": 2,
            "current_page": 1,
            "total_pages": 1
        },
        "payout_beneficiaries": [
            {
                "id": 400570,
                "account_number": "00*****310",
                "bank_code": "063",
                "fullname": "EKENE EZE",
                "meta": null,
                "date_created": "2020-01-23T12:32:23.000Z",
                "bank_name": "ACCESS BANK PLC (DIAMOND)"
            },
            {
                "id": 400407,
                "account_number": "01*****458",
                "bank_code": "058",
                "fullname": " EZE EKENE",
                "meta": null,
                "date_created": "2020-01-23T10:41:42.000Z",
                "bank_name": "GTBANK PLC"
            }
        ]
    }
}

```
##Fetch a recipient
Just like fetching a list of all your recipients, you can as well make a request to fetch a single recipient on your account. This will require you to use the `id` of that recipient that was returned as `data.id` in your response object when the recipient was created. Here's a sample request to fetch a recipient:
##Change snippets to PHP
```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.ravepay.co/v2/gpx/transfers/beneficiaries',
  qs: { 
  	seckey: 'YOUR_SECRET_KEY',
  	id: '400570' // recipient id, gotten from the create a recipient response
  },
  headers:
   { 'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

###Sample response
This is a sample response from returned by Flutterwave to provide you more information about the recipient when your request is processed successfully:

```json
{
  "status": "success",
  "message": "QUERIED-BENEFICIARIES",
  "data": {
    "page_info": {
      "total": 1,
      "current_page": 1,
      "total_pages": 1
    },
    "payout_beneficiaries": [
      {
        "id": 400570,
        "account_number": "00*****310",
        "bank_code": "063",
        "fullname": "EKENE EZE",
        "meta": null,
        "date_created": "2020-01-23T12:32:23.000Z",
        "bank_name": "ACCESS BANK PLC (DIAMOND)"
      }
    ]
  }
}
```

##Delete a recipient
You can delete an existing recipient from your Flutterwave account programmatically using this feature. When you're done transacting with a particular recipient and would like to delete their details from your account, you can do so by making a request to delete that recipient using the recipients `id`. Here's a sample request:
##Change snippets to PHP
```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/transfers/beneficiaries/delete', {
    json: {
        "id": "400570", // recipient id, gotten from the create a recipient response
        "seckey": "YOUR_SECRET_KEY"
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
Here's a sample response for succesfully deleting a recipient:

```json
{
    "status": "success",
    "message": "BENEFICIARY-DELETED",
    "data": "Deleted"
}
```