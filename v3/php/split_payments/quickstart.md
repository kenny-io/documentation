# Quickstart

This document covers the request implementation examples for all our split payment features. Here, you will find parameter definitions for all the sample requests we'll create for each feature. You will also find the sample responses for each of those requests.

## Sub-accounts
Flutterwave allows you to create multiple sub-accounts that you could then split payments to. You can split these payments individually to separate sub-accounts or to multiple sub-accounts at once. See our [section on sub-accounts](https://developer.flutterwave.com/reference#create-subaccount) to see how to create sub-accounts on Flutterwave.


### Making payments to a sub-account
When you create a sub-account, you can use the sub-account ID to collect payments.
See how to do that on flutterwave below:

##Change snippet to PHP

```javascript
<form>
    <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
    <button type="button" onClick="payWithRave()">Pay Now</button>
</form>

<script>
    const API_publicKey = "YOUR_PUBLIC_KEY";

    function payWithRave() {
        var x = getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: "user@example.com",
            amount: 2000,
            currency: "NGN",
            txref: "rave-123456",
            subaccounts: [
              {
                id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E" // This assumes you have setup your commission on the dashboard.
              }
            ],
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.tx.chargeResponseCode == "00" ||
                    response.tx.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }
</script>
```
The implementation above will make a payment of NGN 2000 to the merchants account through the provided merchant public key. The specified sub-account with the provided `id` will receive a share of this payment according to the  provided percentage specified on the sub-account. 

> For test purposes, you should use our [test bank accounts](https://developer.flutterwave.com/docs/test-bank-accounts) when creating your sub-account. Also remember to pass your test keys, and a test sub-account ID.


### Split payments to multiple sub-accounts
Flutterwave allows you to split payment to multiple sub-accounts under your main account. You can pass the sub-accounts as an array of objects like it was done in the snippet below:

##Change snippet to PHP
```javascript
<form>
    <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
    <button type="button" onClick="payWithRave()">Pay Now</button>
</form>

<script>
    const API_publicKey = "YOUR_PUBLIC_KEY";

    function payWithRave() {
        var x = getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: "user@example.com",
            amount: 2000,
            currency: "NGN",
            txref: "rave-123456",
            subaccounts: [
              {
                id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
		            transaction_split_ratio:"2"
              },
              
              {
                id: "RS_344DD49DB5D471EF565C897ECD67CD95",
                transaction_split_ratio:"3"
              },
              
              {
                id: "RS_839AC07C3450A65004A0E11B83E22CA9",
                transaction_split_ratio:"5"
              }
            ],
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.tx.chargeResponseCode == "00" ||
                    response.tx.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }
</script>

```

The implementation above splits a payment across 3 different sub-accounts at different ratios. You can use the `transaction_split_ratio` to determine what percentage of the transaction goes to which sub-account. Here, the payment is split between 3 sub-accounts at a ratio of 2:3:5 which means you are splitting the payment as 20%, 30%, and 50% to the respective sub-accounts.

### Split payment parameters


| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `id` 	| True 	| This is the ID of the sub-account, you can get it from your dashboard e.g. `RS_D87A9EE339AE28BFA2AE86041C6DE70E`	|
| `transaction_split_ratio` 	| False 	| This is the ratio value representing the share of the amount you intend to give a sub-account.  This is only needed when:
|  	|  	| 1. You are splitting between more than one sub-account.	|
|  	|  	| 2. You are not passing the exact amount you expect the sub-account to get. 	|	|
| `transaction_charge_type` 	| False 	| This represents the type for the commission you would like to charge, if you would like to charge a flat fee pass the value as flat. If you would like to charge a percentage pass the value as percentage. When you pass this, you override the type set as commission when the sub-account was created. 
| | |When you set the value of your `transaction_charge_type` as a percentage, you would need to add the percentage value in decimal. e.g. `transaction_charge: 0.09` is equal to a 9% commission on transactions.
 `transaction_charge` 	| False 	| The flat or percentage value to charge as commission on the transaction. When you pass this, you override the values set as commission when the sub-account was created. 
 | | Except when the value of `transaction_charge_type` is `flat_subaccount` in which case, this becomes the exact amount the sub-account will receive. 	|
 
 
### Testing sub-account payments
> Sub-account Account Numbers on Test environment

> When setting up a sub-account, you would need to use [test account numbers]((https://developer.flutterwave.com/docs/test-bank-accounts)) in the test environment.
Make use of account numbers within the range 0690000021 - 0690000041
Bank: 044 (Access bank).
>
>  You will also need to use your test keys from your dashboard.
