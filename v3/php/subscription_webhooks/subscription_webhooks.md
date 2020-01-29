# How subscription webhooks work

With webhooks, your application can receive notifications should a recurring subscription succeed on your Rave account. Think of a webhook as an inbox which Rave sends a message to each time an event happens in your Rave account. Events are not limited to just subscriptions, they can include any time a customer files for a chargeback, a customer's bank confirms their intention to pay you or even a customer signing up on your application. Technically, a webhook is just a server-side script which when created, handles any event you specify on your dashboard.

### When to use webhooks

Webhooks can be used for all kinds of payment methods, card, account, USSD, Mpesa, and Ghana Mobile money.
If you use Rave to accept alternate payment methods like USSD, Mpesa, and Ghana mobile money, it is best practice to use webhooks so that your integration can be notified about changes the status of the payment once it is completed. This is because these payment methods are asynchronous and responses only come once the customer has completed the payment on their device.

You might also use webhooks to:

- Update a customer's membership record in your database when a subscription payment succeeds.
- Email a customer when a subscription payment fails.
- Update your database when the status of a pending payment is updated to successful.

**NB**: Not in all cases would you be able to rely completely on webhooks to get notified, an example is if your server is experiencing a downtime and your hook endpoints are affected, some customers might still be transacting independently of that and the hook call triggered would fail because your server was unreachable.

In such cases we advise that developers set up a re-query service that goes to poll for the transaction status at regular intervals e.g. `every hour` using the [Verify Payment](https://developer.flutterwave.com/docs/status-check) endpoint, till a successful or failed response is returned.

### Sample Transaction Payload

On Rave, webhooks can be configured for transactions. When a transaction is completed, a POST HTTP request is sent to the URL you have configured. The HTTP payload will contain:

#### Hook Structure

The hook request structure is consistent across the board, but you can differentiate the event type using the `event.type` parameter returned. See the list of possible values for the parameter below:

Card Payments: `CARD_TRANSACTION`

```python

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

```python

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

```python

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

```python

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

```python

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

```python

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

```python

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

**How to setup webhooks on your dashboard.**

Click on `Settings` then navigate to `Webhooks` to set up a webhook on your dashboard. Once on the webhook page, input your webhook URL and its secret hash then save it.
&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576441165/image_preview_15_gwursd.png" />
