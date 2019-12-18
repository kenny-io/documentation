## Going live

**Card Charge**

```python

    from rave_python import Rave
    from rave_python import RaveExceptions
    
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
                Misc.updatePayload(res["suggestedAuth"], payload, pin="3310")
            if arg == "address":
                Misc.updatePayload(res["suggestedAuth"], payload, address= {"billingzip": "07205", "billingcity": "Hillside", "billingaddress": "470 Mundet PI", "billingstate": "NJ", "billingcountry": "US"})
    
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

**Tokenized Charge**

```python

    from rave_python import Rave
    from rave_python import RaveExceptions
    
    rave = Rave("YOUR_PUBLIC_KEY", "YOUR_SECRET_KEY", usingEnv = False)
    
    # Payload with pin
    payload = {
      "token":"flw-t1nf-5b0f12d565cd961f73c51370b1340f1f-m03k",
        "country":"NG",
        "amount":1000,
        "email":"user@gmail.com",
        "firstname":"temi",
        "lastname":"Oyekole",
        "IP":"190.233.222.1",
        "txRef":"MC-7666-YU",
        "currency":"NGN"
    }
    
    try:
        res = rave.Card.charge(payload)
    
        if res["suggestedAuth"]:
            arg = Misc.getTypeOfArgsRequired(res["suggestedAuth"])
    
            if arg == "pin":
                Misc.updatePayload(res["suggestedAuth"], payload, pin="3310")
            if arg == "address":
                Misc.updatePayload(res["suggestedAuth"], payload, address= {"billingzip": "07205", "billingcity": "Hillside", "billingaddress": "470 Mundet PI", "billingstate": "NJ", "billingcountry": "US"})
    
            res = rave.Preauth.charge(payload)
    
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