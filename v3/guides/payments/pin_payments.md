## PIN Payments

Rave allows you charge a card that uses a Personal Identification Number PIN as a means of authentication. Cards that use a PIN as an authentication method include but are not limited to local MasterCard and Verve cards. While charging a card that uses a PIN, you may configure One Time password (OTP) settings as well.

 **1.  Set up a Rave account**

 First, you need to sign up for a Rave account. [Register here](https://rave.flutterwave.com/signup).


**2.  Install Rave's official Python library**

```python

    # Terminal
    
    pip install rave_python

```

**3.  Initiate a charge on a card**

To initiate a charge on a card, you'll need the following details from the card:

**Card Number:**  This is the 16 digit number on the front side of the card
**Card Verification Value (CVV):** Sometimes called Card Verification Code or Card Security Code, it is the 3 digit number on the rear side of the card.
**Expiry Date:** Located at the front side of the card, it is the date the card is due for renewal.

With these details, you can initiate a charge on the card using the  `Rave.card.Charge()`  endpoint:

```python

    from rave_python
    import Rave, RaveExceptions, Misc
    
    rave = Rave("YOUR PUBLIC KEY", "YOUR SECRET KEY", production = False, usingEnv = False)
    
    payload = {
      "cardno": "5531886652142950",
      "cvv": "890",
      "expirymonth": "09",
      "expiryyear": "19",
      "amount": "1000",
      "email": "user@gmail.com",
      "phonenumber": "09026201875",
      "firstname": "Temi",
      "lastname": "Desola",
      "IP": "355426087298442",
      "txRef":"MC-7666-YU"
      "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
      "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }
    res = rave.Card.charge(payload)
    print(res)

```

**4.   Update your payload**

After the charge call to the endpoint, we'll receive a response demanding for the PIN of the card.

```python

    {
       'validationRequired': True,
       'suggestedAuth': 'PIN',
       'flwRef': None,
       'authUrl': None,
       'error': False,
       'txRef': 'MC-7666-YU'
     }

```

 The next step here would be to update our payload with the card's PIN. This can be done by using the  `rave.card.updatePayload()`  endpoint:

```python

     rave.Card.updatePayload(suggestedAuth, payload, pin="THE_CARD'S_PIN")

```

**5.   Validate the card**

After updating your payload with the card's PIN, you'll often be asked to validate the card with a one time password (OTP) which is usually sent to the phone number or email registered to the card. You can validate the card using the  `rave.Card.validate()` endpoint:

```python

    rave.Card.validate(res["flwRef"], "THE_CARD'S_OTP")

```

**6.   Verify the card**

After capturing the funds in a card, you'll need to verify the transaction to ensure that funds were received. This is done by using the `rave.Charge.verify`  method. To do this, you'll need the value of the  `txRef`  property in the response where you pre-authorised the card.

```python

    rave.Charge.verify(data["txRef"])

```

**7.   Complete flow**

```python

    from rave_python import Rave
    rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
    
    # Payload with pin
    payload = {
      "cardno": "5438898014560229",
      "cvv": "890",
      "expirymonth": "09",
      "expiryyear": "19",
      "amount": "10",
      "email": "user@gmail.com",
      "phonenumber": "0902620185",
      "firstname": "temi",
      "lastname": "desola",
      "IP": "355426087298442",
    }
    
    try:
    res = rave.Card.charge(payload)
    
    if res["suggestedAuth"]:
      arg = Misc.getTypeOfArgsRequired(res["suggestedAuth"])
    
    if arg == "pin":
      Misc.updatePayload(res["suggestedAuth"], payload, pin = "3310")
    
    res = rave.Card.charge(payload)
    
    if res["validationRequired"]:
      rave.Card.validate(res["flwRef"], "")
    
    res = rave.Card.verify(res["txRef"])
    print(res["transactionComplete"])
    
    except RaveExceptions.CardChargeError as e:
      print(e.err["errMsg"])
    print(e.err["flwRef"])
    
    except RaveExceptions.TransactionValidationError as e:
      print(e.err)
    print(e.err["flwRef"])
    
    except RaveExceptions.TransactionVerificationError as e:
      print(e.err["errMsg"])
    print(e.err["txRef"])

```