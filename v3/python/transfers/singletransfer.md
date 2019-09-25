
## python single transfer

## BVN Verification Sample implementation

The following implementation shows how to verify a Bank Verification Number
```php
require("Flutterwave-Rave-PHP-SDK/lib/Bvn.php");
use Flutterwave\Bvn;
$bvn = new Bvn();
$result = $bvn->verifyBVN("123456789");
print_r($result);
```

## Create a Payment Plan Sample implementation

The following implementation shows how to create a payment plan on the rave dashboard
```php
require("Flutterwave-Rave-PHP-SDK/lib/PaymentPlan.php");
use Flutterwave\PaymentPlan;

$array = array(
    "amount" => "2000",
     "name"=> "The Premium Plan",
     "interval"=> "monthly",
     "duration"=> "12",
     "seckey" => "****YOUR**SECRET**KEY****"
);

$plan = new PaymentPlan();
$result = $plan->createPlan($array);
print_r($result);

```
## Create Transfer Recipient Sample implementation

The following implementation shows how to create a transfer recipient on the rave dashboard
```php
require("Flutterwave-Rave-PHP-SDK/lib/Recipient.php");
use Flutterwave\Recipient;

$array = array(
    "account_number"=>"0690000030",
	"account_bank"=>"044",
	"seckey"=>"****YOUR**SECRET**KEY****"
);

$recipient = new Recipient();
$result = $recipient->recipient($array);
print_r($result);
```

## Create Refund Sample implementation

The following implementation shows how to initiate a refund
```php
require("Flutterwave-Rave-PHP-SDK/lib/Refund.php");
use Flutterwave\Refund;

$array = array(
    "ref"=>"txRef",//pass a transaction reference to initiate refund
	"seckey"=>"****YOUR**SECRET**KEY****"
);

$refund = new Refund();
$result = $refund->refund($array);
print_r($result);
```

## Subscriptions Sample implementation

The following implementation shows how to activata a subscription, fetch a subscription, get all subscription
```php
require("Flutterwave-Rave-PHP-SDK/lib/Subscription.php");
use Flutterwave\Subscription;

$email = "eze@gmail.com";//email address of subscriber
$id = 1112 //Id of subscription plan

$subscription = new Subscription();

$resultFetch = $subscription->fetchASubscription($email);//fetches a subscription
$resultGet = $subscription->getAllSubscription();//gets all existing subscription
$resultActivate = $subscription->activateSubscription($id);// activates a subscription plan

//returns the result 
print_r($result);
```
You can also find the class documentation in the docs folder. There you will find documentation for the `Rave` class and the `EventHandlerInterface`.

Enjoy... :v:

## ToDo

- Write Unit Test
- Support Tokenized payment