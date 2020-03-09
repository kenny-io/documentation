## Checklist for going live

When you're done integrating Rave, you need to check all important boxes  to ensure that nothing hinders your application from going live. Below is a list of important factors to be considered before going live:

**Use live API keys**

When integrating Rave on your app, you'll use a public test API key initially. should you have to carry out server-side operations you'll also use a secret test API key as well. Before going live, you must update your app to use the live version of these keys. You can find your live API keys on the Rave dashboard by ensuring that the  `Test mode`  toggle is turned off and navigating to  `Settings > API`

&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576475942/image_preview_17_pv0xst.png"/>

&nbsp;

**Create subaccounts, payment links and payment plans in live mode**

Subaccounts, payment links and payment plans are configured separately in test mode and in live mode thus any links or plans that were created while in test mode should be recreated in live mode if they are going to be used on the app. 

**Create webhooks in live mode**

If the payment flow of your app is going to have asynchronous payment methods, you'll need to use webhooks that can receive completed events. Webhook endpoints are configured separately for test mode and live mode, so any webhook that was created in test mode will need to be reconfigured in live mode before launching your app. To configure webhooks in live mode, ensure that the  `Test mode`  toggle on your Rave dashboard is turned off and that you're viewing endpoints in live mode.

&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576476084/image_preview_18_he1zcp.png"/>

&nbsp;

**Use real bank accounts**

When integrating Rave, you'll do a lot of test transactions with Rave's [test bank accounts](https://developer.flutterwave.com/docs/test-bank-accounts). Ensure you switch to real bank accounts once you are ready to go live with your application. To add a bank account, make sure that the  `Test mode`  toggle is turned off and navigating to  `Settings > Bank accounts`  and click on the  `+ Add New Bank`  button:

&nbsp;

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576476229/image_preview_19_bchnl6.png"/>

&nbsp;
