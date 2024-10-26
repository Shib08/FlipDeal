const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');

app.use(cors());

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal + newItemPrice;
  res.send(result.toString());
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);
  let result;
  if (isMember === 'true') {
    result = cartTotal - (cartTotal * 10) / 100;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * 0.05;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let days;
  if (shippingMethod === 'Standard') {
    days = Math.round(distance / 50);
  } else {
    days = Math.round(distance / 100);
  }
  res.send(days.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let cost = weight * distance * 0.1;
  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * 2).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
