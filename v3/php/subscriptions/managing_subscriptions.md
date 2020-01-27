## Managing subscriptions

You can handle and manage your subscriptions with Rave's API. Actions that you can perform include listing, fetching and cancelling a subscription. 

**Listing a subscription**

You can make a list of every subscription in your account by using Rave's  `.allSubscriptions()`  function. A sample call goes like this:

```python

    from rave_python
    import Rave, Misc, RaveExceptions
    
    rave = Rave("<YOUR PUBLIC KEY>", "<YOUR SECRET KEY>", usingEnv = False)
    res = rave.Subscriptions.allSubscriptions()
    print(res)

```

**Fetching a subscription**

To fetch a particular subscription, you can use Rave's  `.fetchSubscription()`  function. You may or may not pass in a `subscription_id` or `subscription_email` as arguments to this function. If you do not pass in a  `subscription_id` or  `subscription_email`,  all subscriptions will be returned. 

A sample `.fetchSubscription()`  call is:

```python

    from rave_python
    import Rave, Misc, RaveExceptions
    
    rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", usingEnv = False)
    res = rave.Subscriptions.fetchSubscription(900)
    print(res)

```

**Cancelling a subscription**

You can use Rave's  `cancelSubscription()`  function to cancel an existing subscription. The function takes  `subscription_id` , which is the  `id`  of the subscription you wish to cancel as an argument. A sample `.cancelSubscription` call is:

```python

from rave_python
import Rave, Misc, RaveExceptions
rave = Rave("<YOUR PUBLIC KEY>", "<YOUR SECRET KEY>", usingEnv = False)
try:
res = rave.Subscriptions.cancelSubscription(900)
print(res)
```



