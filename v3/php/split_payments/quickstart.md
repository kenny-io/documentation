
## php quickstart 

# Support Direct Charges

Save your PUBLIC_KEY, SECRET_KEY, ENV in the .env file
```env

PUBLIC_KEY = "****YOUR**PUBLIC**KEY****"
SECRET_KEY = "****YOUR**SECRET**KEY****"
ENV = "staging or live"

```

## Account Charge Sample implementation

The following implementation shows how to initiate a direct bank charge
```php
require("Flutterwave-Rave-PHP-SDK/lib/AccountPayment.php");
use Flutterwave\Account;

    $array = array(
        "PBFPubKey" =>"****YOUR**PUBLIC**KEY****",
        "accountbank"=> "044",// get the bank code from the bank list endpoint.
        "accountnumber" => "0690000031",
        "currency" => "NGN",
        "payment_type" => "account",
        "country" => "NG",
        "amount" => "10",
        "email" => "eze@gmail.com",
       // passcode => "09101989",//customer Date of birth this is required for Zenith bank account payment.
        "bvn" => "12345678901",
        "phonenumber" => "0902620185",
        "firstname" => "temi",
        "lastname" => "desola",
        "IP" => "355426087298442",
        "txRef" => "MC-".time(), // merchant unique reference
        "device_fingerprint" => "69e6b7f0b72037aa8428b70fbe03986c"

    );
$account = new Account();
$result = $account->accountCharge($array);
print_r($result);
```
## Card Charge Sample implementation

The following implementation shows how to initiate a direct card charge
```php
require("Flutterwave-Rave-PHP-SDK/lib/CardPayment.php");
use Flutterwave\Card;
    $array = array(
        "PBFPubKey" => "****YOUR**PUBLIC**KEY****",
        "cardno" =>"5438898014560229",
        "cvv" => "890",
        "expirymonth"=> "09",
        "expiryyear"=> "19",
        "currency"=> "NGN",
        "country"=> "NG",
        "amount"=> "2000",
        "pin"=>"3310",
        //"payment_plan"=> "980", //use this parameter only when the payment is a subscription, specify the payment plan id
        "email"=> "eze@gmail.com",
        "phonenumber"=> "0902620185",
        "firstname"=> "temi",
        "lastname"=> "desola",
        "IP"=> "355426087298442",
        "txRef"=>"MC-".time(),// your unique merchant reference
        "meta"=>["metaname"=> "flightID", "metavalue"=>"123949494DC"],
        "redirect_url"=>"https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint"=> "69e6b7f0b72037aa8428b70fbe03986c"
    );
$card = new Card();
$result = $card->cardCharge($array);
print_r($result);
```

## Mobile Money Payments

The following implementation shows how to initiate a mobile money payment
```php
require("Flutterwave-Rave-PHP-SDK/lib/MobileMoney.php");
use Flutterwave\MobileMoney;

$array = array(
    "PBFPubKey" =>"****YOUR**PUBLIC**KEY****",
    "currency"=> "GHS",
    "payment_type" => "mobilemoneygh",
    "country" => "GH",
    "amount" => "10",
    "email" => "eze@gmail.com",
    "phonenumber"=> "054709929220",
    "network"=> "MTN",
    "firstname"=> "eze",
    "lastname"=> "emmanuel",
    "voucher"=> "128373", // only needed for Vodafone users.
    "IP"=> "355426087298442",
    "txRef"=> "MC-123456789",
    "orderRef"=> "MC_123456789",
    "is_mobile_money_gh"=> 1,
    "redirect_url"=> "https://rave-webhook.herokuapp.com/receivepayment",
    "device_fingerprint"=> "69e6b7f0b72037aa8428b70fbe03986c"

);
    $mobilemoney = new MobileMoney();
    $result = $mobilemoney->mobilemoney($array);
    $print_r($result);
```
## Create Vitual Cards

The following implementation shows how to create virtual cards on rave
```php
require("Flutterwave-Rave-PHP-SDK/lib/VirtualCards.php");
use Flutterwave\VirtualCard;

$array = array(
    "secret_key"=>"****YOUR**SECRET**KEY****",
	"currency"=> "NGN",
	"amount"=>"200",
	"billing_name"=> "Mohammed Lawal",
	"billing_address"=>"DREAM BOULEVARD",
	"billing_city"=> "ADYEN",
	"billing_state"=>"NEW LANGE",
	"billing_postal_code"=> "293094",
	"billing_country"=> "US"
);
    $virtualCard = new VirtualCard();
    $result = $virtualCard->create($array);
    print_r($result);
```
