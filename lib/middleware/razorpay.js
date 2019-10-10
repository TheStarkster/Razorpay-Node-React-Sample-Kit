const Razorpay = require('razorpay')
module.exports = {
    CreateOrder: (req, res) => {
        var OrderID;
        var instance = new Razorpay({
            key_id: 'rzp_test_hcBEyLK2rKpWkS',
            key_secret: 'AilD2hmREnc2HEDIuIBYzu6O'
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
}