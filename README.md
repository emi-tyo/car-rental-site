cd C:\xampp\htdocs\car-rental-site
node server.js


# Online Car Rental System

This is a simple online car rental web application built using HTML, CSS, JavaScript, and Node.js.  
It allows users to view available cars, make a reservation, and confirm their booking via a confirmation link.  
All confirmed reservations are stored in a JSON file and displayed in the reservation history.

## Features

- Browse car details (brand, model, price, etc.)
- Make a rental reservation
- Confirmation link system (status changes from `pending` to `confirmed`)
- View reservation history (confirmed orders only)
- Data is persisted in `orders.json`

## Technologies Used

- HTML / CSS / JavaScript (jQuery)
- Node.js (Express)
- JSON files for storing data

## Folder Structure

car-rental-site/
│
├── css/                  # Stylesheet
├── images/               # Logos and car images
├── js/                   # Frontend scripts
│   ├── reservation.js
│   ├── history.js
│   └── ...
├── server/               # Server-side (optional if separated)
│   └── server.js
├── data/                 # cars.json, orders.json, etc.
│
├── index.html            # Home page
├── reservation.html      # Reservation form
├── confirmation.html     # Confirmation page
├── history.html          # Reservation history
├── orders.json           # Reservation data (updated by server)
├── cars.json             # Car data
├── package.json          # Node dependencies
└── README.md             # Project overview



## How It Works

1. User selects a car from the home page.
2. On the reservation form, the user enters personal details and rental info.
3. The reservation is saved to `orders.json` with a status of `pending`.
4. A confirmation link is generated:  
   `confirmation.html?id=UNIQUE_ID`
5. When the user clicks the link, the server updates the status to `confirmed`.
6. Only confirmed reservations are displayed on the `history.html` page.

## How to Run

### 1. Install Dependencies & Start Server

```bash
cd car-rental-site
npm install
node server.js




Make sure `orders.json` exists and is formatted like:

```json
{
  "orders": []
}


### 2. Open the App

Use your browser to open:

http://localhost/car-rental-site/index.html

> Note: Place this folder in your XAMPP `htdocs` if using Apache, and run the Node server for API support.


## Live Demo
[View the Live Site](https://car-rental-site-881s.onrender.com)


## Repository

GitHub: [https://github.com/emi-tyo/car-rental-site](https://github.com/emi-tyo/car-rental-site)


## Deployment

This app can be deployed using:

- [Elastic Beanstalk (AWS)](https://aws.amazon.com/elasticbeanstalk/)
- [Render](https://render.com/)
- [Railway](https://railway.app/)

Ensure both frontend and Node server are properly hosted.

## Author

Emi Sekikawa
Master of IT (Cybersecurity), UTS

## License

This project is licensed under the MIT License.

