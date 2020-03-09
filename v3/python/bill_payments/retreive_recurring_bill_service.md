# Retrieve details of a recurring bill service

When you purchase a recurring bill service, you have the ability to retrieve its details. This is particularly useful for merchants who offer bill payments services in bulk. When users lodge complaints related to a recurring bill, all you need to do is retrieve the details of that bill from Flutterwave and clarify any confusions for your users.

Retrieving the details of a recurrent bill can be done by making a request to Flutterwave's API and specifying the value for the `service` parameter as `fly_recurring` in the request object.

Below is a code sample depicting how to do this:

```python
import requests

url = "https://api.ravepay.co/v2/services/confluence"

querystring = {
    "secret_key": "YOUR_SECRET_KEY",
    "service": "fly_recurring",
    "service_method": "get",
    "service_version": "v1",
    "service_channel": "rave",
}

    headers = {
      'content-type': 'application/json'
    }
    try: res = requests.request("POST", url, headers = headers, params = querystring)
    print(res.text)
    except requests.exceptions.RequestException as e: print(e)

```

### Sample Response

This is a sample response for the `fly_recurring` service when your request is successful:

```JSON
{
    "status": "success",
    "message": "SERVICE-RESPONSE",
    "data": {
        "RecurringPayments": [
            {
                "Id": 5,
                "UniqueReference": "+2349082930030",
                "Amount": 500,
                "DateStarted": "2018-08-24T05:35:18.587Z",
                "DateStopped": null,
                "NextRun": "2018-08-24T06:35:18.587Z",
                "RecurringType": "Hourly"
            }
        ],
        "Status": "success",
        "Message": "successful",
        "Reference": null
    }
}

```

## Recurring bill service parameters

| Parameter         | Required                    | Description                                                                                                                                                                |
| ----------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `secret_key`      | True                        | This is your merchant secret key, please see our section on [API Keys](https://,developer.flutterwave.com/,reference#api-keys-1) to learn how to retrieve your secret key. |  |  |
| `service`         | True                        | This is the bill payment services available e.g. `fly_recurring`                                                                                                           |  |  |
| `service_method`  | True                        | This is the HTTP Method for the required service.                                                                                                                          |  |  |
| `service_version` | True                        | This is the version for the APIs. Set to v1, when a new version is available you would be able to update to a current version.                                             |  |  |
| `service_channel` | True `Expected value: rave` | This is the channel for the service, always use `rave` as the value.                                                                                                       |
