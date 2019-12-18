## Card Encryption

You may need to encrypt charge requests when calling APIs. Rave uses Triple Data Encryption Standard (3DES) to handle cases where encryption is needed. Implementation of this encryption is broken down into two parts:

1. The `getKey()` function which generates the encryption key to be used by hashing the secret key of your Rave account using an `md5` algorithm then picking a `substring` which is the last 12 digits of the hashed key. Then, you would strip your secret key of its prefix (`FLWSECK-`) and get the first 12 digits after the prefix. Combine this with the last 12 digits of your hashed key to get your encryption key.
2. The encryption function, which uses the `3DES` algorithm method. The `data` object to be passed along with the key is the payment request data in  `String`  format. 

```python

import os, hashlib, warnings, requests, json
import base64
from Crypto.Cipher
import DES3

class PayTest(object):

# This is the getKey function that generates an encryption Key for you by passing your Secret Key as a parameter."

def __init__(self):
  pass

def getKey(self, secret_key):
  hashedseckey = hashlib.md5(secret_key.encode("utf-8")).hexdigest()
hashedseckeylast12 = hashedseckey[-12: ]
seckeyadjusted = secret_key.replace('FLWSECK-', '')
seckeyadjustedfirst12 = seckeyadjusted[: 12]
return seckeyadjustedfirst12 + hashedseckeylast12

# This is the encryption function that encrypts your payload by passing the text and your encryption Key."

def encryptData(self, key, plainText):
  blockSize = 8
padDiff = blockSize - (len(plainText) % blockSize)
cipher = DES3.new(key, DES3.MODE_ECB)
plainText = "{}{}".format(plainText, "".join(chr(padDiff) * padDiff))

# cipher.encrypt - the C function that powers this doesn 't accept plain string, rather it accepts byte strings, hence the need for the conversion below

test = plainText.encode('utf-8')
encrypted = base64.b64encode(cipher.encrypt(test)).decode("utf-8")
return encrypted
```

Next, encrypt your payload:

```python

    def pay_via_card(self):
      payload = {
        "PBFPubKey": "YOUR PUBLIC KEY",
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
        "txRef": "MC-7666-YU"
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      }
    sec_key = 'YOUR SECRET KEY'
    
    # hash the secret key with the get hashed key
    function
    hashed_sec_key = self.getKey(sec_key)
    
    # encrypt the hashed secret key and payment parameters with the encrypt
    function
    
    encrypt_3DES_key = self.encryptData(hashed_sec_key, json.dumps(payload))
    
    # encrypted payload
    encrypted_payload = {
      "PBFPubKey": "YOUR PUBLIC KEY",
      "client": encrypt_3DES_key,
      "alg": "3DES-24"
    }
    
    res = rave.Card.charge(encrypted_payload)
    print(res)
    
    rave = PayTest()
    rave.pay_via_card()

```