# Purchase a bill service

You can purchase a single bill service such as airtime, DStv, etc through the  fly_buy  service. When you pass this in your  POST  request, also pass in a service payload as well. Below is a code sample depicting how you can do this:

```javascript

var request = require('request')

request.post(' https://api.ravepay.co/v2/services/confluence', {
    json: {
        "secret_key": "<YOUR SECRET KEY>",
        "service": "fly_buy",
        "service_method": "post",
        "service_version": "v1",
        "service_channel": "rave",
        "service_payload": {
            "Country": "NG",
            "CustomerId": "+23490803840303",
            "Reference": "9300049404444",
            "Amount": 500,
            "RecurringType": 0,
            "IsAirtime": true,
            "BillerName": "AIRTIME"
        }
    }
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
})
```

Below is an example of the response you'll get should your request be successful:

```javascript

{
  "status": "success",
  "message": "SERVICE-RESPONSE",
  "data": {
    "MobileNumber": "+2349082930030",
    "Amount": 500,
    "Network": "9MOBILE",
    "TransactionReference": "CF-FLYAPI-20190822093219730987",
    "PaymentReference": "BPUSSD15665095405052159977",
    "BatchReference": null,
    "ExtraData": null,
    "Status": "success",
    "Message": "Bill Payment was completed successfully",
    "Reference": null
  }
}
```

Two scenarios could lead to an error message being returned:

 An invalid customer ID: 

 ```javascript

    {
      "Status": "fail",
      "Message": "Invalid customer id",
      "Code": "903",
      "CustomerReference": "+2339026420185"
    }

 ```

 Or an invalid phone number:

```javascript

    {
      "Status": "fail",
      "Message": "Invalid Phone",
      "Code": "905",
      "CustomerReference": "+190830030"
    }

```

## Single bill service parameters

| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `Country` 	| True 	| This is the country attached to the service being bought e.g. if `isAirtime` is `true` and `country` is `NG` it means you are buying airtime in Nigeria. `country` can be any of these: `NG`, `GH` or `US` 	|
| `CustomerId` 	| True 	| This is the customer identifier. For airtime, the value must be the customer's phone number. For DSTV, it must be the customer's smartcard number. 	|
| `Amount` 	| True 	| This is the amount for the service you would like to buy. 	|
| `RecurringType` 	| True 	| This determines if you are buying a service recurrently or not. When value is:,`0` - This is a one time payment.,`1` - This is an hourly payment. `2` - This is a daily payment. `3` - This is a weekly payment. `4` - This is a monthly payment. 	|
| `IsAirtime` 	| True 	| Set this flag to true for airtime payments and false for dstv and non airtime payments. 	|
| `BillerName` 	| True 	| Pass the following possible values based on the service being bought.,`AIRTIME`, `DSTV`, `DSTV BOX OFFICE`. 	|
| `Reference` 	| False 	| This is a unique reference passed by the developer to identify transactions on their end. 	|

## Purchasing a bill service in bulk

You may want to purchase certain services in bulk. Rave enables this via the  `fly_buy_bulk`  service. This is handy for merchants who who may want to provide value to multiple customers at once. Here's a code snippet depicting how this is done:

```javascript

    var request = require('request')
    
    request.post(' https://api.ravepay.co/v2/services/confluence', {
        json: {
            "secret_key": "<YOUR SECRET KEY>",
            "service": "fly_buy_bulk",
            "service_method": "post",
            "service_version": "v1",
            "service_channel": "rave",
            "service_payload": {
                "BatchReference": "batch-rave-150928302799933922",
                "CallBackUrl": "https://rave-webhook.herokuapp.com/newregistration",
                "Requests": [{
                        "Country": "NG",
                        "CustomerId": "+23490803840303",
                        "Amount": 500,
                        "RecurringType": 0,
                        "IsAirtime": true,
                        "BillerName": "AIRTIME",
                        "Reference": "9300049404444"
                    },
                    {
                        "Country": "GH",
                        "CustomerId": "+233276081163",
                        "Amount": 10,
                        "RecurringType": 0,
                        "IsAirtime": true,
                        "BillerName": "AIRTIME",
                        "Reference": "9300049405555"
                    },
                    {
                        "Country": "US",
                        "CustomerId": "+190830030",
                        "Amount": 20,
                        "RecurringType": 0,
                        "IsAirtime": true,
                        "BillerName": "AIRTIME",
                        "Reference": "9300049406666"
                    }
                ]
            }
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
    })

```

Below is a sample response:

```javascript

    {
        "status": "success",
        "message": "SERVICE-RESPONSE",
        "data": {
            "MobileNumber": null,
            "Amount": 0,
            "Network": null,
            "TransactionReference": null,
            "PaymentReference": null,
            "BatchReference": "CF-BATCH-FLY-API-201808241206220204935114",
            "Status": "success",
            "Message": "Bill Payment was queued for processing",
            "Reference": null
        }
    }

```

Two scenarios could lead to an error message being returned:

 An invalid customer ID: 

```javascript

    {
      "Status": "fail",
      "Message": "Invalid customer id",
      "Code": "903",
      "CustomerReference": "+2339026420185"
    }

```

Or an invalid phone number:

```javascript

    {
      "Status": "fail",
      "Message": "Invalid Phone",
      "Code": "905",
      "CustomerReference": "+190830030"
    }

```

**Bulk bill service parameters**


|Parameter                       | Required                    | Description                                |
| :----------------------------- | :-------------------------- | :----------------------------------------- |
| `BatchReference`               | True                        | This is a reference that identifies the    |
                                                                 batch request being made for bulk requests.
| `CallBackUrl`                  | True                        | This is an endpoint supplied by you the    |                                                                    developer/merchant so we can send a 
                                                                 response when each request in the bulk is completed.
| `Requests`                     | True                        | This is an array containing each           |
                                                                 individual request in the batch.
| `Country`                      | True                        | This is the country attached to the 
                                                                 service being bought e.g. if `isAirtime` 
                                                                 is  `true` and `country` is  `NG` it means you are buying airtime in Nigeria.
                                                                 Country can be these set of options 
                                                                 `NG`, `GH` or `US`
| `CustomerId`                   | True                        | This is the customer detail. For airtime   |
                                                                 the value must be the customer's phone
                                                                 number and for DSTV it must be the 
                                                                 customer's smartcard number.
| `Amount`                       | True                        | This is the amount for the service you     |
                                                                 would like to buy.                          
| `RecurringType`                | True                        | This determines if you are buying a        |
                                                                 service recurrently or not.
                                                                 When value is:
                                                                 `0` - This is a one time payment.
                                                                 `1` - This is an hourly payment.
                                                                 `2` - This is a daily payment.
                                                                 `3` - This is a weekly payment.
                                                                 `4` - This is a monthly payment.     
| `IsAirtime`                    | True                        |  Set this flag to `true` for airtime      |
                                                                  payments and `false` for dstv and non
                                                                  airtime payments.     
| `BillerName`                   | True                        | Pass the following possible values based  |
                                                                 on the service being bought.
                                                                 `AIRTIME`, `DSTV`, `DSTV BOX OFFICE`.   
| `Reference`                    | False                       | This is a unique reference passed by the  |                                                                    developer to identify transactions on
                                                                 their end.                                  
|                                |                             |                                           |  
                                             


| Parameter 	| Required 	| Description 	|
|------------------	|----------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `BatchReference` 	| True 	| This is a reference that identifies the batch request being made for bulk requests. 	|
| `CallBackUrl` 	| True 	| This is an endpoint supplied by you the developer/merchant so we can send a response when each request in the bulk collection is completed. 	|
| `Requests` 	| True 	| This is an array containing each individual request in the batch. 	|
| `Country` 	| True 	| This is the country attached to the service being bought e.g. if `isAirtime` is `true` and `country` is `NG` it means you are buying airtime in Nigeria. Country can be these set of options `NG`, `GH` or `US` 	|
| `CustomerId` 	| True 	| This is the customer detail. For airtime the value must be the customer's phone number and for DSTV it must be the customer's smartcard number. 	|
| `Amount` 	| True 	| This is the amount for the service you would like to buy. 	|
| `RecurringType` 	| True 	| This determines if you are buying a service recurrently or not. When the value is:  	|
|  	|  	| `0` - This is a one-time payment. 	|
|  	|  	| `1` - This is an hourly payment. 	|
|  	|  	| `2` - This is a daily payment. 	|
|  	|  	| `3` - This is a weekly payment. 	|
|  	|  	| `4` - This is a monthly payment. 	|
| `IsAirtime` 	| True 	| Set this flag to `true` for airtime payments and `false` for dstv and non airtime payments. 	|
| `BillerName` 	| True 	| Pass the following possible values based on the service being bought. `AIRTIME`, `DSTV`, `DSTV BOX OFFICE`. 	|
| `Reference` 	| False 	| This is a unique reference passed by the developer to identify transactions on their end. 	|