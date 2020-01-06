## Pre-authorised Payments

With Rave's API, you can make pre-authorised charges on a customer's card. Use cases such as hotels and restaurants where reservations are always booked come in handy. Such businesses reserve the right to pre-authorise provided credit cards up to the full reservation amount at the point of reservation to check the validity. Note that pre-authorised payments are not transaction charges thus they will not reflect on the customer's credit card statement.


** 1.  Set up a Rave account**

 First, you need to sign up for a Rave account. [Register here](https://rave.flutterwave.com/signup).

**2.  Install Rave's official Python library**

```python

    # Terminal
    
    pip install rave_python

```

**3.  Make a charge on a card**

To pre-authorise a card you'll need a token. To get the token, you need to make an initial charge on the card using the  `rave.Card.charge()`  endpoint. 

```python

    from rave_python
    import Rave, RaveExceptions, Misc
    
    rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", production = False, usingEnv = False)
    
    payload = {
      "cardno": "5438898014560229",
      "cvv": "890",
      "expirymonth": "09",
      "expiryyear": "19",
      "amount": "1000",
      "email": "user@gmail.com",
      "phonenumber": "0902620185",
      "firstname": "Temi",
      "lastname": "Desola",
      "IP": "355426087298442",
    }
    res = rave.Card.charge(payload)
    print(res)

```

Charging the card returns an embedded token which will then be used to preauthorise the card:

```python

    {
      'status': 'success',
      'validationRequired': False,
      'suggestedAuth': None,
      'flwRef': 'FLW-M03K-cdb24d740fb18c242dd277fb1f74d399',
      'authUrl': None,
      'chargeToken': {
        'embed_token': "flw-t0-553ebd7e77b76e4a48722f66e5de68a0-m03k",
        'user_token': "448f8"
      }
      'error': False,
      'txRef': 'MC-7666-YU'
    }

```

**4.   Pre-authorise the card**

Use the embedded token gotten from charging the card to pre-authorise the card:

```python

    from rave_python
    import Rave, RaveExceptions, Misc
    
    rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", production = False, usingEnv = False)
    payload = {
      "token": "flw-t1nf-5b0f12d565cd961f73c51370b1340f1f-m03k",
      "country": "NG",
      "amount": 1000,
      "email": "user@gmail.com",
      "firstname": "Temi",
      "lastname": "Desola",
      "IP": "190.233.222.1",
      "txRef": "MC-7666-YU",
      "currency": "NGN"
    }
    
    try:
      res = rave.Preauth.charge(payload)
      print(res)
    except RaveExceptions.TransactionChargeError as e:
      print(e.err["errMsg"])
      print(e.err["flwRef"])

```

The response from pre-authorising a card will show that the card was charged if successful. If a card was successfully charged, you should fulfil a customer's order and show them a success page:

```python

    {
      'status': 'success',
      'validationRequired': False,
      'suggestedAuth': None,
      'flwRef': 'FLW-M03K-cdb24d740fb18c242dd277fb1f74d399',
      'authUrl': None,
      'error': False,
      'txRef': 'MC-7666-YU'
    }

```

If pre-authorising the card was unsuccessful an [error code](https://developer.flutterwave.com/docs/rave-errors) will be shown. At this point, you should show your customer an error page.

**5.   Capture the funds in a card**

After making a pre-authorised charge on a card, the next step would be to capture the funds in the card's account. This is done by using the `rave.Charge.capture`  method. To do this, you'll need the value of the  `flwRef`  property in the response where you pre-authorised the card.

```python

    rave.Charge.capture(data["flwRef"])

```

**6.   Verifying a card**

After capturing the funds in a card, you'll need to verify the transaction to ensure that funds were received. This is done by using the `rave.Charge.verify`  method. To do this, you'll need the value of the  `txRef`  property in the response where you pre-authorised the card.

```python

    rave.Charge.verify(data["txRef"])

```

**7.   Declaring a card void**

In some cases such as a data breach or a security concern, we may need to void a pre-authorised transaction. This can be done by using the  `rave.Charge.void`  method. Like you would do when you need to capture funds, you'll need the value of the  `flwRef`  property which is in the response where you pre-authorised the card.

```python

    rave.Charge.void(data["flwRef"])

```

**8.  Refunding a card**

Some scenarios require that you refund a card. To do this, use the  `rave.Charge.refund`  method. You'll also need the value of the  `flwRef`  property which can be gotten from the response where you pre-authorised the card.

```python

    rave.Charge.refund(data["flwRef"])

```

**9.   Complete flow**

```python

    from rave_python
    import Rave, RaveExceptions, Misc
    
    rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", production = False, usingEnv = False)
    payload = {
      "token": "flw-t1nf-5b0f12d565cd961f73c51370b1340f1f-m03k",
      "country": "NG",
      "amount": 1000,
      "email": "user@gmail.com",
      "firstname": "Temi",
      "lastname": "Desola",
      "IP": "190.233.222.1",
      "txRef": "MC-7666-YU",
      "currency": "NGN"
    }
    
    try:
      res = rave.Preauth.charge(payload)
      res = rave.Preauth.capture(res["flwRef"])
      res = rave.Preauth.verify(res["txRef"])`
      print(res)
    except RaveExceptions.TransactionChargeError as e:
      print(e.err["errMsg"])
      print(e.err["flwRef"])

```