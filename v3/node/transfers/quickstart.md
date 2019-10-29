# Transfer Quickstart

Learn how to payout to bank accounts and mobile money wallets across africa.
***

Rave allows you payout to bank accounts and mobile money wallets across Africa, North America (US). In just five steps you can perform a transfer to your customer. 

1. [Create a transfer recipient](#step-1-create-a-transfer-recipient)
2. [Get the transfer fee](#step-2-get-the-transfer-fee)
3. [Initiate the transfer](#step-3-initiate-the-transfer)
4. [Get your transfer callback](#step-4-get-your-transfer-callback)
5. [Verify the transfer status](#step-5-verify-the-transfer-status)





## Step 1: Create a transfer recipient






## Step 2: Get the transfer fee





## Step 3: Initiate the transfer



## Step 4: Get your transfer callback






## Step 5: Verify the transfer status



### Subscriptions

**Functions included:**

* ```.list```

* ```.fetch```

* ```.cancel```

* ```.activate```

### ```.list()```
This function allows you to list all subscriptions on a merchant account.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Subscription.list() 
    .then(resp => {
        console.log(resp.body);

    }).catch(err => {
        console.log(err);
        
    })
```

### ```.fetch()```
This function allows you to get a particular subscription on a merchant account.

```javascript
rave.Subscription.fetch(subscription_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```

### ```.cancel()```
This function allows you to cancel an exisiting subscription

```javascript

rave.Subscription.cancel(
    {
    "id": 912
    }
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```

### ```.activate()```
This page describes how to activate a subscription

```javascript

rave.Subscription.activate(
    {
	"id": 912,
	
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
