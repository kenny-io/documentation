# Overview

With Flutterwave, merchants can resell payment services such as airtime in countries like Nigeria, Ghana and USA. They can also resell cable television (DStv) in Nigeria and Ghana. For every successful airtime sale, a merchant makes a 3% commission from the transaction. They also make a commission of NGN 30 for every other successful bill transaction. To use our bill payment APIs you would need to follow the steps outlined below:

1. Create a [free Flutterwave account](https://dashboard.flutterwave.com/signup) to get access to our API's. You can switch your account between `test` and `live` modes (for use in development and production) respectively.
2. Navigate to the **Transfers** page on your dashboard and top up your balance using the Top up balance option.
3. Ensure your available balance is funded before making use of the APIs.

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

This is a sample request structure for calling the bills payment API for the `fly_buy` service. The request will defer depending on the service of choice.

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
         'Amount' => 500,
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

The request above will buy airtime worth of NGN500 for the mobile number specified in the `customerId` parameter.

## Parameters

These are the parameter definitions for the above request

| Parameter         | Required | Description                                                                                                                                                         |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `secret_key`      | True     | This is your merchant secret key. See our [API keys section](https://developer.flutterwave.com/reference-link/api-keys-1) to learn how to retreive your secret_key. |
| `service`         | True     | This is the bill payment service. See the table below for our available services and their descriptions. e.g: `fly_buy`, `fly_recurring` etc.                       |
| `service_method`  | True     | This is the HTTP Method for the required service.                                                                                                                   |
| `service_version` | True     | This is the API version. The current value is `v1`. When a new version of this API is available, you would be able to update to your preferred version.             |
| `service_channel` | True     | This is the channel for the service, always use `rave`as the value.                                                                                                 |
| `service_payload` | True     | This is the request payload to be sent for the service.                                                                                                             |

## Response Structure

This is a sample response you can expect for the sample request initiated above when the request is successful.

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

## Bill Payment Services

These are the available services on Flutterwave with their respective HTTP methods and descriptions.

| Service                | Method | Description                                                                                                                                                    |
| :--------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fly_buy`              | POST   | This allows you to buy airtime or DSTV bill services. When you pass this as your `service` in the request, you would need to pass a `service_payload` as well. |
| `fly_buy_bulk`         | POST   | This allows you to buy bulk airtime and DSTV bill services.                                                                                                    |
| `fly_recurring`        | GET    | This allows you to retrieve active recurring airtime and DSTV bill services.                                                                                   |
| `fly_recurring_cancel` | POST   | This allows you to cancel recurring airtime and DSTV bill services.                                                                                            |
| `fly_history`          | POST   | This allows you to retrieve a history of all purchased bill services including commission earned.                                                              |
| `fly_requery`          | POST   | This allows you get the status of a bill purchase.                                                                                                             |
| `bill_categories`      | POST   | This allows you to get a list of individual bill categories.                                                                                                   |
| `bills_validate`       | POST   | This allows you to validate services like DSTV Smartcard number                                                                                                |
