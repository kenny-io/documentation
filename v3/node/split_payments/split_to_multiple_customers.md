# Split to multiple customers

You can split payments to multiple customers by passing the subaccount IDs of the customers as an array of objects in Rave's inline function. You can also specify the ratio in which that payment will be split. For example, if you are splitting the money between three vendors and you don't want them to all get equal amounts you can apply a split ratio of `2:3:5` . This will imply that you are splitting the money as 20%, 30%, 50% accordingly and the vendors would be paid as follows:

- The first vendor would get `(2/(2+3+5) x (total amount - rave fees + merchant commission))`.
- The second vendor would get `(3/(2+3+5) x (total amount - rave fees + merchant commission))`.
- The third vendor would get `(5/(2+3+5) x (total amount - rave fees + merchant commission))`.

The subaccounts are created under your account and funds collected for them would be settled into the provided settlement account based on the [settlement cycle](https://support.flutterwave.com/article/153-settlement-schedule). Here's a code sample showing how to split payments between multiple accounts using Rave's inline function:

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

Below are the parameters involved when splitting payments to multiple subaccounts:

## Parameters

| Parameter                 | Required | Description                               |
| :------------------------ | :------- | :---------------------------------------- |
| `id`                      | True     | This is the ID of the subaccount, you can |
|                           | (String) | get it from your dashboard e.g.           |
|                           |          | `RS_D87A9EE339AE28BFA2AE86041C6DE70E`     |
| `meta`                    | True     | This is the data that describes and gives |
|                           | (String) | information about the subaccount          |
| `transaction_split_ratio` | False    | This is the ratio value representing the  |
|                           | (String) | share of the amount you intend to give a  |  |  |  | subaccount. This is only needed when: |
|                           |          |                                           |
|                           |          | 1. You are splitting between more than    |
|                           |          | one subaccount.                           |
|                           |          | 2. You are not passing the exact amount   |
|                           |          | you expect the subaccount to get.         |
|                           |          |                                           |

### Using percentages as transaction charges

<div class="magic-block-callout type-warning">
   
    When setting up your `transaction_charge_type` value as a percentage, you would need to add the percentage value i.e. `transaction_charge` in decimal. e.g. `transaction_charge: 0.09` is equal to a `9%` commission on transactions.

</div>
