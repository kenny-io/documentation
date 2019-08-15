## Bulk Transfers

### Subaccounts

This is used to create and manage subaccounts

**Functions included:**

* ```.create```

* ```.list```

* ```.fetch```

<br>

### ```.create()```
This function helps you to create a subaccount on rave.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Subaccount.create(
    {
	"account_bank": "044",
	"account_number": "0690000035",
	"business_name": "JK Services",
	"business_email": "jk@services.com",
	"business_contact": "Seun Alade",
	"business_contact_mobile": "090890382",
	"business_mobile": "09087930450",
	"meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
#### Returns
This call returns:

```javascript
{
    "status": "success",
    "message": "SUBACCOUNT-CREATED",
    "data": {
        "id": 10,
        "account_number": "0690000047",
        "account_bank": "044",
        "fullname": "Ben Fowler",
        "date_created": "2018-05-22T23:08:07.000Z",
        "meta": [
            {
                "metaname": "MarketplaceID",
                "metavalue": "ggs-920800"
            }
        ],
        "subaccount_id": "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
        "bank_name": "ACCESS BANK NIGERIA"
    }
}
```

A sample ```.err``` contains
```javascript
{
    "status": "error",
    "message": "Sorry we couldn't verify your account number kindly pass a valid account number.",
    "data": null
}
```

### ```.list()```
This allows you to list all or specific subaccounts.

```javascript
rave.Subaccount.list() 
    .then(resp => {
        console.log(resp.body);

    }).catch(err => {
        console.log(err);
        
    })
```

### ```.fetch()```
This allows you fetch a single subaccount using the subaccount ID

```javascript
rave.Subaccount.fetch(subaccount_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### Payment Plans
Rave helps you collect payments recurrently from your customers using a payment plan. Payment plans allow you create a subscription for your customers.

When you have created a payment plan you can subscribe a customer to it by simply passing the plan ID in your request to charge the customers card.


**Functions included:**

* ```.create```

* ```.list```

* ```.fetch```

* ```.cancel```

* ```.edit```


### ```.create()```
This function allows you to create payment plans  on rave.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Paymentplan.create(
    { 
        amount: '10',
        name: 'fosm',
        interval: 'daily',
        duration: 5,
    },
        json: true 
    }
    
    
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```

#### Returns
A sample response is seen below:

```javascript
{
  "status": "success",
  "message": "CREATED-PAYMENTPLAN",
  "data": {
    "id": 933,
    "name": "fosm",
    "amount": "10",
    "interval": "daily",
    "duration": 5,
    "status": "active",
    "currency": "NGN",
    "plan_token": "rpp_8b87056c262128afbe56",
    "date_created": "2018-10-15T16:35:10.000Z"
  }
}
```


### ```.list()```
This function allows you to list all the payment plans  on an account.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Paymentplan.list() 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### ```.fetch()```
This function allows you to fetch a single payment plan

```javascript
rave.Paymentplan.fetch(plan_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### ```.cancel()```
This function allows you to cancel an exisiting payment plan

```javascript

rave.Paymentplan.cancel(
    {
	"id": 912,
	
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### ```.edit()```
This function allows you to edit a payment plan

```javascript

rave.Paymentplan.edit(
    {
	"id": 912,
	
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```