# Overview

Flutterwave's subscription tool allows users to redefine their recurring business model. It lets you handle all subscriptions available on your account via the `subscriptions` endpoint. With handling subscriptions, the following functionalities are available:

- List all subscriptions
- Fetch a subscription
- Cancel a subscription
- Activate a subscription

### This is how Subscriptions work

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576441730/image_preview_16_b3qfto.png"/>

## Use Cases

- Building a media streaming app with different subscription timeframes like Spotify or Netflix
- Building a Saas (Software as a service), Paas (Platform as a service) or Iaas (Infrastructure as a service) platform where users can be charged on a recurring basis like Azure and Heroku
- Organisation management system: Organisations can handle recurring payments such as tithes, levies, bills and taxes.

## List all subscriptions

This allows you to retrieve all available subscriptions on your account using the `.allSubscriptions()` function.

A sample `allSubcriptions()` call is:

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
res = rave.Subscriptions.allSubscriptions()
print(res)
```

### Sample response

If the request above is successful, you can expect he following response:

```python
{
  'error': False,
  'returnedData': {
    'status': 'success',
    'message': 'SUBSCRIPTIONS-FETCHED',
    'data': {
      'page_info': {
        'total': 0,
        'current_page': 0,
        'total_pages': 0
      },
      'plansubscriptions': []
    }
  }
}
```

This call could potentially raise a `PlanStatusError` if there was a problem processing your transaction. The `PlanStatusError` would contain some more information about your transaction.

You can handle the error like this:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
try:
res = rave.Subscriptions.allSubscriptions()
print(res)
except RaveExceptions.PlanStatusError as e:
  print(e.err["errMsg"])
print(e.err["flwRef"])
```

## Fetch a subscription

This allows you fetch a subscription using the `.fetchSubscription()` function. You may or may not pass in a `subscription_id` or `subscription_email` as arguments to this function. If you do not pass in a `subscription_id` or `subscription_email`, all subscriptions will be returned.

A sample `.fetchSubscription()` call is:

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
res = rave.Subscriptions.fetchSubscription(900)
print(res)
```

### Sample response

```python
{
  'error': False,
  'returnedData': {
    'status': 'success',
    'message': 'SUBSCRIPTIONS-FETCHED',
    'data': {
      'page_info': {
        'total': 0,
        'current_page': 0,
        'total_pages': 0
      },
      'plansubscriptions': []
    }
  }
}
```

This call could potentially raise a `PlanStatusError` if there was a problem processing your transaction. The `PlanStatusError` would contain some more information about your transaction.

You can handle the error like this:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
try:
res = rave.Subscriptions.fetchSubscription()
print(res)
except RaveExceptions.PlanStatusError as e:
  print(e.err["errMsg"])
print(e.err["flwRef"])
```

## Cancel a subscription

This call could potentially raise a `PlanStatusError` if there was a problem processing your transaction. The `PlanStatusError` would contain some more information about your transaction.

You can handle the error like this:

A sample `.cancelSubscription` call is:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
res = rave.Subscriptions.cancelSubscription(900)
print(res)
```

This call could potentially raise a `PlanStatusError` if there was a problem processing your transaction. The `PlanStatusError` would contain some more information about your transaction.

You can handle the error like this:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
try:
res = rave.Subscriptions.cancelSubscription(900)
print(res)
except RaveExceptions.PlanStatusError as e:
  print(e.err["errMsg"])
print(e.err["flwRef"])
```

## Activate a subscription

This lets you activate a subscription via the `.activateSubscription()` function. The function takes `subscription_id`, which is the `id` of the subscription you wish to activate as an argument. your subscription's `id` can be retrieved from your Rave dashboard.

A sample `activateSubscription()` call is:

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
res = rave.Subscriptions.activateSubscription(900)
print(res)
```

This call could potentially raise a `PlanStatusError` if there was a problem processing your transaction. The `PlanStatusError` would contain some more information about your transaction.

You can handle the error like this:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
try:
res = rave.Subscriptions.activateSubscription(900)
print(res)
except RaveExceptions.PlanStatusError as e:
  print(e.err["errMsg"])
print(e.err["flwRef"])
```

Below is the complete subscription flow for handling subscriptions:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_PRIVATE_KEY", usingEnv = False)
try:

res = rave.Subscriptions.allSubscriptions()
res = rave.Subscriptions.fetchSubscription(900)
res = rave.Subscriptions.cancelSubscription(900)
print(res)

except RaveExceptions.PlanStatusError as e:
  print(e.err)

except RaveExceptions.ServerError as e:
  print(e.err)
```
