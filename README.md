![alt text](https://upload.wikimedia.org/wikipedia/en/8/89/Razorpay_logo.svg)
# Razorpay-Node-React-Sample-Kit
This is Sample Coded Kit for Razorpay Standard integration in React.Js and Node.Js as Backend

### `Set-Up`
------
> open terminal or command prompt
> Type **`npm install`** in :file_folder: `lib` after installing all modules run **`node server.js`**
>
> Also do **`npm install`** in :file_folder: `gateway`  after installing all modules run **`npm start`** here

### `Explaination`
------
in :file_folder: `lib` you'll find routes folder in which you'll further find path.js
in that file there's path defined for `post` request named as **`/api/razorpay/create-order`**
and will hit :point_down:
```javascript
CreateOrder: (req, res) => {
        var OrderID;
        var instance = new Razorpay({
            key_id: '<YOUR_KEY_ID>', //you'll find this in settings panel in razorpay dashboard
            key_secret: '<YOUR_SECRET_KEY>' //this one too
        })
        var options = {
            amount: req.body.amount,
            receipt: req.body.receipt,
            currency: "INR",
            payment_capture: '0'
        }
        instance.orders.create(options, function (err, order) {
            res.send(order)
        })
    }
```
Now in this Code simply an instance is generated through razorpay constructor by passing key_id and secret 
which we can use in our further code to add other specifications but here we need to generate an Order Id on which we call our razor pay payment panel because it only be created or say called on every new and unique order id 

and to generate order id we execute `instance.orders.create()` and send the response to front-end which is nothing but reactjs

------

Now in reactjs i've render simply a button and a text box to enter and submit amount to our api
**now here is the code on button click submit** :point_down:
```javascript
RequestOrderPayment = () => {
        let amntTxt = document.getElementById('amount').value
        Axios.post('http://localhost:2024/api/razorpay/create-order', { amount: amntTxt, receipt: "gurkaran_order_54654" })
            .then(response => {
                this.setState({
                    orderID: response.data.id
                })
                var options = {
                    "key_id": "<YOUR_KEY_ID>",
                    "key_secret": "<YOUR_SECRET_KEY>",
                    "amount": amntTxt,
                    "currency": "INR",
                    "name": "Acme Corp",
                    "description": "A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami",
                    "order_id": this.state.orderID,
                    handler: function (response) {
                        alert(response.razorpay_payment_id);
                    },
                    "prefill": {
                        "name": "Gaurav Kumar",
                        "email": "gaurav.kumar@example.com",
                        "contact": "9999999999",
                    },
                    "notes": {
                        "address": "note value",
                    },
                    "theme": {
                        "color": "#F37254"
                    }
                };
                var rzp1 = new window.Razorpay(options)
                rzp1.open();
            })
    }
```
using `axios` we hit the post request to our nodejs server to generate order id and send back to client and we get it in response from promise i.e then, on gettign response we simply just reset or say setState for empty order id to value we get from `response.data.id`
as response is the overall result object giving whole information about success or failure about the request in which `data` is the main response values we need!
so, now on getting order id we generation option object to pass in our Razorpay constructor to open th Standard checkout window!
