## Split to multiple customers

You can split payments to multiple customers by passing the subaccount IDs of the customers as an array of objects in Flutterwave's payment object which could be an inline function, a hosted payment page or an API endpoint function. You can also specify the ratio in which that payment will be split. For example, if you are splitting the money between three vendors and you don't want them to all get equal amounts you can apply a split ratio of   `2:3:5` .  This will imply that you are splitting the money as 20%, 30%, 50% accordingly and the vendors would be paid as follows:


- The first vendor would get `(2/(2+3+5) x (total amount - rave fees + merchant commission))`.
- The second vendor would get `(3/(2+3+5) x (total amount - rave fees + merchant commission))`.
- The third vendor would get `(5/(2+3+5) x (total amount - rave fees + merchant commission))`.

The subaccounts are created under your account and funds collected for them would be settled into the provided settlement account based on the [settlement cycle](https://support.flutterwave.com/article/153-settlement-schedule). Here's a code sample showing how to split payments between multiple accounts using Rave's inline function:

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
    },
    {
      "id": "RS_B00A5EAB4B6A988A454DEADC2F6262BC",
      "transaction_split_ratio": "3"
    },
    {
      "id": "RS_D43E65859C3138BECD103C4175B4B839",
      "transaction_split_ratio": "5"
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

**Parameters**

| Parameter 	| Required 	| Description 	|
|---------------------------	|------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `id` 	| True <br> (`String`) 	| This is the ID of the subaccount, you can get it from your dashboard e.g. `RS_D43E65859C3138BECD103C4175B4B839` 	|
| `meta` 	| True <br> (`String`) 	| This is the data that describes and gives information about the subaccount 	|
| `transaction_split_ratio` 	|  False <br> (`String`) 	| This is the ratio value representing the share of the amount you intend to give a subaccount. This is only needed when: <br> 1. You are splitting between more than one subaccount. <br>  2. You are not passing the [exact amount](https://developer.flutterwave.com/docs/split-payment#section-passing-the-exact-amount-you-want-a-subaccount-to-receive) you expect the subaccount to get. 	|


**Using percentages as transaction charges**

When setting up your `transaction_charge_type` value as a percentage, you would need to add the percentage value i.e. `transaction_charge` in decimal. e.g. `transaction_charge: 0.09` is equal to a `9%` commission on transactions.
