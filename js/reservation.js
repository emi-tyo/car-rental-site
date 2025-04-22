$(document).ready(function () {
  console.log("reservation.js loaded");

  let selectedVin = sessionStorage.getItem("selectedCarVin");
  let selectedCar = null;

  console.log("selectedVin:", selectedVin);

  $.getJSON("data/cars.json", function (data) {
    console.log("cars.json loaded");
    selectedCar = data.cars.find(car => car.vin === selectedVin);
    console.log("selectedCar:", selectedCar);

    if (selectedCar) {
      $("#carInfo").html(`
        <p><strong>${selectedCar.brand} ${selectedCar.carModel}</strong> - $${selectedCar.pricePerDay}/day</p>
        <p>${selectedCar.description}</p>
      `);
      updateFormStatus();  // ← Run after car data loads
    } else {
      $("#carInfo").html("<p>Car not found.</p>");
      $("#reservationFormSection").hide();
    }
  });

  function updateFormStatus() {
    console.log("updateFormStatus called");

    const name = $("#name").val().trim();
    const phone = $("#phone").val().trim();
    const email = $("#email").val().trim();
    const license = $("#license").val().trim();
    const startDate = $("#startDate").val();
    const rentalDays = parseInt($("#rentalDays").val());

    if (selectedCar && rentalDays > 0) {
      const total = selectedCar.pricePerDay * rentalDays;
      $("#totalPrice").text(`$${total}`);
    } else {
      $("#totalPrice").text("$0");
    }

    const isValid = name && phone && email && license && startDate && rentalDays > 0;
    console.log("isValid:", isValid);
    $("#submitBtn").prop("disabled", !isValid);
  }

  $("#reservationForm input").on("input change", updateFormStatus);

  $("#cancelBtn").on("click", function () {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  $("#reservationForm").on("submit", function (e) {
    e.preventDefault();

    const orderData = {
      name: $("#name").val().trim(),
      phone: $("#phone").val().trim(),
      email: $("#email").val().trim(),
      license: $("#license").val().trim(),
      startDate: $("#startDate").val(),
      rentalDays: parseInt($("#rentalDays").val()),
      car: selectedCar,
      total: selectedCar.pricePerDay * parseInt($("#rentalDays").val()),
      status: "pending",
      id: Date.now().toString()  // ← 一意な ID を文字列で生成
    };

    console.log("Sending orderData:", orderData);

    $.ajax({
      url: "http://localhost:3000/save-order",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(orderData),
      success: function (result) {
        if (result.success && result.id) {
          sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
          $("#popupLink").attr("href", `confirmation.html?id=${orderData.id}`);
          $("#popup").fadeIn(); // ← モーダルを表示
        } else {
          alert("Server accepted but did not return ID.");
        }
      }
    });
  });
});
