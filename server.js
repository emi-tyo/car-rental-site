const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// 予約を保存
app.post('/save-order', (req, res) => {
  const newOrder = req.body;

  // ここで ID が無かったら追加
  if (!newOrder.id) {
    newOrder.id = Date.now().toString();
  }

  const orders = JSON.parse(fs.readFileSync('orders.json', 'utf-8'));
  orders.orders.push(newOrder);
  fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));

  // 🔥 id を含めてレスポンスを返す！
  res.json({ success: true, id: newOrder.id });
});



// 予約一覧を取得
app.get('/orders', (req, res) => {
  const orders = JSON.parse(fs.readFileSync('orders.json', 'utf-8'));
  res.json(orders);
});

// pending → confirmed にする処理
app.post('/confirm-order', (req, res) => {
  const { id } = req.body;
  const orders = JSON.parse(fs.readFileSync('orders.json', 'utf-8'));
  const order = orders.orders.find(o => o.id === id);

  if (order) {
    order.status = 'confirmed';
    order.car.available = false;
    fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
    res.json({ success: true, order });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
