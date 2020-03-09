## Quickstart

This section will guide you on how to complete a split transaction on your Flutterwave account using the following steps:

1. Retrieving your subaccount ID
2. Making a split payment to a subaccount
3. Verifying the split payment
4. Confirming the split payment information on your Flutterwave dashboard

### 1. Retrieving your subaccount ID

The first step is to get the subaccount ID of the subaccount you want to make a split payment to. For details on how to create a subaccount check out the [Overview section](https://paper.dropbox.com/doc/Overview--AmSQQrFrL7r3ySb7AEH67W~XAg-4guPWaY7oUw9qdaLi2nBn).

### 2. Making a split payment to a subaccount

The next step is to make a split payment to the newly created subaccount. When you create a subaccount you would be using the `subaccount ID` to receive payments. See how to do that via the Flutterwave Python SDK code sample below:

```python

    from rave_python
    import Rave, Misc, RaveExceptions

    rave = Rave("<YOUR PUBLIC KEY>", "YOUR SECRET KEY", usingEnv = False)

    payload = {
      "amount": "10000",
      "country": "NG",
      "currency": "NGN",
      "payment_type": "account",
      "IP": "355426087298442",
      "account_bank": "044",
      "bvn": "12345678901",
      "accountnumber": "0690000041",
      "accountbank": "044",
      "firstname": "Raphael",
      "lastname": "Ugwu",
      "phonenumber": "08083721998",
      "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c",
      "email": "ugwuraphael@gmail.com",
      "txRef": "MC-7666-YU",
      "subaccounts": [{
          "id": "RS_E5F7B53C26CB9CEAB9C3DD8DECF0B039"
          },
        {
          "id": "RS_B00A5EAB4B6A988A454DEADC2F6262BC"
        }
      ],
    }

    try:
    res = rave.Account.charge(payload)
    if res["authUrl"]:
      print(res["authUrl"])

    elif res["validationRequired"]:
      rave.Account.validate(res["flwRef"], "12345")

    res = rave.Account.verify(res["txRef"])
    print(res)

    except RaveExceptions.AccountChargeError as e:
      print(e.err)
    print(e.err["flwRef"])

    except RaveExceptions.TransactionValidationError as e:
      print(e.err)
    print(e.err["flwRef"])

    except RaveExceptions.TransactionVerificationError as e:
      print(e.err["errMsg"])
    print(e.err["txRef"])

```

### 3. Verify your transaction

After splitting a payment to a subaccount, you can retrieve the transaction ID and use it to verify your transaction:

```python

    import requests

    url = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify"

    querystring = {
            "txref": "INSERT-YOUR-UNIQUE-TRANSACTION-REFERENCE-HERE",
            "SECKEY": "INSERT-YOUR-SECRET-KEY-HERE"
        }

    headers = {'content-type': 'application/json'}

    try:
      response = requests.request("POST", url, headers=headers, params=querystring)
      print(response.text)

      except requests.exceptions.RequestException as e:
        print e
        sys.exit(1)

```

### 4. Confirm split payment

After splitting a transaction to a subaccount, you can confirm that the payment was split by logging on to your Flutterwave account and reviewing your subaccount transaction history:
&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576437682/image_preview_10_f145pj.png" />
&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576437682/image_preview_11_n5vqap.png" />
&nbsp;
