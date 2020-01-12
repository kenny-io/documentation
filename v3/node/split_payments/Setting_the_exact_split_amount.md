# Setting the exact split amount

The default implementation for subaccounts, expects that you pass the value of the total amount to be charged from the customer as a commission and Rave calculates the amount to be sent to the subaccount based on the commission you set up. In a case where it's more than one subaccount, we ask that you pass a split ratio which divides the funds between the subaccounts based on the ratios specified.

Should you want to specify a fixed amount to be passed to a subaccount, we created a payment flow that allows you pass the exact amount you want a customer's subaccount to receive. Here's how it works:

```javascript
    // One Subaccount
    
    <form>
        <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
        <button type="button" onClick="payWithRave()">Pay Now</button>
    </form>
    
    <script>
        const API_publicKey = "<ADD YOUR PUBLIC KEY HERE>";
    
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
                    transaction_charge: 1980,
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

```javascript
// Multiple subaccounts

<form>
    <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
    <button type="button" onClick="payWithRave()">Pay Now</button>
</form>

<script>
    const API_publicKey = "<ADD YOUR PUBLIC KEY HERE>";

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

<div class="magic-block-callout type-info">

 ###   Handling the exact amount your subaccounts receive

    As shown in the code sample above, please pass the amount you want your subaccount to get in the `subaccounts` array as `transaction_charge: "{amount}"` and pass the flag that indicates you are specifying the amount you expect the subaccount to receive by adding `transaction_charge_type: "flat_subaccount"`
    
    _PS: We expect that before you specify the amount, you have calculated the transaction processing fee and commission and it has been deducted from the amount specified._
</div>

Thus the subaccounts would get the value you specified in the  `transaction_charge` property after any transaction.

# Parameters

                                                                                              
| Parameter                         | Required                  | Description                               |    
| :------------------------------   | :--------------------     | :---------------------------------------- |
| ```id```                          | True                      | This is the ID of the subaccount, you can |
|                                   | (```String```)            | get it from your dashboard e.g.           |
|                                   |                           | RS_D87A9EE339AE28BFA2AE86041C6DE70E       |
|meta                               | True                      | This is the data that describes and gives |
|                                   | (```String```)            | information about the subaccount          |
|```transaction_split_ratio```      | False                     | This is the ratio value representing the  | 
|                                   | (`String`)                | share of the amount you intend to give a  |  |                                   |                           | subaccount. This is only needed when:     |
|                                   |                           | 1. You are splitting between more than    |
|                                   |                           |    one subaccount.                        |
|                                   |                           | 2. You are not passing the exact amount   |
|                                   |                           |    you expect the subaccount to get.      |
|```transaction_charge_type```      | False                     | This represents the type of commission    |
|                                   |                           | you would like to charge.                 |
|                                   |                           | 1. If you would like to charge a flat     |
|                                   |                           |    fee pass the value as `flat`.          |
|                                   |                           | 2. If you would like to charge a fee      |
|                                   |                           |    based on a percentage basis, pass      |
|                                   |                           |    the value as `percentage`.             |
|                                   |                           |                                           |
|                                   |                           |    When you pass this you override the    |
|                                   |                           |    type set as commission when the        |
|                                   |                           |    subaccount was created.                |
|                                   |                           |    If you want to pass the exact amount   |
|                                   |                           |    you expect a subaccount to get pass    |
|                                   |                           |    the value as `flat_subaccount`         |
|                                   |                           |                                           |