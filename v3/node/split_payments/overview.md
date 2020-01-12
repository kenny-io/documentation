# Overview

Rave's split payment feature allows you split a transaction between your account and one or more subaccounts. This feature is great for marketplace owners who help facilitate services for merchants and collect a commission as revenue for each transaction.
Rave can automatically split the settlement such that the vendor's account is credited and the platform owner gets his own commission credited as well.
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

## Getting Started

The first step to getting started would be to set up a subaccount. This can be done either via your Flutterwave dashboard or by making a  `POST` request to an API endpoint.

## Flutterwave Dashboard

![Set up a subaccount 1](https://files.readme.io/3da6497-Screenshot_2018-07-27_12.36.09.png)
![Set up a subaccount 2](https://files.readme.io/0e4f7b9-Screenshot_2018-07-27_13.32.46.png)
![Set up a subaccount 3](https://files.readme.io/3f11d7b-Screenshot_2018-07-27_13.33.59.png)


## Request to an API endpoint

```javascript

    var request = require('request')
    
    request.post('https://api.Flutterwavepay.co/v2/gpx/subaccounts/create', {
        json: {
            "account_bank": "044",
            "account_number": "0690000035",
            "business_name": "JK Services",
            "business_email": "jk@services.com",
            "business_contact": "Seun Alade",
            "business_contact_mobile": "090890382",
            "business_mobile": "09087930450",
            "country": "NG",
            "meta": [{
                "metaname": "MarketplaceID",
                "metavalue": "ggs-920900"
            }],
            "seckey": "<PASS YOUR SECRET KEY HERE>"
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
    })

```


