# Setting exact split amount

The default implementation for sub-accounts, expects that you pass the value of the total amount to be charged from the customer as a commission and Rave calculates the amount to be sent to the sub-account based on the commission you set up. In a case where it's more than one sub-account, we ask that you pass a split ratio which divides the funds between the sub-accounts based on the ratios specified.

Should you want to specify a fixed amount to be passed to a sub-account, we created a payment flow that allows you to pass the exact amount you want a sub-account to receive.

## Pass exact split amount to a sub-account
In cases where you want to pass an exact split amount to a sub-account, you need to specify that amount as the value of your `transaction_charge` in the `subaccounts[]` array. Here's a sample implementation:

##Change snippet to PHP
```javascript
// Sending fixed amount to a single sub-account
    
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
                id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E", // This assumes you have setup your commission on the dashboard.
                transaction_charge: 1500,
                transaction_charge_type: "flat_subaccount"
              }
            ],
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.tx.txRef; // collect flwRef returned and pass to                                                a server page to complete status check.
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
> Notice that the `transaction_charge_type` has a value of `flat_subaccount` which specifies that the value of `transaction_charge` is the exact value we want the sub-account to receive. In this case, we expect that before you pass that amount to us, you would have calculated both the transaction processing fee and commission and deducted it from the final amount you pass.

## Pass exact split amount to multiple sub-accounts
When splitting payment to multiple sub-accounts, Flutterwave makes it possible to specify exactly how much each sub-account should receive for every transaction. Here's a sample implementation:

##CHange snippet to PHP
```javascript
// Sending fixed amount to multiple sub-accounts

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
                transaction_charge_type: "flat_subaccount",
                transaction_charge: "1000"
              },
              
              {
                id: "RS_344DD49DB5D471EF565C897ECD67CD95",
                transaction_charge_type: "flat_subaccount",
                transaction_charge: "100"
              },
              
              {
                id: "RS_839AC07C3450A65004A0E11B83E22CA9",
                transaction_charge_type: "flat_subaccount",
                transaction_charge: "400"
              }
            ],
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.tx.txRef; // collect flwRef returned and pass to                                                a server page to complete status check.
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

In the example above we assume that you have calculated the total amount for each sub-account and have substracted the processing and commission fees. From the implementation above, the sub-accounts would get what you passed as  `transaction_charge` after any transaction. Hence, 1000, 100 and 400 respectively. 