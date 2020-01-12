## Quickstart

### Subaccounts

**Functions included:**

* ```.create```

* ```.list```

* ```.fetch```

### ```.create()```
This function helps you to create a subaccount on Rave.

```javascript
    var Ravepay = require('ravepay');
    
    var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);
    
    rave.Subaccount.create({
        "account_bank": "044",
        "account_number": "0690000035",
        "business_name": "JK Services",
        "business_email": "jk@services.com",
        "business_contact": "Seun Alade",
        "business_contact_mobile": "090890382",
        "business_mobile": "09087930450",
        "meta": [{
            "metaname": "MarketplaceID",
            "metavalue": "ggs-920900"
        }]
    }).then(resp => {
        console.log(resp.body);
    
    }).catch(err => {
        console.log(err);
    
    })
```
Below is a sample response:

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
            "meta": [{
                "metaname": "MarketplaceID",
                "metavalue": "ggs-920800"
            }],
            "subaccount_id": "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
            "bank_name": "ACCESS BANK NIGERIA"
        }
    }
```

A sample error contains:

```javascript
    {
        "status": "error",
        "message": "Sorry we couldn't verify your account number kindly pass a valid account number.",
        "data": null
    }
```

### ```.list()```

This function allows you to list all or specific subaccounts.

```javascript
  rave.Subaccount.list()
      .then(resp => {
          console.log(resp.body);

      }).catch(err => {
          console.log(err);

      })
```

### ```.fetch()```

This function allows you fetch a single subaccount using the subaccount ID:

```javascript
  rave.Subaccount.fetch(subaccount_id)
      .then(resp => {
          console.log(resp.body);

      }).catch(err => {
          console.log(err);

      })
```
