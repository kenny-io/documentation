## php bulk transfers

## Create a Subaccount Sample implementation

The following implementation shows how to create a subaccount on the rave dashboard
```php
require("Flutterwave-Rave-PHP-SDK/lib/Subaccount.php");
use Flutterwave\Subaccount;

$array = array(
        "account_bank"=>"044",
        "account_number"=> "0690000030",
        "business_name"=> "JK Services",
        "business_email"=> "jke@services.com",
        "business_contact"=> "Seun Alade",
        "business_contact_mobile"=> "090890382",
        "business_mobile"=> "09087930450",
        "meta" => ["metaname"=> "MarketplaceID", "metavalue"=>"ggs-920900"],
        "seckey"=> "****YOUR**SECRET**KEY****"
);

$subaccount = new Subaccount();
$result = $subaccount->subaccount($array);
print_r($result);