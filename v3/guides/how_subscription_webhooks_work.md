# How webhooks work

With webhooks, your application can receive notifications when a recurring subscription succeed on your Flutterwave account. Think of a webhook as an inbox which Flutterwave sends messages to each time an event happens in your account. Events are not limited to just subscriptions, they can include any time a customer files for a chargeback, a customer's bank confirms their intention to pay you or even a customer signing up on your application. Technically, a webhook is just a server-side script which when created, handles any event you specify on your dashboard.

## When to use webhooks

Webhooks can be used for all kinds of payment methods - card, account, USSD, Mpesa, and Ghana Mobile money.
If you use Flutterwave to accept alternate payment methods like USSD, Mpesa, and Ghana mobile money, it is advised to use webhooks so that you can get notified about changes on the status of the payment once it is completed. This is because these payment methods are asynchronous and responses only come once the customer has completed the payment on their device.

You might also use webhooks to:

- Update a customer's membership record in your database when a subscription payment succeeds.
- Email a customer when a subscription payment fails.
- Update your database when the status of a pending payment is updated to successful.
- Tailor it to whatever use case you want.

> NB: Not in all cases would you be able to rely completely on webhooks to get notified. An example is if your server is experiencing a downtime and your hook endpoints are affected, some customers might still be transacting independently of that and the hook call triggered would fail because your server was unreachable.

In such cases, we advise that developers set up a re-query service that goes to poll for the transaction status at regular intervals e.g. `every hour` using the [Verify Payment](https://developer.flutterwave.com/docs/status-check) endpoint, till a successful or failed response is returned.

## Sample Transaction Payload

On Flutterwave, webhooks can be configured for transactions. When a transaction is completed, a POST HTTP request is sent to the URL you have configured. The HTTP payload will contain:

```JSON
{
  "id": 126122,
  "txRef": "rave-pos-121775237991",
  "flwRef": "FLW-MOCK-72d0b2d66273fad0bb32fdea9f0fa298",
  "orderRef": "URF_1523185223111_833935",
  "paymentPlan": null,
  "createdAt": "2018-04-08T11:00:23.000Z",
  "amount": 1000,
  "charged_amount": 1000,
  "status": "successful",
  "IP": "197.149.95.62",
  "currency": "NGN",
  "customer": {
    "id": 22836,
    "phone": null,
    "fullName": "Anonymous customer",
    "customertoken": null,
    "email": "salesmode@ravepay.co",
    "createdAt": "2018-04-08T11:00:22.000Z",
    "updatedAt": "2018-04-08T11:00:22.000Z",
    "deletedAt": null,
    "AccountId": 134
  },
  "entity": {
    "card6": "539983",
    "card_last4": "8381"
  },
  "event.type": "CARD_TRANSACTION"
}
```

Recurring Card Payments: `CARD_TRANSACTION`

```JSON
{
  "id": 473055,
  "txRef": "rave-123456",
  "flwRef": "FLW-MOCK-RECURR-3c316e36c65da2f7cd4bfb88f6977a51",
  "orderRef": "URF_1551966008798_3588435",
  "paymentPlan": null,
  "createdAt": "2019-03-07T13:40:08.000Z",
  "amount": 5000,
  "charged_amount": 5000,
  "status": "successful",
  "IP": "223.72.120.42",
  "currency": "NGN",
  "customer": {
    "id": 4222,
    "phone": "08035134649",
    "fullName": "Temi Adelewa",
    "customertoken": null,
    "email": "desola.ade1@gmail.com",
    "createdAt": "2017-09-19T23:03:32.000Z",
    "updatedAt": "2017-09-19T23:03:32.000Z",
    "deletedAt": null,
    "AccountId": 134
  },
  "entity": {
    "card6": "543889",
    "card_last4": "0229"
  },
  "event.type": "CARD_TRANSACTION"
}
```

Account/ACH: `ACCOUNT_TRANSACTION`

```JSON
{
  "id": 125837,
  "txRef": "rave-pos-272519815315",
  "flwRef": "FLWACHMOCK-1523118279396",
  "orderRef": "URF_1523118277202_7343035",
  "paymentPlan": null,
  "createdAt": "2018-04-07T16:24:37.000Z",
  "amount": 200,
  "charged_amount": 200,
  "status": "successful",
  "IP": "197.149.95.62",
  "currency": "NGN",
  "customer": {
    "id": 5766,
    "phone": "N/A",
    "fullName": "Anonymous customer",
    "customertoken": null,
    "email": "salesmode@ravepay.co",
    "createdAt": "2017-10-16T10:03:19.000Z",
    "updatedAt": "2017-10-16T10:03:19.000Z",
    "deletedAt": null,
    "AccountId": 134
  },
  "entity": {
    "account_number": "0690000037",
    "first_name": "Dele Moruf",
    "last_name": "Quadri"
  },
 "event.type": "ACCOUNT_TRANSACTION"
}
```

Ghana Mobile Money: `MOBILEMONEYGH_TRANSACTION`

```JSON
{
  "id": 560930,
  "txRef": "MC-1556614529471",
  "flwRef": "flwm3s4m0c1556614533770",
  "orderRef": "URF_MMGH_1556614532854_4300235",
  "paymentPlan": null,
  "createdAt": "2019-04-30T08:55:32.000Z",
  "amount": 50,
  "charged_amount": 50.72,
  "status": "successful",
  "IP": "::ffff:10.63.55.145",
  "currency": "GHS",
  "customer": {
    "id": 112307,
    "phone": "08082000503",
    "fullName": "Anonymous Customer",
    "customertoken": null,
    "email": "cezojejaze@nyrmusic.com",
    "createdAt": "2019-04-04T15:40:22.000Z",
    "updatedAt": "2019-04-04T15:40:22.000Z",
    "deletedAt": null,
    "AccountId": 8364
  },
  "entity": {
    "id": "NO-ENTITY"
  },
  "event.type": "MOBILEMONEYGH_TRANSACTION"
}
```

M-Pesa Payments: `MPESA_TRANSACTION`

```JSON
{
  "id": 130438,
  "txRef": "rave-1902008383",
  "flwRef": "ws_CO_15042018193205498_1998935614_1884_1523809926391",
  "orderRef": "1998935614_1884_1523809926391",
  "paymentPlan": null,
  "createdAt": "2018-04-15T16:32:06.000Z",
  "amount": 2000,
  "charged_amount": 2028,
  "status": "successful",
  "IP": "41.86.149.34",
  "currency": "KES",
  "customer": {
    "id": 23858,
    "phone": "254791498442",
    "fullName": "Anonymous customer",
    "customertoken": null,
    "email": "user@ymail.com",
    "createdAt": "2018-04-15T16:32:05.000Z",
    "updatedAt": "2018-04-15T16:32:05.000Z",
    "deletedAt": null,
    "AccountId": 1884
  },
  "entity": {
    "id": "NO-ENTITY"
  },
 "event.type": "MPESA_TRANSACTION"
}
```

Payouts: `Transfer`

```JSON
{
  "event.type": "Transfer",
  "transfer": {
    "id": 570,
    "account_number": "0690000040",
    "bank_code": "044",
    "fullname": "Alexis Sanchez",
    "date_created": "2018-06-11T14:07:49.000Z",
    "currency": "NGN",
    "amount": 9000,
    "fee": 45,
    "status": "SUCCESSFUL",
    "reference": "rave-transfer-152812343460966",
    "narration": "New transfer",
    "approver": null,
    "complete_message": "Approved Or Completed Successfully",
    "requires_approval": 0,
    "is_approved": 1,
    "bank_name": "ACCESS BANK NIGERIA"
  }
}
```

Pay with Bank Transfer: `BANK_TRANSFER_TRANSACTION`

```JSON
{
  "id": 68376907,
  "txRef": "Rave-Pages374737616222",
  "flwRef": "439695021",
  "orderRef": "URF_1563264772390_6617735",
  "paymentPlan": null,
  "createdAt": "2019-07-16T08:17:35.000Z",
  "amount": 101.5,
  "charged_amount": 101.5,
  "status": "successful",
  "IP": "41.190.30.39",
  "currency": "NGN",
  "customer": {
    "id": 42218458,
    "phone": null,
    "fullName": "Tens Ani",
    "customertoken": null,
    "email": "tens@mail.com",
    "createdAt": "2019-07-16T08:12:52.000Z",
    "updatedAt": "2019-07-16T08:12:52.000Z",
    "deletedAt": null,
    "AccountId": 48
  },
  "entity": {
    "id": "NO-ENTITY"
  },
  "event.type": "BANK_TRANSFER_TRANSACTION"
}
```

## Hook Structure

The hook request structure is consistent across the board, but you can differentiate the event type using the event.type parameter returned. See the list of possible values for the parameter below:

Zambia Mobile Money: `MOBILEMONEYZM_TRANSACTION`

Ghana Mobile Money: `MOBILEMONEYGH_TRANSACTION`

Rwanda Mobile Money: `MOBILEMONEYRW_TRANSACTION`

Card Payments: `CARD_TRANSACTION`

M-Pesa Payments: `MPESA_TRANSACTION`

QR Payments: `MVISA-QR_TRANSACTION`

Barter Payments: `BARTER_TRANSACTION`

Pay with Bank Transfer: `BANK_TRANSFER_TRANSACTION`

USSD: `USSD_TRANSACTION`

PayAttitude: `PAYATTITUDE_TRANSACTION`

ACCOUNT/ACH: `ACCOUNT_TRANSACTION`

Francophone Mobile Money: `MOBILEMONEYSN_TRANSACTION`

Payouts: `Transfer`

E-Bills: `EBILLS_TRANSACTION`

## How to setup webhooks on your dashboard

Click on `Settings` then navigate to `Webhooks` to set up a webhook. Once on the webhook page, input your webhook URL and its secret hash then save it.
&nbsp;

<img src="https://res.cloudinary.com/kennyy/image/upload/v1583761580/webhooks_fbzrr8.png" />

## Receiving a webhook notification

Creating a webhook endpoint on your server is no different from creating any page on your website. With PHP, you might create a new .php file on your server; with a framework like Laravel, Flask, Sinatra, you would add a new route with the desired webhook URL.

Webhook data is sent as form-urlencoded by default but you can configure on your webhook settings page on the dashboard to send the request as JSON instead

> Checking webhook signatures
> You can use a secret hash to verify that your received requests were sent by rave.

```Javascript
// This example uses Express to receive webhooks
const app = require("express")();
app.post("/my/webhook/url", function(request, response) {
  /* It is a good idea to log all events received. Add code *
 * here to log the signature and body to db or file       */

  // retrieve the signature from the header
  var hash = req.headers["verif-hash"];
  if(!hash) {
  	// discard the request,only a post with rave signature header gets our attention
  }
  // Get signature stored as env variable on your server
  const secret_hash = process.env.MY_HASH;
  // check if signatures match
  if(hash !== secret_hash) {
   // silently exit, or check that you are passing the write hash on your server.
  }
  // Retrieve the request's body
  var request_json = JSON.parse(request.body);

  // Give value to your customer but don't give any output
// Remember that this is a call from rave's servers and
// Your customer is not seeing the response here at all
  response.send(200);
});
```

## Verifying Webhook signature (secret hash)

Rave returns the secret hash configured in your settings, in the `request headers` as `verif-hash` you can store the same secret hash as an environment variable and check if it is the same value sent in the `verif-hash` property before processing the webhook request. If they are not the same you can discard the request.

## Receiving webhooks with a CSRF-protected server

When using Rails, Django, or any other web framework, your site might automatically check that every POST request contains a CSRF token. This is an important security feature that protects you and your users from cross-site request forgery.

However, this security measure might also prevent your site from processing webhooks sent by Flutterwave. If so, you might need to exempt the webhooks route from <a href="https://en.wikipedia.org/wiki/Cross-site_request_forgery"> CSRF </a> protection. See how to do that with python and Ruby below:

### Python implementation

```python
import json
# Webhooks are always sent as HTTP POST requests, so we want to ensure
# that only POST requests will reach your webhook view. We can do that by
# decorating `webhook()` with `require_POST`.
#
# Then to ensure that the webhook view can receive webhooks, we need
# also need to decorate `webhook()` with `csrf_exempt`.
@require_POST
@csrf_exempt
def webhook(request):
  # Process webhook data in `request.body`
```

### Ruby implementation

```ruby
class RaveController < ApplicationController
  # If your controller accepts requests other than Rave webhooks,
  # you'll probably want to use `protect_from_forgery` to add CSRF
  # protection for your application. But don't forget to exempt
  # your webhook route!
  protect_from_forgery :except => :webhook

  def webhook
    # Process webhook data in `params`
  end
end
```

## Responding to a webhook request

To acknowledge receipt of a webhook, your endpoint should return a 200 HTTP status code. All response codes outside this range, including 3xx codes, will indicate to Rave that you did not receive the webhook. This does mean that a URL redirection or a "Not Modified" response will be treated as a failure. Rave will ignore any other information returned in the request headers or request body.

If your endpoint does not successfully receive a webhook for any reason, webhooks would not be retried, though you can query for the status using the <a href="https://developer.flutterwave.com/docs/status-check"> Verify Payment </a> endpoint to reconcile your data with any missed events.

## Best practices

If your webhook script performs complex logic, or makes network calls, it's possible that the script would time out before rave sees its complete execution. For that reason, you might want to have your webhook endpoint immediately acknowledge receipt by returning a 200 HTTP status code, and then perform the rest of its duties.

Webhook endpoints might occasionally receive the same event more than once. We advise you to guard against duplicated event receipts by making your event processing <a href="https://en.wikipedia.org/wiki/Idempotence"> idempotent.</a> One way of doing this is logging the events you've processed, and then checking if the status has changed before processing the identical event. Additionally, we recommend verifying webhook signatures to confirm that received events are being sent from Rave.
