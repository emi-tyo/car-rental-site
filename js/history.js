$(document).ready(function () {
  console.log("📦 history.js loaded");

  $.get("http://localhost:3000/orders", function (data) {
    if (!data || !data.orders) {
      console.error("❌ No order data found.");
      return;
    }

    // ✅ "confirmed" の予約だけ表示する
    const confirmedOrders = data.orders.filter(order => order.status === "confirmed");

    if (confirmedOrders.length === 0) {
      $("#orderList").append(`
        <tr><td colspan="4">No confirmed reservations yet.</td></tr>
      `);
    } else {
      confirmedOrders.forEach(order => {
        $("#orderList").append(`
          <tr>
            <td>${order.name}</td>
            <td>${order.car.brand} ${order.car.carModel}</td>
            <td>${order.rentalDays}</td>
            <td>$${order.total}</td>
          </tr>
        `);
      });
    }
  }).fail(function (err) {
    console.error("❌ Failed to load orders:", err);
    $("#orderList").append(`
      <tr><td colspan="4">Error loading reservation history.</td></tr>
    `);
  });
});
