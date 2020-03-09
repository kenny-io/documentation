## Overview

Flutterwave's subscription feature allows you to redefine your recurring payments collection model. A subscription payment allows your customers to subscribe to a recurring payment that will be automatically charged from their cards every billing cycle (yearly, monthly, daily or even hourly). After the first payment is made, Flutterwave will handle the recurrent payments for you until your specified duration elapses or you cancel the subscription

There are different ways to set up subscriptions on Flutterwave;

- Dashboard - Subscription payment link
- API's

**Flow**

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576441730/image_preview_16_b3qfto.png"/>

### Possible use cases

- Building a media streaming app with different subscription timeframes like Spotify or Netflix
- Building a Saas (Software as a service), Paas (Platform as a service) or Iaas (Infrastructure as a service) platform where users can be charged on a recurring basis like Azure and Heroku
- Organisation management system: Organisations can handle recurring payments such as tithes, levies, bills and taxes.

### Subscription features

- List all subscriptions
- Fetch a subscription
- Cancel a subscription
- Activate a subscription

#### List all subscriptions

This features allows you to retrieve a list of all the subscriptions available on your account. Here's a sample implementation:

Node

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);

rave.Subscription.list()
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

PHP

```php
require("Flutterwave-Rave-PHP-SDK/lib/Subscription.php");
use Flutterwave\Subscription;

$subscription = new Subscription();

$resultGet = $subscription->getAllSubscription();

print_r($result);
```

Python

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", usingEnv = False)

res = rave.Subscriptions.allSubscriptions()

print(res)
```

#### Sample response

Here's a sample response for the request above:

```json
{
  "error": False,
  "returnedData": {
    "status": "success",
    "message": "SUBSCRIPTIONS-FETCHED",
    "data": {
      "page_info": {
        "total": 0,
        "current_page": 0,
        "total_pages": 0
      },
      "plansubscriptions": []
    }
  }
}
```

### Fetch a subscription

This feature allows you to fetch a single subscription from the available subscriptions on your account when you pass in the subscriptions ID. Here's a sample implementation:

Node

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);
// subscription_id = the `id` of the subscription you want to fetch
rave.Subscription.fetch(subscription_id)
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

PHP

```php
require("Flutterwave-Rave-PHP-SDK/lib/Subscription.php");
use Flutterwave\Subscription;

$subscription_id = subscription_id // The `id` of the subscription you want to fetch

$subscription = new Subscription();

$resultFetch = $subscription->fetchASubscription($subscription_id);

print_r($result);
```

Python

```python
from rave_python

import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)

// subscription_id = the `id` of the subscription you want to fetch
res = rave.Subscriptions.fetchSubscription(subscription_id)

print(res)
```

### Sample response

Here's what a response from this call would look like:

```json
{
  "status": "success",
  "message": "SUBSCRIPTIONS-FETCHED",
  "data": {
    "page_info": {
      "total": 1,
      "current_page": 1,
      "total_pages": 1
    },
    "plansubscriptions": [
      {
        "id": 6107,
        "amount": 5000,
        "customer": {
          "id": 163856203,
          "customer_email": "me@example.com"
        },
        "plan": 11401,
        "status": "active",
        "date_created": "2020-01-29T14:11:12.000Z"
      }
    ]
  }
}
```

### Cancel a subscription

This feature provides you the ability to terminate and active subscription on your account. To cancel a subscription, you will be required to pass in the `subscription_id` which is the `id` of the subscription you wish to cancel. Here's a sample implementation:

Node

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);

// subscription_id = the `id` of the subscription you want to fetch
rave.Subscription.cancel(subscription_id)
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

PHP

```php
require("Flutterwave-Rave-PHP-SDK/lib/Subscription.php");
use Flutterwave\Subscription;

$subscription_id = subscription_id // The `id` of the subscription you want to cancel

$subscription = new Subscription();

$resultActivate = $subscription->cancelSubscription($subscription_id);

print_r($result);
```

Python

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)

// subscription_id = the `id` of the subscription you want to fetch
res = rave.Subscriptions.cancelSubscription(subscription_id)

print(res)

```

### Sample response

```json
{
  "status": "success",
  "message": "SUBSCRIPTION-CANCELLED",
  "data": {
    "id": 6107,
    "amount": 5000,
    "customer": {
      "id": 163856203,
      "customer_email": "me@example.com"
    },
    "plan": 11401,
    "status": "cancelled",
    "date_created": "2020-01-29T14:11:12.000Z"
  }
}
```

### Activate a subscription

This feature provides you the ability to activate and active subscription on your account. To cancel a subscription, you will be required to pass in the `subscription_id` which is the `id` of the subscription you wish to activate. Here's a sample implementation:

Node

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);

// subscription_id = the `id` of the subscription you want to fetch
rave.Subscription.activate(subscription_id)
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

PHP

```php
require("Flutterwave-Rave-PHP-SDK/lib/Subscription.php");
use Flutterwave\Subscription;

$subscription_id = subscription_id // The `id` of the subscription you want to cancel

$subscription = new Subscription();

$resultActivate = $subscription->activateSubscription($subscription_id);

print_r($result);

```

Python

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", usingEnv = False)
// subscription_id = the `id` of the subscription you want to fetch
res = rave.Subscriptions.activateSubscription(subscription_id)

print(res)

```

### Possible error case

The calls could potentially raise a `PlanStatusError` if there was a problem processing your transaction. The `PlanStatusError` contains some valuable information about your transaction. You can handle this as such:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", usingEnv = False)
try:
res = rave.Subscriptions.fetchSubscription()
print(res)
except RaveExceptions.PlanStatusError as e:
  print(e.err["errMsg"])
print(e.err["flwRef"])

```
