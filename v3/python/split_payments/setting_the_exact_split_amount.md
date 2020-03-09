## Setting the exact split amount

The default implementation for subaccounts, expects that you pass the value of the total amount to be charged from the customer as a commission and Flutterwave calculates the amount to be sent to the subaccount based on the commission you set up. In a case where it's more than one subaccount, we ask that you pass a split ratio which divides the funds between the subaccounts based on the ratios specified.

Should you want to specify a fixed amount to be passed to a subaccount, we created a payment flow that allows you pass the exact amount you want a customer's subaccount to receive. Here's how it works:

```python

# One Subaccount

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
  "subaccounts": [
  #This assumes you have setup your commission on the dashboard.
  {
    "id": "RS_E5F7B53C26CB9CEAB9C3DD8DECF0B039",
    "transaction_charge": "200",
    "transaction_charge_type": "flat_subaccount"
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

```python

    # Multiple subaccounts

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
      "subaccounts": [
      #This assumes you have setup your commission on the dashboard.
      {
        "id": "RS_E5F7B53C26CB9CEAB9C3DD8DECF0B039",

        "transaction_charge": "200",
        "transaction_charge_type": "flat_subaccount"
      },
    {
        "id": "RS_B00A5EAB4B6A988A454DEADC2F6262BC",
        "transaction_charge": "500",
        "transaction_charge_type": "flat_subaccount"
      }
    ],

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

&nbsp;

### Handling the exact amount your subaccounts receive

As shown in the code sample above, please pass the amount you want your subaccount to get in the `subaccounts` array as `transaction_charge: "{amount}"` and pass the flag that indicates you are specifying the amount you expect the subaccount to receive by adding `transaction_charge_type: "flat_subaccount"`
  
**_PS: We expect that before you specify the amount, you have calculated the transaction processing fee and commission and it has been deducted from the amount specified._**

Thus the subaccounts would get the value you specified in the `transaction_charge` property after any transaction.

## Parameters

| Parameter                 | Required              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                      | True <br> (`String`)  | This is the ID of the subaccount, you can get it from your dashboard e.g. `RS_B00A5EAB4B6A988A454DEADC2F6262BC`                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `meta`                    | True <br> (`String`)  | This is the data that describes and gives information about the subaccount                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `transaction_split_ratio` | False <br> (`String`) | This is the ratio value representing the share of the amount you intend to give a subaccount. This is only needed when: <br> 1. You are splitting between more than one subaccount. <br> 2. You are not passing the [exact amount](https://developer.flutterwave.com/docs/split-payment#section-passing-the-exact-amount-you-want-a-subaccount-to-receive) you expect the subaccount to get.                                                                                                                                                                         |
| `transaction_charge_type` | False <br> (`String`) | This represents the type of commission you would like to charge. If you would like to charge a flat fee pass the value as `flat`. If you would like to charge a fee based on a percentage basis, pass the value as `percentage`. When you pass this you override the type set as commission when the subaccount was created. <br> If you want to pass the [exact amount](https://developer.flutterwave.com/docs/split-payment#section-passing-the-exact-amount-you-want-a-subaccount-to-receive) you expect a subaccount to get, pass the value as `flat_subaccount` |
| `transaction_charge`      | False <br> (`String`) | The flat or percentage value to charge as commission on the transaction. When you pass this, you override the values set as commission when the subaccount was created.                                                                                                                                                                                                                                                                                                                                                                                              |

**Using percentages as transaction charges**

When setting up your `transaction_charge_type` value as a percentage, you would need to add the percentage value i.e. `transaction_charge` in decimal. e.g. `transaction_charge: 0.09` is equal to a `9%` commission on transactions.
