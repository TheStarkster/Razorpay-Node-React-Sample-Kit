const router = require('express').Router();
const handlers = require('../middleware/razorpay');

router.post('/api/razorpay/create-order', (req, res) => handlers.CreateOrder(req,res));

module.exports = router;