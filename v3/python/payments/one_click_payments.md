## One-click Payments

You can integrate instant one-click payments in Python applications via Rave's inline JS script and a Python framework. This handles all card types (Mastercard, Visa, Verve and Discover) and also takes into account all authentication models (3DSecure, PIN and AVS). Here are the steps necessary to integrate one-click payments in applications built using Django - a popular Python framework.


**1.  Set up a Django Project**


Install Django and set up a project:

```bash

# install Django
$ pipenv install django

# activate the pipenv shell to start a new shell subprocess
$ pipenv shell

(rave-checkout-python) $ django-admin startproject djangorave
(rave-checkout-python) $ python manage.py startapp payments
```

 Add the newly installed app to the  `INSTALLED_APPS`  configuration in  `settings.py`:

```python

    INSTALLED_APPS = [
        'django.contrib',
        'django.contrib.admin',
        'django.contrib .auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    
        #update the newly installed app
        'payments.apps.PaymentsConfig',
    ]

```

Update the  `urls.py`  file in the `djangorave`  project to include the  `payments`  app:

```python

    from django.contrib import admin
    from django.urls import path, include
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', include('payments.urls')), 
    ]

```

Navigate to your terminal and create a homepage where we'll input Rave's inline JS code for our application. In the  `djangorave`  parent folder, create a folder named  `templates`  and in it, your homepage:

```bash

    (rave-checkout-python) $ mkdir templates
    (rave-checkout-python) $ touch templates/homepage.html

```

Update the  `settings.py`  file so Django can access the  `templates`  folder:

```python

    #djangorave/settings.py
    
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': ['templates'], # add this line
            'APP_DIRS': True,
         },
    ]

```

In the  `payments`  app, create a  `views.py`  file where Django class-based and generic views will be used to render the homepage:

```python

    # payments/views.py
    
    from django.views.generic.base import TemplateView
    
    class HomePageView(TemplateView):
        template_name = 'homepage.html'

```

Create a  `urls.py`  in our `payments`  app where we'll assign a path to our view:


    #payments/urls.py
    
    from django.urls import path
    from . import views
    
    urlpatterns = [
        path('', views.HomePageView.as_view(), name='homepage'),
    ]


**2.   Integrate Rave**

To integrate Rave's inline JS, you need to first sign up for a Rave account [here](https://rave.flutterwave.com/signup) . On your dashboard, first switch from live mode to test mode then navigate to  `Settings > API`  and get your API keys:

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576432683/image_preview_kw82bn.png" />

Copy your public and secret keys and paste them at the bottom of your  `settings.py`  file. Be sure to include the inverted commas:

```python
    #settings.py
    
    RAVE_PUBLIC_KEY = 'YOUR PUBLIC KEY HERE'
    RAVE_SECRET_KEY = 'YOUR SECRET KEY HERE'
```

Now, add Rave's [inline script](https://developer.flutterwave.com/docs/rave-inline) to your  `homepage.html` file:

```python

    <form>
      <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
        <h3>THE FASTEST WAY TO RECEIVE PAYMENTS</h3>
        <button type="button" onClick="payWithRave()">Pay Here</button>
    </form>
    <script>
        const publicKey = "{{ key }}";
    
        function payWithRave() {
            var x = getpaidSetup({
                PBFPubKey: publicKey,
                customer_email: "user@example.com",
                amount: 1,
                customer_phone: "234099940409",
                currency: "USD",
                txref: "rave-123456",
                custom_title: "Wildlife Park",
                onclose: function() {},
                callback: function(response) {
                    var txref = response.tx.txRef;
                    console.log("This is the response returned after a charge", response);
                    x.close();
                }
            });
        }
    </script>
```

Open  `payments/views.py`  and update the value of the  `{{ key }}`  attribute assigned to the  `publickey` constant.  It should hold the value of your Rave public key:

```python
    # payments/views.py
    
    from django.conf import settings
    from django.views.generic.base import TemplateView
    
    class HomePageView(TemplateView):
        template_name = 'homepage.html'
    
        def get_context_data(self, **kwargs):
            context = super().get_context_data(**kwargs)
            context['key'] = settings.RAVE_PUBLIC_KEY
            return context
```


**3   Start receiving payments**

Save all changes and run the app in your terminal, it should open in the local address   `http://127.0.0.1:8000/` :

```python

# use the migrate command to sync to your database
(rave-checkout-python) djangorave % python manage.py migrate

# start a local web server with the runserver command
(rave-checkout-python) djangorave % python manage.py runserver
```

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576433112/image_preview_1_jsxysl.png" />

When a user clicks on the  `Pay Here`  button, Rave's payment modal will load and they can use it to make payments into your Rave account:

<img src="https://res.cloudinary.com/fullstackmafia/image/upload/v1576433188/image_preview_2_gfyvqk.png" />
