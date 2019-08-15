## Overview

# Ravepay Nodejs Library v1.0.0

## Ravepay Services exposed by the library

- Card Charge
- Tokenized Charge
- Fees
- Banks
- Account Charge 
- Transfers
- Subaccount
- Subscription
- Payment Plan
- Card PreAuthorization

For more information on the services listed above, visit the [Ravepay website](http://rave.flutterwave.com/)

## How to use

`npm install ravepay`


 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.
 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.

 
```
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

```
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'https://ravesandboxapi.flutterwave.com'

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

```