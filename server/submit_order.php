<?php
header('Content-Type: application/json');

$ordersFile = '../orders.json';

// Get the POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Read existing orders
$ordersData = json_decode(file_get_contents($ordersFile), true);

if (!isset($ordersData['orders'])) {
    $ordersData['orders'] = [];
}

// Create new order
$newOrder = [
    'customer' => [
        'name' => $input['name'],
        'phoneNumber' => $input['phoneNumber'],
        'email' => $input['email'],
        'driversLicenseNumber' => $input['license']
    ],
    'car' => [
        'vin' => $input['vin']
    ],
    'rental' => [
        'startDate' => $input['startDate'],
        'rentalPeriod' => $input['rentalPeriod'],
        'totalPrice' => $input['totalPrice'],
        'orderDate' => date('Y-m-d')
    ]
];

// Add to orders
$ordersData['orders'][] = $newOrder;

// Save back to file
file_put_contents($ordersFile, json_encode($ordersData, JSON_PRETTY_PRINT));

http_response_code(200);
echo json_encode(['success' => true]);
