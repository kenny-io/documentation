# Overview

Flutterwave's split payment feature allows you to split a transaction between your account and one or more other sub-accounts. 

This feature is great for marketplace owners who help facilitate services for merchants and collect a commission as revenue for each transaction.

Flutterwave can automatically split the settlement such that the vendor's account is credited and the platform owner gets his own commission credited as well.
When using this feature the marketplace owner is responsible for vetting the merchant's signed up under their marketplace, this means that disputes and chargebacks would be logged against the marketplace owner.

## Flow

![Split payments flow](https://res.cloudinary.com/fullstackmafia/image/upload/v1571320802/Split_Payment_rztiti.png)

## Use Cases


- Building a ride sharing platform: You can pay all the drivers who use your ride sharing platform using this feature.
- Building a gig platform: Settling multiple freelancers on your platform.
- Building an e-commerce marketplace like Shopify, Jumia: You can settle the funds of multiple traders on your e-commerce store with this feature.
- Booking platform like OpenTable. 
- Invoicing solutions: Settling multiple invoices at the same time.
- School management system:  Handle expenses like teachers salaries and payments to multiple vendors.
- Package delivery service: Pay delivery riders a percentage on each completed delivery.


## Getting Started

The first step to getting started would be to set up a sub-account. This can be done in two ways:

1. Through the Flutterwave dashboard or 
2. Making a `POST` request to our API endpoint.

### Flutterwave dashboard 

When you login to your dashboard, follow this process to create sub-accounts:

- Click on the **Sub accounts** button on the side bar
- Click on **New Subaccount**


![Set up a subaccount 1](https://res.cloudinary.com/kennyy/image/upload/v1579604809/subaccount_gsvkwf.png)

Fill up the Sub account details form and click on **Create New Subaccount** 

![Set up a subaccount 2](https://res.cloudinary.com/kennyy/image/upload/v1579535332/subaccount-form_acpsai.png)

Your new sub-account will be created and added to the list of existing sub-accounts. If you check your sub-accounts, you should see the newly created one among the list:

![Set up a subaccount 3](https://res.cloudinary.com/kennyy/image/upload/v1579610782/new-subaccount_fdpyaz.png)


### Request to our API endpoint
Another approach you can take to creating sub-accounts would be to do it prohgrammatically by making a POST request to our `/create` sub-account API. To do this, you will define the sub-account details in the request object and post the request along with your secret. Here's a sample request:

```javascript
var request = require('request')
request.post('https://api.ravepay.co/v2/gpx/subaccounts/create', {
    json: {
        "account_bank": "063",
        "account_number": "0058000310",
        "business_name": "Globus Ventures",
        "business_email": "globus@ventures.com",
        "business_contact": "Ekene Eze",
        "business_contact_mobile": "07000000008",
        "business_mobile": "07000000008",
        "country": "NG",
        "meta": [{
            "metaname": "MarketplaceID",
            "metavalue": "ggs-920900"
        }],
        "seckey": "YOUR_SECRET_KEY"
}
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`status: ${res.status}`)
    console.log(body)
})
```


### Request parameters
The table below defines the parameters and descriptions of the request object we constructed above to create a new sub-account. 

| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `account_bank` 	| True 	| This is the sub-accounts bank ISO code, use this [List of Banks endpoint](https://developer.flutterwave.com/reference#list-of-banks) to retrieve a list of all supported banks with their respective ISO codes. Ex: "068", "044" etc. 	|
| `account_number` 	| True 	| This is the bank account number that will be tied to this sub-account. 	|
| `business_email` 	| False 	| This is the sub-account business name. | `business_name` 	| True 	| This is the sub-account business name. 	|
| `business_contact` 	| False 	| This is the contact person for the sub-account e.g. Richard Hendrix.	|
| `business_contact_mobile` 	| False 	| Business contact number.	|
| `business_mobile` 	| True 	| Primary business contact number.	|
| `country` 	| True 	| This is the sub-account business name. 	|
| `meta` 	| False 	| This allows you pass extra/custom information about the sub-account. it can be passed this way: `"meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]`	|
| `seckey` 	| True 	| This is merchants (Main account) secret key. 	|

When these values are provided and the request is successful, Flutterwave will return a response in this format to provide you more information about the status of the request.

```JSON
{
    "status": "success",
    "message": "SUBACCOUNT-CREATED",
    "data": {
        "id": 5970,
        "account_number": "0058000310",
        "account_bank": "063",
        "business_name": "Globus Ventures",
        "fullname": "EKENE EZE",
        "date_created": "2020-01-21T11:43:32.000Z",
        "meta": [
            {
                "metaname": "MarketplaceID",
                "metavalue": "ggs-920900"
            }
        ],
        "account_id": 93660,
        "split_ratio": 1,
        "split_type": "flat",
        "split_value": "0",
        "subaccount_id": "RS_6579F3FA05CD3688CCECE56CAA1E27A9",
        "bank_name": "ACCESS BANK PLC (DIAMOND)",
        "country": "NG"
    }
}
```

### Response parameters

| Parameter 	| Description 		|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `account_id` 		| This is a unique identifies for the provided business account	|
| `split_ratio` 	|  This defines the ratio of the payment for this sub-account when splitting payments across multiple sub-accounts.	|
| `split_type` 	| This can be either percentage or flat. When set as percentage, it means you want to take a percentage fee on all transactions, when it is flat, this means you want to take a flat fee on every transaction. |
 `split_value` 	| This can be a percentage value or flat value depending on what was set on split_type.	|
| `subaccount_id` | This is the unique identifier for the created sub-account	|

Looking through the dashboard, under the list of sub-accounts, you should see the Globus Ventures sub-account we created programatically as well.

![Sub account from API](https://res.cloudinary.com/kennyy/image/upload/v1579610581/api-subaccount_zbuseb.png)