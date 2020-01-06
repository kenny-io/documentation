## Testing

To test the split payment feature, it's important to have a checklist of requirements for a test feature to be successful. These include:


1. On your dashboard, your Rave account has to be in test mode.

&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576439509/image_preview_12_g4pybi.png"/>
&nbsp;


2.  You have to use public, secret and encryption test API keys.

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576439509/image_preview_13_pcfc4g.png"/>

 To test for bank transfers, you have to create a test subaccount with one of Rave's test accounts. To do this, you would need to use test account numbers in the test environment. Make use of account numbers within the range `0690000021 - 0690000041`. For a bank code, use  `044` and for bank name, select `Access Bank`.

&nbsp;

<img src='https://res.cloudinary.com/fullstackmafia/image/upload/v1576439716/image_preview_14_xfwpkb.png'/>
&nbsp;


4.  To test for credit card charges, use one of the cards on Rave's list of test cards [here](https://developer.flutterwave.com/docs/test-cards).


5. Your script's URL should be Rave's test URL : 

```python

    "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"

```
