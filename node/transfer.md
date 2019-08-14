


### Tranfers
When a transfer is initiated, it comes with a status ```NEW``` this means the transfer has been queued for processing, and you would need to use the ```reference``` you passed to call the Fetch a Transfer endpoint to retrieve the updated status of the transfer.

**Available countries you can transfer to**

***Country	                Currency***

    NG (Nigeria)            NGN

    GH (Ghana)              GHS

    KE (Kenya)              KES

    UG (Ugandan)            UGX

    US (United States)      USD

    OT (Other countries)    GBP, EUR, AUD etc.

**Functions included:**

* ```.initiate```

* ```.bulk```

* ```.fetch```

* ```.list```

* ```.getApplicableFee```

* ```.getBalance```

<br>

### ```.initiate()```
This is called to start a transfer. The payload should contain the following card information:

* ```'account_bank', 'required:true, eg:044'```, 

* ```'account_number 'required:true,validators:isNumeric, eg:06900021'```, 

* ```'amount', 'required:true, eg:10'```, 

* ```'secKey', 'required:true,eg:FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X'```, 

* ```'narration', 'required:false,eg:New transfer'```, 

* ```'currency', 'required:required,eg:NGN'```, 

* ```'reference', 'required:required,eg:mk-902837-jk'```, 


```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Transfer.initiate(
    {
        "account_bank": "044",
        "account_number": "0690000044",
        "amount": 500,
        "narration": "New transfer",
        "currency": "NGN",
        "reference": "mk-902837-jk"
    }
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
#### Returns

A sample response is:

```javascript
{
  "status": "success",
  "message": "TRANSFER-CREATED",
  "data": {
    "id": 542,
    "account_number": "0690000044",
    "bank_code": "044",
    "fullname": "Mercedes Daniel",
    "date_created": "2018-06-06T10:56:12.000Z",
    "currency": "NGN",
    "amount": 500,
    "fee": 45,
    "status": "NEW",
    "reference": "rave-transfer-1528159847480966",
    "narration": "New transfer",
    "complete_message": "",
    "requires_approval": 0,
    "is_approved": 1,
    "bank_name": "ACCESS BANK NIGERIA"
  }
}
```

### ```.bulk()```
This allows you send bulk transfers.

The payload should contain the following parameters

* ```'bulk_data', 'required:true, eg:{ "Bank":"044","Account Number":"0690000032"},{"Bank":"044","Account Number":"0690000032"}'```,

```javascript
rave.Transfer.bulk(
    {
  "title":"May Staff Salary",
  "bulk_data":[
  	{
        "Bank":"044",
        "Account Number": "0690000032",
        "Amount":500,
        "Currency":"NGN",
        "Narration":"Bulk transfer 1",
        "reference": "mk-82973029"
    },
    {
        "Bank":"044",
        "Account Number": "0690000034",
        "Amount":500,
        "Currency":"NGN",
        "Narration":"Bulk transfer 2",
        "reference": "mk-283874750"
    }
  ]
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
#### Returns

A sample response is:
```javascript
{
    "status": "success",
    "message": "BULK-TRANSFER-CREATED",
    "data": {
        "id": 21,
        "uuid": 21,
        "date_created": "2018-05-17T08:39:54.000Z",
        "approver": "N/A"
    }
}
```

### ```.fetch()```
This allows you retrieve a single transfer.
It uses a GET method.

```javascript
rave.Transfer.fetch('<id="transfer ID" e.g mk-902837-jk>') 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```
#### Returns

A sample response is:

```javascript
{
    "status": "success",
    "message": "QUERIED-TRANSFERS",
    "data": {
        "page_info": {
            "total": 1,
            "current_page": 1,
            "total_pages": 1
        },
        "payouts": [
            {
                "id": 247,
                "account_number": "0690000032",
                "bank_code": "044",
                "fullname": "Pastor Bright",
                "date_created": "2018-05-17T08:39:55.000Z",
                "currency": "NGN",
                "amount": 500,
                "fee": 45,
                "status": "FAILED",
                "narration": "Bulk transfer 1",
                "approver": null,
                "complete_message": "NO AUTH CONTEXT FOUND",
                "requires_approval": 0,
                "is_approved": 1,
                "bank_name": "ACCESS BANK NIGERIA"
            }
        ]
    }
}
```

### ```.list()```
This allows you fetch all transfers using a GET method

```javascript
rave.Transfer.list() 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```

### ```.getApplicableFee()```
This retrieves the fee for a transfer

```javascript
rave.Transfer.getApplicableFee()
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```

### ```.getBalance()```
This helps you get your balance for transfers.

* ```'currency', 'required:required,eg:NGN'```,

#### Returns

A sample response is:
```javascript
{
    "status": "success",
    "message": "WALLET-BALANCE",
    "data": {
        "Id": 3570,
        "ShortName": "NGN",
        "WalletNumber": "5070000106866",
        "AvailableBalance": 177337.24,
        "LedgerBalance": 177337.24
    }
}
```
