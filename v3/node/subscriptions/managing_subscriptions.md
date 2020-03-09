# Managing subscriptions

You can manage your subscriptions directly with our APIs. Actions you can perform includes:

- Listing
- Fetching
- Cancelling and Activating subscriptions.

## List a subscription

You can list all the available subscriptions on your account by using our `.allSubscriptions()` function. This is a sample implementation:

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
res = rave.Subscriptions.allSubscriptions()
print(res)
```

## Fetch a subscription

To fetch a particular subscription, you can use our `.fetchSubscription()` function. You may or may not pass in a `subscription_id` or `subscription_email` as arguments to this function. If you do not pass in a `subscription_id` or `subscription_email`, all the available subscriptions on your account will be returned.

A sample implementation of the `.fetchSubscription()` call is:

```python
from rave_python
import Rave, Misc, RaveExceptions

rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
res = rave.Subscriptions.fetchSubscription(900)
print(res)

```

## Cancel a subscription

You can use our `cancelSubscription()` function to cancel an existing subscription. The function takes in an argument -- `subscription_id`. This is the `id` of the subscription you wish to cancel.

Here's a sample implementation of the `.cancelSubscription` function:

```python
from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
try:
res = rave.Subscriptions.cancelSubscription(900)
print(res)
```
