# Quickstart
This document covers the request implementation examples for all our bill payment services. Here, you will find parameter definitions for all the sample requests we'll create for each service. You will also find the sample responses for each of those requests.

## Bill Payment Services
These are the available bill payment services on Flutterwave with their respective HTTP methods and descriptions.


| Service                         | Method               | Description                               |
| :------------------------------   | :--------------------  | :---------------------------------------- |
| `fly_buy`                      | POST                   | This allows you to buy airtime or DSTV bill services. When you pass this as your `service` in the request, you would need to pass a `service_payload` as well.   
| `fly_buy_bulk`                      | POST                   | This allows you to buy bulk airtime and DSTV bill services.  
| `fly_recurring`                      | GET                   | This allows you to retrieve active recurring airtime and DSTV bill services.
| `fly_recurring_cancel`                      | POST                   | This allows you to cancel recurring airtime and DSTV bill services.   
| `fly_history`                      | POST                   | This allows you to retrieve a history of all purchased bill services including commission earned.  
| `fly_requery`                      | POST                   | This allows you get the status of a bill purchase.  
| `bill_categories`                      | POST                   | This allows you to get a list of individual bill categories.  
| `bills_validate`                      | POST                   | This allows you to validate services like DSTV Smartcard number

### `fly_buy`

This allows you to buy Airtime, and DSTV bill services. When you pass `fly_buy` as your `service` in the request you would need to equally pass a `service_payload` parameter to define the bill payment options. Here's a sample request to buy airtime with the `fly_buy` service:

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'post',
     'service' => 'fly_buy',
     'service_version' => 'v1',
     'service_channel' => 'rave',
     'service_payload' => array(
         'Country' => 'NG',
         'CustomerId' => '+23490803840303',
         'Reference' => 9300049404444,
         'RecurringType' => 0,
         'Amount' =>500,
         'IsAirtime' => true,
         'BillerName' => 'AIRTIME',
     ),
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```

### Sample Response
Below is an example of the response you'll get if your request is successful:

```JSON
{
  "status": "success",
  "message": "SERVICE-RESPONSE",
  "data": {
    "MobileNumber": "+23490803840303",
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

### `fly_buy_bulk`

The `fly_buy_bulk` service allows you to buy bulk Airtime or DSTV bill services. Here's a sample request to buy bulk airtime for three different phone numbers.

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';

$ch = curl_init($url);
 
$jsonData = array(
    'secret_key' => 'YOUR_SECRET_KEY',
    'service' => 'fly_buy_bulk',
    'service_method' => 'post',
    'service_version' => 'v1',
    'service_channel' => 'rave',
    'service_payload' => array(
        'BatchReference' =>'batch-rave-150928302799933922',
        'CallBackUrl' =>'https://rave-webhook.herokuapp.com/newregistration',
        'Requests' => array(
            array(
            'Country' =>'NG',
            'CustomerId' =>'+23490803840303',
            'Reference' =>'9300049404444',
            'Amount' =>500,
            'RecurringType' =>0,
            'IsAirtime' =>true,
            'BillerName' =>'AIRTIME',
            ),
            array(
            'Country' =>'GH',
            'CustomerId' =>'+233276081163',
            'Reference' =>'9300049405555',
            'Amount' =>500,
            'RecurringType' =>0,
            'IsAirtime' =>true,
            'BillerName' =>'AIRTIME',
             ),
            array(
            'Country' =>'US',
            'CustomerId' =>'+190830030',
            'Reference' =>'9300049406666',
            'Amount' =>500,
            'RecurringType' =>0,
            'IsAirtime' =>true,
            'BillerName' =>'AIRTIME',
             )
    )
        )
            );
 
$jsonDataEncoded = json_encode($jsonData);

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 

$result = curl_exec($ch);
echo $result;
```

### Sample Response
The callback returns a response for each transaction in the batch. Below is an example of the response you'll get if your request is successful:

```JSON
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

### `fly_recurring`

`fly_recurring` is a service that allows you to retrieve details of all active recurring Airtime and DSTV bill services. Here's a sample request:

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'get',
     'service' => 'fly_recurring',
     'service_version' => 'v1',
     'service_channel' => 'rave',
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```

### Sample Response
This is a sample response for the `fly_recurring` service when your request is successful:

```JSON
{
    "status": "success",
    "message": "SERVICE-RESPONSE",
    "data": {
        "RecurringPayments": [
            {
                "Id": 5,
                "UniqueReference": "+2349082930030",
                "Amount": 500,
                "DateStarted": "2018-08-24T05:35:18.587Z",
                "DateStopped": null,
                "NextRun": "2018-08-24T06:35:18.587Z",
                "RecurringType": "Hourly"
            }
        ],
        "Status": "success",
        "Message": "successful",
        "Reference": null
    }
}
```
### `fly_recurring_cancel` 

The `fly_recurring_cancel` service makes it possible to cancel recurring Airtime and DSTV bill services. Here's a sample request to cancel a recurring payment with `Id` 383.

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'post',
     'service' => 'fly_recurring_cancel',
     'service_version' => 'v1',
     'service_channel' => 'rave',
     'service_payload' => array(
         'CustomerMobile' => '23481056829830',
         'RecurringPayment' => 383 //Id of the recurring payment to be cancelled.
     ),
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```

### `fly_history`
Flutterwave makes it possible for you to visualize all your purchased bill services including the commissions you've earned via the `fly_history` service. Below is a sample request:

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'post',
     'service' => 'fly_history',
     'service_version' => 'v1',
     'service_channel' => 'rave',
     'service_payload' => array(
         'FromDate' => '2018-08-01',
         'ToDate' => '2018-08-28',
         'PageSize' => 20,
         'PageIndex' => 0,
         'Reference' => '+233494850059'
     ),
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```

### Sample Response
This is a sample response for the `fly_history` service when your request is successful:

```JSON
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
            }
        ],
        "Total": 2,
        "Status": "success",
        "Message": "Successful",
        "Reference": null
    }
}
```

### `fly_requery`

The `fly_requery` service allows you to get the status of a particular bill purchase.

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'get',
     'service' => 'fly_requery_9300049404444', // Prefix "fly_requery_" plus the transaction reference of the bill your want to check its status.
     'service_version' => 'v1',
     'service_channel' => 'rave',
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```

### Sample Response
This is a sample `fly_requery` service response for a successful Mpesa transfer through Flutterwave:

```JSON
{
  "event.type": "Transfer",
  "transfer": {
    "id": 3455,
    "account_number": "233509382427",
    "bank_code": "MTN",
    "fullname": "EKENE EZE",
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

### `bill_categories`

If you want to see a list of all the individual bill categories that is available on Flutterwave, you can do so using the `bill_categories` service in your request. Here's a sample request:

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'get',
     'service' => 'bills_categories',
     'service_version' => 'v1',
     'service_channel' => 'rave',
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```

### Sample Response
This is a sample response for a successful `bill_categories` request on Flutterwave'bill payments API:

```JSON
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
            
            { // More bill categories }

        ]
    }
}
```

### `bills_validate`

Flutterwave let's you validate serial or registration numbers pertaining to a particular service using the `bills_validate` service. A good example would be trying to validate a DSTV smart card number first before giving value. Here's a sample request to do so

```php
<?php

$url = 'https://api.ravepay.co/v2/services/confluence';
 
$ch = curl_init($url);

 $jsonData = array(
     'secret_key' => 'YOUR_SECRET_KEY',
     'service_method' => 'get',
     'service' => 'bills_validate_CB140_BIL119_1025401152',
     'service_version' => 'v1',
     'service_channel' => 'rave',
 );

$jsonDataEncoded = json_encode($jsonData);  

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded); 

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
 
echo $result;
```
