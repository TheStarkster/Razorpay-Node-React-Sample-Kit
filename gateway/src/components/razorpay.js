import React, { Component } from 'react'
import Axios from 'axios'

class RazorPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderID: ""
        }
    }
    RequestOrderPayment = () => {
        let amntTxt = document.getElementById('amount').value
        Axios.post('http://localhost:2024/api/razorpay/create-order', { amount: amntTxt, receipt: "gurkaran_order_54654" })
            .then(response => {
                this.setState({
                    orderID: response.data.id
                })
                var options = {
                    "key_id": "rzp_test_hcBEyLK2rKpWkS",
                    "key_secret": "AilD2hmREnc2HEDIuIBYzu6O",
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
    render() {
        return (
            <div>
                <input type="number" className="" id="amount" placeholder="Enter Amount To Be Paid"></input>
                <button id="rzp-button1" onClick={() => this.RequestOrderPayment()}>Pay</button>
            </div>
        )
    }
}
export default RazorPanel;
