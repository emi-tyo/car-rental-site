const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const ordersPath = path.join(__dirname, 'data', 'orders.json');
const carsPath = path.join(__dirname, 'data', 'cars.json');


app.post('/save-order', (req, res) => {
  const newOrder = req.body;

  if (!newOrder.id) {
    newOrder.id = Date.now().toString();
  }

  const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
  orders.orders.push(newOrder);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

  res.json({ success: true, id: newOrder.id });
});


app.get('/orders', (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
  res.json(orders);
});


app.post('/confirm-order', (req, res) => {
  const { id } = req.body;

  const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
  const carsData = JSON.parse(fs.readFileSync(carsPath, 'utf-8'));

  const order = orders.orders.find(o => o.id === id);

  if (order) {
    order.status = 'confirmed';

    const carToUpdate = carsData.cars.find(car => car.vin === order.car.vin);
    if (carToUpdate) {
      carToUpdate.available = false;
      fs.writeFileSync(carsPath, JSON.stringify(carsData, null, 2));
    }

    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
    res.json({ success: true, order });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
