## Split to one customer

You can split payments to one customer by passing the customer's subaccount ID as an object in Rave's Python SDK:

```python

    from rave_python
    import Rave, Misc, RaveExceptions
    
    rave = Rave("<YOUR PUBLIC KEY>", "<YOUR SECRET KEY>", usingEnv = False)
    
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
        "id": "RS_E5F7B53C26CB9CEAB9C3DD8DECF0B039",
        "transaction_split_ratio": "2"
      }],
    
      "meta": [{
        "metaname": "storeID",
        "metavalue": "AP1234"
      }]
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

Below are the parameters involved when splitting payments to a subaccount:

## Parameters

| Parameter 	| Required 	| Description 	|
|---------------------------	|------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `id` 	| True <br> (`String`) 	| This is the ID of the subaccount, you can get it from your dashboard e.g. `RS_D43E65859C3138BECD103C4175B4B839` 	|
| `meta` 	| True <br> (`String`) 	| This is the data that describes and gives information about the subaccount 	|

**Using percentages as transaction charges**

When setting up your `transaction_charge_type` value as a percentage, you would need to add the percentage value i.e. `transaction_charge` in decimal. e.g. `transaction_charge: 0.09` is equal to a `9%` commission on transactions.
