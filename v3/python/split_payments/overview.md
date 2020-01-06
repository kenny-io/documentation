## Overview

Flutterwave's split payment feature allows you split a transaction between your account and one or more subaccounts. This feature is great for marketplace owners who help facilitate services for merchants and collect a commission as revenue for each transaction.
Flutterwave can automatically split the settlement such that the vendor's account is credited and the platform owner gets his own commission credited as well.
When using this feature the marketplace owner is responsible for vetting the merchant's signed up under their marketplace, this means that disputes and chargebacks would be logged against the marketplace owner.


**Flow**

<img src='https://res.cloudinary.com/fullstackmafia/image/upload/v1576435959/image_preview_6_mvzde4.png' />

**Use Cases**

- Building a ride sharing platform: You can pay all the drivers who use your ride sharing platform using this feature.
- Building a gig platform: Settling multiple freelancers on your platform.
- Building an e-commerce marketplace like Shopify, Jumia: You can settle the funds of multiple traders on your e-commerce store with this feature.
- Booking platform like OpenTable. 
- Invoicing solutions: Settling multiple invoices at the same time.
- School management system:  Handle expenses like teachers salaries and payments to multiple vendors.


**Getting Started**

The first step to getting started would be to set up a subaccount. This can be done either via your Flutterwave dashboard or by making a  POST request to an API endpoint.

**Flutterwave Dashboard**

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576436334/image_preview_7_zsnafk.png" />
&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576436334/image_preview_8_v6xto2.png"/>
&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576436334/image_preview_9_aqake0.png"/>
&nbsp;


**Request to an API endpoint**

```python

    from rave_python import Rave
    from rave_python import RaveExceptions
    
    rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
    
    payload = {
            "account_bank": "044",
            "account_number": "0690000031",
            "business_name": "Jake Stores",
            "business_email": "kwakj@services.com",
            "business_contact": "Amy Parkers",
            "business_contact_mobile": "09083772",
            "business_mobile": "0188883882",
        "split_type": "flat",
        "split_value": 3000
            "meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]
    }
    
    try: 
        res = rave.SubAccount.createSubaccount(payload)
        print(res)
    except RaveExceptions.SubaccountCreationError as e:
        print(e.err["errMsg"])
        print(e.err["flwRef"])

```