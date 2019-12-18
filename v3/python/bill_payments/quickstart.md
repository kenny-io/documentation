## Quickstart

**Bill Payments**

**Services included:**


- `fly_buy`   [POST]
- `fly_buy_bulk`  [POST]
- `fly_recurring`  [GET]
- `fly_recurring_cancel`  [POST]
- `fly_history`  [POST]
- `fly_requery`  [POST]
- `bill_categories`  [POST]
- `bill_validate`   [POST]


**`fly_buy`**   

This allows you to buy Airtime, DSTV bill services. When you pass this as your  `service`  in the request you would need to pass a  `service_payload`  as well.

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring = {
      "secret_key": "YOUR SECRET KEY",
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
    
    headers = {
      'content-type': 'application/json'
    }
    try:
    res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e:
      print(e)

```

Below is a sample response:

```python

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

```python

    {
      "Status": "fail",
      "Message": "Invalid customer id",
      "Code": "903",
      "CustomerReference": "+2339026420185"
    }

```

Or an invalid phone number:

```python

    {
      "Status": "fail",
      "Message": "Invalid Phone",
      "Code": "905",
      "CustomerReference": "+190830030"
    }

```

**```fly_buy_bulk```**

This allows you to buy bulk Airtime and DSTV bill services.

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring = {
        "secret_key": "YOUR SECRET KEY",
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
    
        headers = {
          'content-type': 'application/json'
        }
        try: res = requests.request("POST", url, headers = headers, params = querystring)
        print(res.text)
        except requests.exceptions.RequestException as e: print(e)

```

Below is a sample response:

```python

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

```python

{
  "Status": "fail",
  "Message": "Invalid customer id",
  "Code": "903",
  "CustomerReference": "+2339026420185"
}

```

Or an invalid phone number:

```python

    {
      "Status": "fail",
      "Message": "Invalid Phone",
      "Code": "905",
      "CustomerReference": "+190830030"
    }

```

**```fly_recurring```**

This allows you to retrieve details of active recurring Airtime and DSTV bill services.

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring = {
      "secret_key": "<YOUR SECRET KEY>",
      "service": "fly_buy_bulk",
      "service_method": "post",
      "service_version": "v1",
      "service_channel": "rave",
    }
    
    headers = {
      'content-type': 'application/json'
    }
    try:
    res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e:
      print(e)

```

**`fly_recurring_cancel`**

This allows you to cancel recurring Airtime and DSTV bill services.

```python

import requests

url = "https://api.ravepay.co/v2/services/confluence"

querystring = {
  "secret_key": "YOUR SECRET KEY",
  "service": "fly_recurring_cancel",
  "service_method": "post",
  "service_version": "v1",
  "service_channel": "rave",
  "service_payload": {
    "CustomerMobile": "+23481056829830",
    "RecurringPayment": 383 # Id of the recurring payment to be cancelled.
  }
}

headers = {
  'content-type': 'application/json'
}
try:
res = requests.request("POST", url, headers = headers, params = querystring)
print(res.text)
except requests.exceptions.RequestException as e:
  print(e)

```

**`fly_history`**

This allows you to retrieve a history of all purchased bill services including commission earned.

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring = {
      "secret_key": "YOUR SECRET KEY",
      "service": "fly_history",
      "service_method": "post",
      "service_version": "v1",
      "service_channel": "rave",
      "service_payload": {
        "FromDate": "2018-08-01",
        "ToDate": "2018-08-27",
        "PageSize": 20,
        "PageIndex": 0,
        "Reference": "+233494850059"
      }
    }
    
    headers = {
      'content-type': 'application/json'
    }
    try:
    res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e:
      print(e)

```

Below is a sample response:

```python

    {
        "status": "success",
        "message": "SERVICE-RESPONSE",
        "data": {
            "Summary": [
                {
                    "Currency": "NGN",
                    "SumBills": 3500,
                    "SumCommission": 40,
                    "SumDstv": 0,
                    "SumAirtime": 2000,
                    "CountDstv": 0,
                    "CountAirtime": 4
                },
                {
                    "Currency": "KES",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "GHS",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "USD",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "EUR",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "ZAR",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "GBP",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "TZS",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                },
                {
                    "Currency": "UGX",
                    "SumBills": 0,
                    "SumCommission": 0,
                    "SumDstv": 0,
                    "SumAirtime": 0,
                    "CountDstv": 0,
                    "CountAirtime": 0
                }
            ],
            "Transactions": [
                {
                    "Currency": "NGN",
                    "CustomerId": "+2349082930030",
                    "Frequency": "Hourly",
                    "Amount": "500.0000",
                    "Product": "AIRTIME",
                    "ProductName": "FLY-API-NG-AIRTIME-9MOBILE",
                    "Commission": 10,
                    "TransactionDate": "2018-08-24T05:35:07.213Z",
                    "TransactionId": 7895
                },
                {
                    "Currency": "NGN",
                    "CustomerId": "+2349082930030",
                    "Frequency": "One Time",
                    "Amount": "500.0000",
                    "Product": "AIRTIME",
                    "ProductName": "FLY-API-NG-AIRTIME-9MOBILE",
                    "Commission": 10,
                    "TransactionDate": "2018-08-24T01:06:31.55Z",
                    "TransactionId": 7891
                },
                {
                    "Currency": "NGN",
                    "CustomerId": "+2349082930030",
                    "Frequency": "One Time",
                    "Amount": "500.0000",
                    "Product": "AIRTIME",
                    "ProductName": "FLY-API-NG-AIRTIME-9MOBILE",
                    "Commission": 10,
                    "TransactionDate": "2018-08-23T16:56:07.193Z",
                    "TransactionId": 7868
                },
                {
                    "Currency": "NGN",
                    "CustomerId": "+2349082930030",
                    "Frequency": "One Time",
                    "Amount": "500.0000",
                    "Product": "AIRTIME",
                    "ProductName": "FLY-API-NG-AIRTIME-9MOBILE",
                    "Commission": 10,
                    "TransactionDate": "2018-08-23T16:55:49.413Z",
                    "TransactionId": 7867
                }
            ],
            "Total": 4,
            "Status": "success",
            "Message": "Successful",
            "Reference": null
        }
    }

```

Below is a sample error message

```python

    {
      "Status": "fail",
      "Message": "Invalid customer id",
      "Code": "903",
      "CustomerReference": "+2339026420185"
    }

```

**`fly_requery`**

This allows you to get the status of a bill purchase

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring =
    
      {
        "secret_key": "YOUR SECRET KEY",
        "service": "fly_requery_9300049404444", #Prefix "fly_requery_" plus your transaction reference.
        "service_method": "get",
        "service_version": "v1",
        "service_channel": "rave"
      },
    
      headers = {
        'content-type': 'application/json'
      }
    try:
    res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e:
      print(e)

```

Below is a sample response:

```python

    {
      "event.type": "Transfer",
      "transfer": {
        "id": 3455,
        "account_number": "233509382427",
        "bank_code": "MTN",
        "fullname": "Kwame Abe",
        "date_created": "2018-10-03T14:20:25.000Z",
        "currency": "GHS",
        "debit_currency": null,
        "amount": 49.99,
        "fee": 250,
        "status": "SUCCESSFUL",
        "reference": "rave-transfer-15028609",
        "meta": null,
        "narration": "Rave Mpesa transfer",
        "approver": null,
        "complete_message": "Approved Or Completed Successfully",
        "requires_approval": 0,
        "is_approved": 1,
        "bank_name": "FA-BANK"
      }
    }

```

**`bill_categories`**

This allows you to get a list of individual bill categories

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring =
    
      {
        "secret_key": "YOUR_SECRET_KEY",
        "service": "bills_categories",
        "service_method": "get",
        "service_version": "v1",
        "service_channel": "rave"
      },
    
      headers = {
        'content-type': 'application/json'
      }
    try:
    res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e:
      print(e)

```

Below is a sample response

```python

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

**`bills_validate`**

This allows you to validate serial or registration numbers pertaining to a particular service. An example is DSTV smart card number.

```python

    import requests
    
    url = "https://api.ravepay.co/v2/services/confluence"
    
    querystring =
    
      {
        "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
        "service": "bills_validate_CB140_BIL119_1025401152",
        "service_method": "get",
        "service_version": "v1",
        "service_channel": "rave"
      },
    
      headers = {
        'content-type': 'application/json'
      }
    try:
    res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e:
      print(e)

```

