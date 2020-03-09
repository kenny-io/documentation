## DashBoard Management

**Creating a subaccount**

Rave's subaccount feature lets you create one or multiple subaccounts which can receive split transactions. This is great for merchants who act as middlemen for other vendors and applications that require any form of multiple payment disbursement.  To create a subaccount, head on to your dashboard, on the sidebar click on **Subaccounts** and then click on **New Subaccount**:

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576435493/image_preview_3_fmloaj.png" />

You'll be shown a form. Input your details similar to the template below:

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576435574/image_preview_4_fh9emn.png" />

Alternatively you can use Rave's API to create a subaccount. Here's the request format you'll make to Rave's API endpoint:

```python

from rave_python import Rave
from rave_python import RaveExceptions

rave = Rave("<YOUR PUBLIC KEY>", "YOUR SECRET KEY", usingEnv = False)

payload = {
    "country":"Nigeria",
    "account_bank": "221",
    "account_number": "0017851243",
    "business_name": "Raphael Ugwu",
    "business_email": "ugwuraphael@gmail.com",
    "business_contact": "Chukwuka Ugwu",
    "business_contact_mobile": "08083721998",
    "business_mobile": "08168417844",
    "split_type": "flat",
    "split_value": 50,
    "meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]
}

try:
    res = rave.SubAccount.createSubaccount(payload)
    print(res)
except RaveExceptions.SubaccountCreationError as e:
    print(e.err["errMsg"])
    print(e.err["flwRef"])
```

A sample response for this call is:

```python

{
  'data': {
    'bank_name': 'STANBIC IBTC BANK',
    'account_id': 80723,
    'account_bank': '221',
    'country': 'Nigeria',
    'split_value': 50,
    'split_type': 'flat',
    'meta': [{
      'metaname': 'MarketplaceID',
      'metavalue': 'ggs-920900'
    }],
    'subaccount_id': 'RS_68B607B6EAF4FCA7DB357A4722DCD8E8',
    'account_number': '0017851243',
    'date_created': '2019-11-05T15:37:57.000Z',
    'business_name': 'Raphael Ugwu',
    'fullname': 'Raphael Ugwu',
    'id': 1840,
    'split_ratio': 1
  },
  'id': 1840,
  'error': False
}
```

**Viewing your subaccount**

You can view the newly created subaccount on your dashboard by clicking on  **Subaccounts** : 

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576435720/image_preview_5_of5rcf.png" />


