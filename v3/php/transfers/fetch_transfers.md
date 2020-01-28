## Fetch transfers
You can query our transfer API to see a list of all your transfers and their status using your API secret key.

##Change snippet to PHP

```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.ravepay.co/v2/gpx/transfers',
  qs: { 
  	     "seckey": "YOUR_SECRET_KEY",
        "page": "1",
        "status": "successful"
  },
  headers:
   { 'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
``` 

The request above will return the first page of the list of all your successful transfers. 

#### Request parameters
The table below defines the parameters and descriptions of the request object we constructed above to fetch all transfers. 

| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `seckey` 	| True 	| This is your merchant secret key, see how to get your API keys from your dashboard here 	|
| `page` 	| False 	| This allows you fetch from a specific page e.g. set page to 1 fetches the first page. 	|
| `status` 	| False 	| This allows you fetch only transfers with a specific status e.g. fetch all successful transactions. Possible values are `failed`, `successful`. | 

####Sample response
Here's a sample response:

```json
{
    "status": "success",
    "message": "QUERIED-TRANSFERS",
    "data": {
        "page_info": {
            "total": 3,
            "current_page": 1,
            "total_pages": 1
        },
        "transfers": [
            {
                "id": 1094570,
                "account_number": "00*****310",
                "bank_code": "063",
                "fullname": "EKENE EZE",
                "date_created": "2020-01-23T14:27:48.000Z",
                "currency": "NGN",
                "debit_currency": null,
                "amount": 100,
                "fee": 45,
                "status": "PENDING",
                "reference": "527d8b1f9abdb6a4",
                "meta": null,
                "narration": "New transfer",
                "approver": null,
                "complete_message": "Transaction is currently being processed",
                "requires_approval": 0,
                "is_approved": 1,
                "bank_name": "ACCESS BANK PLC (DIAMOND)"
            },
            {
                "id": 1094551,
                "account_number": "00*****310",
                "bank_code": "063",
                "fullname": "EKENE EZE",
                "date_created": "2020-01-23T14:17:43.000Z",
                "currency": "NGN",
                "debit_currency": null,
                "amount": 200,
                "fee": 45,
                "status": "SUCCESSFUL",
                "reference": "001122",
                "meta": null,
                "narration": "New transfer",
                "approver": null,
                "complete_message": "Transaction was successful",
                "requires_approval": 0,
                "is_approved": 1,
                "bank_name": "ACCESS BANK PLC (DIAMOND)"
            },
            {
                "id": 1093587,
                "account_number": "01*****458",
                "bank_code": "058",
                "fullname": " EZE EKENE",
                "date_created": "2020-01-23T10:41:42.000Z",
                "currency": "NGN",
                "debit_currency": "NGN",
                "amount": 100,
                "fee": 45,
                "status": "SUCCESSFUL",
                "reference": "TRF-965116796611",
                "meta": null,
                "narration": "Debt repayment ",
                "approver": null,
                "complete_message": "Transaction was successful",
                "requires_approval": 0,
                "is_approved": 1,
                "bank_name": "GTBANK PLC"
            }
        ]
    }
}
```



