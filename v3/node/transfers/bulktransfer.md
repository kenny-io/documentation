# Bulk Transfers

The Flutterwave dashboard allows you to complete bulk transfers by uploading all the accounts you want to transfer to in a `.csv` file. An interesting use case could be paying monthly salaries to your staff. You could upload the bank details of all your employees and initiate a bulk transfer to make payments to all of them at once. Just like in single transfers, you can also make a bulk transfer through your Flutterwave dashboard and also via our API's.

### Make bulk transfers on your Flutterwave dashboard

To make a bulk transfer from your dashboard, first you need to ensure that your available balance is funded. You can see how to fund your balance [here](https://support.flutterwave.com/en/articles/3632728-top-up-your-available-balance).

Then navigate to the **Transfers** section on your dashboard and click **+ New Transfer**

![New Transfer](https://res.cloudinary.com/kennyy/image/upload/v1579774158/new-transfer_jiti6i.png)

Choose the transfer recipient type:

![Transfer recipient type](https://res.cloudinary.com/kennyy/image/upload/v1579774532/transfer-type_lcf92h.png)

Select the type of transfer you want to make, bulk or single:

![Transfer type](https://res.cloudinary.com/kennyy/image/upload/v1580034634/bulk-transfer-type_iusyou.png)

Then you will be required to upload to upload a `.csv` file containing the account details you want to transfer to. Here's a sample CSV file you can prepare to contain your transfer recipients details:

![Sample CSV file](https://res.cloudinary.com/kennyy/image/upload/v1580035574/make_bulk_transfers_i0nak0.png)

Click on **Choose file** to upload the file containing the details of the bank accounts you are making transfers to. Then click **Continue**

![Bulk transfer recipeints file upload](https://res.cloudinary.com/kennyy/image/upload/v1579777061/bulk_transfer_ibn1oh.png)

> To see the list of bank names and codes, or get a sample bulk disbursement CSV file, click on any of the links at the bottom of the pop-up.

When you've selected and uploaded a CSV file, you should see all the details displayed. Click **Send Transfer** to disburse the payment to the recipients.

![Bulk transfer recipeints file](https://res.cloudinary.com/kennyy/image/upload/v1580035823/bulk_transfer_data_tq9rae.png)

Voila!!! You've successfully made a bulk transfer.

### Make bulk transfer through our API

Flutterwave allows you to make a bulk transfer through our API's. You can do this by making a post request to our bulk transfer endpoint. To do this you need to pass your secret key along with the transfer details in your request object. Here's a sample request:

```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/transfers/create_bulk
', {
    json: {
        "seckey": "YOUR_SECRET_KEY",
        "title": "January Salary Payment",
        "bulk_data": [
	        {
	        "Bank":"058",
	        "Account Number": "01*****458",
	        "Amount":100,
	        "Currency":"NGN",
	        "Narration":"Bulk transfer 1",
	        "Reference": "TRF-01"
	    	},
	    	{
	        "Bank":"063",
	        "Account Number": "00*****310",
	        "Amount":100,
	        "Currency":"NGN",
	        "Narration":"Bulk transfer 2",
	        "Reference": "TRF-02"
	    	}
    ]
}
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(body)
})
```

#### Sample response

When the request is processed successfully, Flutterwave will return a response in this format to provide more information about the bulk transfer:

```json
{
  "status": "success",
  "message": "BULK-TRANSFER-CREATED",
  "data": {
    "id": 1663,
    "date_created": "2020-01-26T11:13:27.000Z",
    "approver": "N/A"
  }
}
```

### Retreive status of bulk transfer

To confirm the status of a bulk transfer, you need to make a request with your secret key and the `id` returned in your bulk transfer call. Here's a sample request to verify the status of a bulk transfer:

```javascript
var request = require("request");

var options = {
  method: "GET",
  url: "https://api.ravepay.co/v2/gpx/transfers",
  qs: {
    seckey: "YOUR_SECRET_KEY",
    batch_id: "YOUR_TRANSFER_ID"
  },
  headers: { "content-type": "application/json" }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### Request parameters

The table below defines the parameters and descriptions of the request object we constructed above to fetch the status of a bulk transfer.

| Parameter  | Required | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seckey`   | True     | This is your merchant secret key, see how to get your API keys from your dashboard [here](https://developer.flutterwave.com/reference#api-keys-1) |
| `batch_id` | True     | This is the `id` returned in the Bulk Transfer call as `data.id`.                                                                                 |

### Sample response

When the request is processed successfully, Flutterwave will return a response in this format to provide more information about the status of the bulk transfer:

```json
{
  "status": "success",
  "message": "QUERIED-TRANSFERS",
  "data": {
    "page_info": {
      "total": 2,
      "current_page": 1,
      "total_pages": 1
    },
    "transfers": [
      {
        "id": 1105056,
        "account_number": "015*****58",
        "bank_code": "058",
        "fullname": " EZE EKENE",
        "date_created": "2020-01-26T11:13:31.000Z",
        "currency": "NGN",
        "debit_currency": null,
        "amount": 100,
        "fee": 45,
        "status": "SUCCESSFUL",
        "reference": "TRF-02",
        "meta": null,
        "narration": "Bulk transfer 2",
        "approver": null,
        "complete_message": "Transaction was successful",
        "requires_approval": 0,
        "is_approved": 1,
        "bank_name": "GTBANK PLC"
      },
      {
        "id": 1105055,
        "account_number": "00*****310",
        "bank_code": "063",
        "fullname": "EKENE EZE",
        "date_created": "2020-01-26T11:13:30.000Z",
        "currency": "NGN",
        "debit_currency": null,
        "amount": 100,
        "fee": 45,
        "status": "FAILED",
        "reference": "TRF-01",
        "meta": null,
        "narration": "Bulk transfer 1",
        "approver": null,
        "complete_message": "System malfunction",
        "requires_approval": 0,
        "is_approved": 1,
        "bank_name": "ACCESS BANK PLC (DIAMOND)"
      }
    ]
  }
}
```

According to the response above, the first transfer was success while the second failed as a result of system malfunction.
