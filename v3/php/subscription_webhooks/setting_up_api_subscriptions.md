# Set up subscription through our API

Setting up subscriptions programmatically can be completed in the following steps below:

- Create a payment plan
- Initiate a subscription payment

#### Create a payment plan

Rave helps you collect payments recurrently from your customers using a payment plan. Payment plans allow you create a subscription for your customers.

When you have created a payment plan, you can subscribe a customer to it by simply passing the `plan ID` in your request to charge the customers card. Here's a sample implementation to create a payment plan:

```javascript
var request = require("request");

request.post(
  "https://api.ravepay.co/v2/gpx/paymentplans/create",
  {
    json: {
      secret_key: "YOUR_SECRET_KEY",
      amount: "5000",
      name: "Monthly Nepa Bill",
      interval: "monthly",
      duration: "12"
    }
  },
  (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(body);
  }
);
```

#### Response

Here's a sample response for the above request:

```json
{
  "status": "success",
  "message": "CREATED-PAYMENTPLAN",
  "data": {
    "id": 11401,
    "name": "Monthly Nepa Bill",
    "amount": "5000",
    "interval": "monthly",
    "duration": 12,
    "status": "active",
    "currency": "NGN",
    "plan_token": "rpp_0538338ee42bb097497f",
    "date_created": "2020-01-29T13:32:51.000Z"
  }
}
```

The planID in the response above can be used in any charge request to subscribe customers to this payment plan.

#### Initiate a subscription payment

You can now use the payment plan ID in the response above to perform subscription payments via any of our payment methods. Here's an implementation using our inline payment function:

```javascript
const API_publicKey = "YOUR_PUBLIC_KEY";

function payWithRave() {
  var x = getpaidSetup({
    PBFPubKey: API_publicKey,
    customer_email: "user@example.com",
    amount: 2000,
    customer_phone: "234099940409",
    currency: "NGN",
    payment_method: "both",
    txref: "rave-123456",

    payment_plan: 11401,

    meta: [
      {
        metaname: "flightID",
        metavalue: "AP1234"
      }
    ],
    onclose: function() {},
    callback: function(response) {
      var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
      console.log(response);
      if (
        response.tx.chargeResponseCode == "00" ||
        response.tx.chargeResponseCode == "0"
      ) {
        // redirect to a success page
      } else {
        // redirect to a failure page.
      }

      x.close();
    }
  });
}
```

#### Sample response

Here's a sample success response for the payment function above after processing:

```json
{
  "status": "success",
  "message": "V-COMP",
  "data": {
    "id": 213332305,
    "txRef": "rave-123456",
    "orderRef": "URF_EDF79F7B6D8F6CADC7BE",
    "flwRef": "FLW208484340",
    "redirectUrl": "http://127.0.0",
    "device_fingerprint": "939b395e3122c48e8aba36e7b32495b0",
    "settlement_token": null,
    "cycle": "one-time",
    "amount": 100,
    "charged_amount": 100,
    "appfee": 1.4,
    "merchantfee": 0,
    "merchantbearsfee": 1,
    "chargeResponseCode": "00",
    "raveRef": null,
    "chargeResponseMessage": "APPROVED",
    "authModelUsed": "noauth-saved-card",
    "currency": "NGN",
    "IP": "197.149.95.62",
    "narration": "Peter Ekene",
    "status": "successful",
    "modalauditid": "3179619daf64146bb1c782f6bd658e52",
    "vbvrespmessage": "APPROVED",
    "authurl": "N/A",
    "vbvrespcode": "00",
    "acctvalrespmsg": null,
    "acctvalrespcode": null,
    "paymentType": "card",
    "paymentPlan": 11401,
    "paymentPage": null,
    "paymentId": "4357957",
    "fraud_status": "ok",
    "charge_type": "normal",
    "is_live": 0,
    "retry_attempt": null,
    "getpaidBatchId": null,
    "createdAt": "2020-01-29T14:11:05.000Z",
    "updatedAt": "2020-01-29T14:11:12.000Z",
    "deletedAt": null,
    "customerId": 163856203,
    "AccountId": 17321,
    "chargeToken": {
      "user_token": "",
      "embed_token": ""
    }
  }
}
```

### How to get your subscription ID

To get the subscription ID for the payment above, call the fetch a subscription endpoint with the transaction id returned in the response above as `data.id`. Here's a sample implementation for the request:

```javascript
var request = require("request");

var options = {
  method: "GET",
  url: "https://api.ravepay.co/v2/gpx/subscriptions/query",
  qs: { seckey: "YOUR_SECRET_KEY", transaction_id: 213332305 },
  headers: { "content-type": "application/json" }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

#### Response

This is the successful response structure for the above request:

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

From the response above, you can see your subscription ID i.e 6107. You can use this ID to perform actions on this subscription (Fetch, Activate and Cancel).
