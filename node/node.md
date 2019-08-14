
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
