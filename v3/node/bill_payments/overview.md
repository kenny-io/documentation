# Overview

    With Rave, merchants can resell payment services such as airtime in Nigeria, Ghana and the US and cable television (DStv) in Nigeria and Ghana. For every successful airtime sale, a merchant gets to make a 3% commission and for every other successful bill transaction, a commission of 30 NGN. To use our bill payment APIs you would need to follow the prerequisites below:


1. Sign-up for a test account here, and for a live account here .
2. Navigate to the `Transfers` page on your dashboard and top up your balance using the Top up balance option.
3. Ensure your available balance is funded before making use of the APIs.



## Bill payment endpoints

Staging: https://ravesandboxapi.flutterwave.com/v2/services/confluence
Live: https://api.ravepay.co/v2/services/confluence


## Available Bill Services

- Airtime Nigeria (All networks)
- Airtime Ghana (All networks)
- Airtime US
- DStv payment Nigeria(also known as DStv Box)
- DStv payment Ghana
- DStv Box Office
- LCC Lekki & Ikoyi
- Eko Disco Postpaid & Prepaid
- Data bundles for all networks (Nigeria & Uganda)


## Request Structure

```javascript
   
    var request = require('request')
    
    request.post(' https://api.ravepay.co/v2/services/confluence', {
        json: {
            "secret_key": "<YOUR SECRET KEY>",
            "service": "bills_categories",
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

## Response Structure

```javascript
    JSON
    {
        "status": "success",
        "message": "SERVICE-RESPONSE",
        "data": {
            "Status": "success",
            "Message": "Successful",
            "Data": [
                {
                    "Id": 1,
                    "BillerCode": "BIL099",
                    "Name": "MTN NIgeria",
                    "DefaultCommission": 0.02,
                    "DateAdded": "2018-07-03T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": true,
                    "BillerName": "AIRTIME",
                    "ItemCode": "AT099",
                    "ShortName": "MTN",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[+]{1}[0-9]+$",
                    "LabelName": "Mobile Number"
                },
                {
                    "Id": 2,
                    "BillerCode": "BIL099",
                    "Name": "GLO Nigeria",
                    "DefaultCommission": 0.025,
                    "DateAdded": "2018-07-03T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": true,
                    "BillerName": "AIRTIME",
                    "ItemCode": "AT099",
                    "ShortName": "GLO",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[+]{1}[0-9]+$",
                    "LabelName": "Mobile Number"
                },
                {
                    "Id": 3,
                    "BillerCode": "BIL099",
                    "Name": "9Mobile",
                    "DefaultCommission": 0.025,
                    "DateAdded": "2018-07-03T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": true,
                    "BillerName": "AIRTIME",
                    "ItemCode": "AT099",
                    "ShortName": "9mobile",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[+]{1}[0-9]+$",
                    "LabelName": "Mobile Number"
                },
                {
                    "Id": 4,
                    "BillerCode": "BIL099",
                    "Name": "Airtel Nigeria",
                    "DefaultCommission": 0.025,
                    "DateAdded": "2018-07-03T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": true,
                    "BillerName": "AIRTIME",
                    "ItemCode": "AT099",
                    "ShortName": "Airtel",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[+]{1}[0-9]+$",
                    "LabelName": "Mobile Number"
                },
                {
                    "Id": 5,
                    "BillerCode": "BIL132",
                    "Name": "Airtime",
                    "DefaultCommission": 0.025,
                    "DateAdded": "2018-08-17T00:00:00Z",
                    "Country": "GH",
                    "IsAirtime": true,
                    "BillerName": "AIRTIME",
                    "ItemCode": "AT217",
                    "ShortName": "Airtime",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[+]{1}[0-9]+$",
                    "LabelName": "Mobile Number"
                },
                {
                    "Id": 6,
                    "BillerCode": "BIL135",
                    "Name": "Airtime",
                    "DefaultCommission": 0.025,
                    "DateAdded": "2018-08-17T00:00:00Z",
                    "Country": "US",
                    "IsAirtime": true,
                    "BillerName": "AIRTIME",
                    "ItemCode": "AT219",
                    "ShortName": "Airtime",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[+]{1}[0-9]+$",
                    "LabelName": "Mobile Number"
                },
                {
                    "Id": 7,
                    "BillerCode": "BIL119",
                    "Name": "DSTV Payment",
                    "DefaultCommission": 0.3,
                    "DateAdded": "2018-08-17T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": false,
                    "BillerName": "DSTV",
                    "ItemCode": "CB140",
                    "ShortName": "DSTV",
                    "Fee": 100,
                    "CommissionOnFee": true,
                    "RegExpression": "^[0-9]+$",
                    "LabelName": "Smart Card Number"
                },
                {
                    "Id": 8,
                    "BillerCode": "BIL137",
                    "Name": "DSTV Payment",
                    "DefaultCommission": 0,
                    "DateAdded": "2018-08-17T00:00:00Z",
                    "Country": "GH",
                    "IsAirtime": false,
                    "BillerName": "DSTV",
                    "ItemCode": "CB226",
                    "ShortName": "DSTV",
                    "Fee": 0,
                    "CommissionOnFee": false,
                    "RegExpression": "^[0-9]+$",
                    "LabelName": "Smart card Number"
                },
                {
                    "Id": 9,
                    "BillerCode": "BIL119",
                    "Name": "DSTV BoxOffice",
                    "DefaultCommission": 0.3,
                    "DateAdded": "2018-08-17T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": false,
                    "BillerName": "DSTV BOX OFFICE",
                    "ItemCode": "CB140",
                    "ShortName": "Box Office",
                    "Fee": 100,
                    "CommissionOnFee": true,
                    "RegExpression": "^[0-9]+$",
                    "LabelName": "Smart Card Number"
                },
                {
                    "Id": 10,
                    "BillerCode": "BIL127",
                    "Name": "LCC Lekki",
                    "DefaultCommission": 0.3,
                    "DateAdded": "2019-02-20T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": false,
                    "BillerName": "LCC",
                    "ItemCode": "UB224",
                    "ShortName": "LCC Lekki-Epe Expressway",
                    "Fee": 100,
                    "CommissionOnFee": true,
                    "RegExpression": "^[0-9\\-]+$",
                    "LabelName": "LCC Account Number"
                },
                {
                    "Id": 11,
                    "BillerCode": "BIL127",
                    "Name": "LCC Ikoyi",
                    "DefaultCommission": 0.3,
                    "DateAdded": "2019-02-20T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": false,
                    "BillerName": "LCC",
                    "ItemCode": "UB225",
                    "ShortName": "LCC Ikoyi Bridge",
                    "Fee": 100,
                    "CommissionOnFee": true,
                    "RegExpression": "^[0-9\\-]+$",
                    "LabelName": "Lcc Account Number"
                },
                {
                    "Id": 13,
                    "BillerCode": "BIL112",
                    "Name": "EKO PREPAID",
                    "DefaultCommission": 0.3,
                    "DateAdded": "2019-03-20T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": false,
                    "BillerName": "EKO DISCO BILLS",
                    "ItemCode": "UB157",
                    "ShortName": "EKO PREPAID",
                    "Fee": 100,
                    "CommissionOnFee": true,
                    "RegExpression": "^[0-9]$+",
                    "LabelName": "Meter Number"
                },
                {
                    "Id": 14,
                    "BillerCode": "BIL112",
                    "Name": "EKO PPOSTPAID",
                    "DefaultCommission": 0.3,
                    "DateAdded": "2019-02-03T00:00:00Z",
                    "Country": "NG",
                    "IsAirtime": false,
                    "BillerName": "EKO DISCO BLLS",
                    "ItemCode": "UB158",
                    "ShortName": "EKO POSTPAID",
                    "Fee": 100,
                    "CommissionOnFee": true,
                    "RegExpression": "^[0-9]$",
                    "LabelName": "Meter Number"
                }
            ]
        }
    }
```
## Parameters


| Parameter                         | Required               | Description                               |
| :------------------------------   | :--------------------  | :---------------------------------------- |
| `secret_key`                      | True                   | This is your merchant secret key. Please  |
                                                               see our section on API Keys to learn how 
                                                               to retrieve your secret key.              
| `service`                         | True                   | This is the bill payment service you want 
                                                               to use. Please see the list below with
                                                               an explanation of available services.
                                                               e.g. `fly_buy` , `fly_recurring`, etc
| `service_method`                  | True                   | This is the HTTP Method for the required  |                                                                    service.
| `service_version`                 | True                   | This is the version for the APIs ...      |
                                                               please set to v1, when a new version 
                                                               is available you would be able to 
                                                               specify your required version.
| `service_channel`                 | True                   | This is the channel for the service,      |
                                      Expected value: `rave`   always use rave as the value.
| `service_payload`                 | False                  | This is the request to be sent for the    |
|                                   |                        | service.                                  |









## Bill Payment Services


- `fly_buy` `[POST]`: This allows you to buy airtime or DSTV bill services. When you pass this as your `service` in the request, you would need to pass a `service_payload` as well.
- `fly_buy_bulk` `[POST]`: This allows you to buy bulk airtime and DSTV bill services.
- `fly_recurring` `[GET]`: This allows you to retrieve active recurring airtime and DSTV bill services.
- `fly_recurring_cancel` `[POST]`: This allows you to cancel recurring airtime and DSTV bill services.
- `fly_history` `[POST]`: This allows you to retrieve a history of all purchased bill services including commission earned.
- `fly_requery` `[POST]`: This allows you get the status of a bill purchase.
- `bill_categories` `[POST]`: This allows you to get a list of individual bill categories.
- `bills_validate` `[POST]`: This allows you to validate services like DSTV Smartcard number.