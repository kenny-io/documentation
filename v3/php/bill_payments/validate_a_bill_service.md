# Validate a bill service

You can check the authenticity of a bill service by validating its details such as the serial or registration number attached to the bill. This can be done by making a `POST` request to Flutterwave's confluence API endpoint and specifying the value for the `service` parameter to be the serial number you want to validate prefixed by `bills_validate_` in the request object. 

A good use case would be trying to validate a DSTV smart card number first before giving it value. Below is a sample code that depicts how to do this:

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

## Validate a bill service parameters

| Parameter 	| Required 	| Description 	|
|-------------------	|-----------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `secret_key` 	| True 	| This is your merchant secret key, please see our section on [API Keys](https://developer.flutterwave.com/reference#api-keys-1) to learn how to retrieve your secret key. 
| `service` 	| True 	| This is the bill payment services available e.g. `fly_buy`.	|
| `service_version` 	| True 	| This is the version for the APIs. Please set to `v1` when a new version is available you would be able to put your required version. 	|
| `service_method` 	| True 	| This is the HTTP Method for the required service. 	|
| `service_channel` 	| True `Expected value: rave` 	| This is the channel for the service, always use `rave` as the value. 	|