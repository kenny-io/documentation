## Quickstart
Flutterwave transfer feature makes it possible for you to send money to other bank accounts directly from your Flutterwave dashboard or via our [APIs](https://flutterwavedevelopers.readme.io/v2.0/reference#how-transfers-work). We would describe the process to complete a transfer both through your Flutterwave dashboard and our API.

##Make a transfer from your Flutterwave dashboard
To make a transfer from your dashboard, you need to ensure that your available balance on Flutterwave is funded. You can see how to do that [here](https://support.flutterwave.com/en/articles/3632728-top-up-your-available-balance). 

Then navigate to the `Transfers` section on your dashboard and click **+ New Transfer** 

![New Transfer](https://res.cloudinary.com/kennyy/image/upload/v1579774158/new-transfer_jiti6i.png)

Choose the transfer recipient type:

![Transfer recipient type](https://res.cloudinary.com/kennyy/image/upload/v1579774532/transfer-type_lcf92h.png)


Select the type of transfer you want to make, bulk or single:

![Transfer type](https://res.cloudinary.com/kennyy/image/upload/v1579774773/transfer-type_jrdlnc.png)

Enter the recipient account details or select an existing account and click on **Confirm Transfer** to complete your transfer.

![Complete Transfer](https://res.cloudinary.com/kennyy/image/upload/v1579775241/complete_transfer_ywipyp.png)

When you've completed the transfer, it will be processed in some seconds with a successful status:

![Transfer successful](https://res.cloudinary.com/kennyy/image/upload/v1579777252/transfer_successful_khj1hd.png)


### Making transfers in different currencies
Flutterwave allows you to initiate transfers to multiple currencies from any of the currencies available on your account. The exchange rate in the currency you would be transferring to would be displayed on the transfers page.

![Transfer in other currencies](https://res.cloudinary.com/kennyy/image/upload/v1579777525/transfer_in_other_currencies_qia4h5.png)
![Transfer exchange rates](https://res.cloudinary.com/kennyy/image/upload/v1579777721/exchange_rate_z1entq.png)


##Make a transfer using the Flutterwave API

Making transfers with our API's can be done in a few clear steps. However, it is important you first understand how our transfer API works.

When a transfer is initiated, it comes with a status `NEW` which means the transfer has been queued for processing. To get the updated status of the transfer, you would need to get the `id` of the transfer. 

The transfer `id` is the one you got as `data.id` from the response object when you initiated the transfer. You can then use this `id` in your request object to make a fresh request to our [Fetch a Transfer](https://developer.flutterwave.com/reference#fetch-transfers) endpoint to retrieve the updated status of the transfer.


###Create transfer recipient 
The first step to making a transfer is to create the transfer recipient. Basically, you would call our [create recipient endpoint](https://developer.flutterwave.com/reference#create-a-transfer-recipient) with the details of the recipient (Bank account no, Bank ISO) and your secret key. 

This recipient will be create on your account and assigned a unique reference. This is not a mandatory step as you can as well provide the recipient bank details while initiating a transfer. However, if you have an existing recipient, you can easily pass the recipients `id` when initiating a transfer rather than defining all their bank details in your request object. Here's a sample implementation for creating a new transfer recipient:

##Change snippet to PHP

```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/transfers/beneficiaries/create
', {
    json: {
        "account_bank": "063",
        "account_number": "0058000310",
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
| `account_bank` 	| True 	| This is the recipient's bank ISO code, use this [List of Banks endpoint](https://developer.flutterwave.com/reference#list-of-banks) to retrieve a list of all supported banks with their respective ISO codes. Ex: "063", "044" etc. 	|
| `account_number` 	| True 	| This is the bank account number of the recipient. 	|
| `seckey` 	| True 	| This is your merchant secret key, see how to get your API keys from your dashboard [here](https://developer.flutterwave.com/reference#api-keys-1) | 
`business_name` 	| False 	| This is the sub-account business name. 

#### Sample response
When these values are provided and the request is successful, Flutterwave will return a response in this format to provide you more information about the new recipient:

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


###Initiate a transfer
To initiate a transfer, you will need to supply transfer details and send it in a POST request to our [transfer](https://api.ravepay.co/v2/gpx/transfers/create) endpoint. Here's a sample implementation to initiate a transfer:

##Change snippet to PHP

```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/transfers/create', {
    json: {
        "account_bank": "063",
        "account_number": "0058000310",
        "seckey": "YOUR_SECRET_KEY",
        "currency": "NGN",
        "narration": "New transfer",
        "beneficiary_name": "EKENE EZE",
        "amount": "200"
}
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(body)
})
``` 
If you're making a transfer to an existing beneficiary, you will not need to specify the `account_bank` and `account_number` parameters. Instead, you will pass the `recipient` parameter and supply the `id` of the recipient as the value:
##Change snippet to PHP

```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/transfers/create', {
    json: {
        "recipient": "400570", // recipient id, gotten from the create a recipient response
        "seckey": "YOUR_SECRET_KEY",
        "currency": "NGN",
        "narration": "New transfer",
        "beneficiary_name": "EKENE EZE",
        "amount": "200"
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
When these values are provided and the request is successful, Flutterwave will return a response in this format to provide more information about the new transfer:

```json
{
    "status": "success",
    "message": "TRANSFER-CREATED",
    "data": {
        "id": 1094570,
        "account_number": "00*****310",
        "bank_code": "063",
        "fullname": "EKENE EZE",
        "date_created": "2020-01-23T14:27:48.000Z",
        "currency": "NGN",
        "amount": "100",
        "fee": 45,
        "status": "NEW",
        "reference": "527d8b1f9abdb6a4",
        "meta": null,
        "narration": "New transfer",
        "complete_message": "",
        "requires_approval": 0,
        "is_approved": 1,
        "bank_name": "ACCESS BANK PLC (DIAMOND)"
    }
}
```
