# Overview

Flutterwave's subscription tool allows users to redefine their recurring business model. It lets you handle all subscriptions available on your account via the `subscriptions` endpoint. With handling subscriptions, the following functionalities are available:

- List all subscriptions
- Fetch a subscription
- Cancel a subscription
- Activate a subscription

## This is how Subscriptions work

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576441730/image_preview_16_b3qfto.png"/>

## Use Cases

- Building a media streaming app with different subscription timeframes like Spotify or Netflix
- Building a Saas (Software as a service), Paas (Platform as a service) or Iaas (Infrastructure as a service) platform where users can be charged on a recurring basis like Azure and Heroku
- Organisation management system: Organisations can handle recurring payments such as tithes, levies, bills and taxes.

## List all subscriptions

This allows you to retrieve all available subscriptions on your account using.

Here's a sample implementation to retreive a list of all available subscriptions on your account:

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);

rave.Subscription.list()
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

### Sample response

Here's a sample response for the request above:

```json
{
  "error": False,
  "returnedData": {
    "status": "success",
    "message": "SUBSCRIPTIONS-FETCHED",
    "data": {
      "page_info": {
        "total": 0,
        "current_page": 0,
        "total_pages": 0
      },
      "plansubscriptions": []
    }
  }
}
```

## Fetch a subscription

This feature allows you to fetch a single subscription from the available subscriptions on your account when you pass in the subscriptions ID. Here's a sample implementation:

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);
// subscription_id = the `id` of the subscription you want to fetch
rave.Subscription.fetch(subscription_id)
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

### Sample response

Here's what a response from this call would look like:

```json
{
  "status": "success",
  "message": "SUBSCRIPTIONS-FETCHED",
  "data": {
    "page_info": {
      "total": 1,
      "current_page": 1,
      "total_pages": 1
    },
    "plansubscriptions": [
      {
        "id": 6107,
        "amount": 5000,
        "customer": {
          "id": 163856203,
          "customer_email": "me@example.com"
        },
        "plan": 11401,
        "status": "active",
        "date_created": "2020-01-29T14:11:12.000Z"
      }
    ]
  }
}
```

## Cancel a subscription

This feature provides you the ability to terminate and active subscription on your account. To cancel a subscription, you will be required to pass in the `subscription_id` which is the `id` of the subscription you wish to cancel. Here's a sample implementation:

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);

// subscription_id = the `id` of the subscription you want to fetch
rave.Subscription.cancel(subscription_id)
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```

### Sample response

```json
{
  "status": "success",
  "message": "SUBSCRIPTION-CANCELLED",
  "data": {
    "id": 6107,
    "amount": 5000,
    "customer": {
      "id": 163856203,
      "customer_email": "me@example.com"
    },
    "plan": 11401,
    "status": "cancelled",
    "date_created": "2020-01-29T14:11:12.000Z"
  }
}
```

## Activate a subscription

This feature provides you the ability to activate and active subscription on your account. To cancel a subscription, you will be required to pass in the `subscription_id` which is the `id` of the subscription you wish to activate. Here's a sample implementation:

```javascript
var Ravepay = require("ravepay");

var rave = new Ravepay(YOUR_PUBLIC_KEY, YOUR_SECRET_KEY, false);

// subscription_id = the `id` of the subscription you want to fetch
rave.Subscription.activate(subscription_id)
  .then(resp => {
    console.log(resp.body);
  })
  .catch(err => {
    console.log(err);
  });
```
