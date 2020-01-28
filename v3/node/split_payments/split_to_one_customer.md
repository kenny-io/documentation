# Split to one customer

You can split payments to one customer by passing the customer's subaccount ID as an object in Rave's inline function:

```javascript
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
                id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E" // This assumes you have setup your commission on the dashboard.
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

Below are the parameters involved when splitting payments to a subaccount:

## Parameters

| Parameter | Required | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | True     | This is the ID of the subaccount, you can |
|           | (String) | get it from your dashboard e.g.           |
|           |          | `RS_D87A9EE339AE28BFA2AE86041C6DE70E`     |
| `meta`    | True     | This is the data that describes and gives |
|           | (String) | information about the subaccount          |
|           |          |                                           |

### Using percentages as transaction charges

<div class="magic-block-callout type-warning">

    When setting up your `transaction_charge_type` value as a percentage, you would need to add the percentage value i.e. `transaction_charge` in decimal. e.g. `transaction_charge: 0.09` is equal to a `9%` commission on transactions.

</div>
