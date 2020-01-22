# Processing Transaction Charges
When setting up payments to sub-accounts on Flutterwave, you decide how you want to process your commissions from the transactions carried out on those sub-accounts. Basically there are two ways to do that: 

1. Using percentage 
2. Using flat
3. Using flat_subaccount

### Using `percentage` as transaction charges

To charge a percentage commission from the transactions of a sub-account, you need to set your `transaction_charge_type` value as `percentage` in the `subaccount` array. To set the value of the commision (in percentage) that you want to charge, you'll need to pass the value as a decimal. Example: `transaction_charge: 0.09` is equal to a 9% commission on transactions. Here's a sample implementation:

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
            amount: 20000,
            currency: "NGN",
            txref: "rave-123456",
            subaccounts: [
              {
	            id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
	            transaction_split_ratio:"2",
	            transaction_charge_type: "percentage",
	            transaction_charge: "0.09"
              },              
              {
                id: "RS_344DD49DB5D471EF565C897ECD67CD95",
                transaction_split_ratio:"3",
                transaction_charge_type: "percentage",
                transaction_charge: "0.09"
              },              
              {
                id: "RS_839AC07C3450A65004A0E11B83E22CA9",
                transaction_split_ratio:"5",
                transaction_charge_type: "percentage",
                transaction_charge: "0.09"
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

From the example above, this marketplace owner would earn a 9% commission, Flutterwave would deduct it's configured fee and the remaining amount would be split between the 3 sub-accounts according to the specified ratios.
### Using `flat` as transaction charges
Flutterwave makes it possible for you to charge a flat fee for your commissions on your vendors sub-accounts. To do so, you need to set your `transaction_charge_type` value as `flat` in the `subaccount` array. 

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
            amount: 20000,
            currency: "NGN",
            txref: "rave-123456",
            subaccounts: [
              {
                id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
                transaction_split_ratio:"2",
                transaction_charge_type: "flat",
                transaction_charge: "100"
              },
              {
                id: "RS_344DD49DB5D471EF565C897ECD67CD95",
                transaction_split_ratio:"3",
                transaction_charge_type: "flat",
                transaction_charge: "100"
              },
              {
                id: "RS_839AC07C3450A65004A0E11B83E22CA9",
                transaction_split_ratio:"5",
                transaction_charge_type: "flat",
                transaction_charge: "100"
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
From the example above, this marketplace owner would a commission of NGN300, Flutterwave would deduct it's configured fee and the remaining amount would be split between the 3 sub-accounts according to the specified ratios.

| Parameter 	| Required 	| Description 	|
|-----------------	|----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `id` 	| True 	| This is the ID of the sub-account, you can get it from your dashboard e.g. `RS_D87A9EE339AE28BFA2AE86041C6DE70E`	|
| `transaction_split_ratio` 	| False 	| This is the ratio value representing the share of the amount you intend to give a sub-account. 
| `transaction_charge_type` 	| False 	| This is the of the commission you would like to charge. The value could be:
|||`'percentage'` - If you would like to charge your commission as a percentage of the paid amount on your sub-account transactions.
|||`'flat'` If you would like to charge your commission as a percentage of the paid amount on your sub-account transactions 
`transaction_charge` 	| False 	| The `flat` or ``percentage` value to charge as commission on the transaction. When you pass this, you override the values set as commission when the sub-account was created. 
### Using `flat` as transaction charges
The `flat_subaccount` flag gives you more autonomy on handling the amount you expect your marketplace vendors (sub-account) to receive. See our section on [setting exact split amounts for this implementation]().