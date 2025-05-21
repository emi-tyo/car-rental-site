# Online Car Rental System

This is a simple online car rental web application built using HTML, CSS, JavaScript, and Node.js.  
Users can browse available cars, make a reservation, and confirm their booking via a link.  
All confirmed reservations are saved in a JSON file and displayed in the reservation history.


## Features

- Browse car details (brand, model, price, etc.)
- Filter cars by brand and type
- Search bar with live suggestions
- Make a rental reservation
- Confirmation link system (status changes from `pending` to `confirmed`)
- View reservation history (confirmed orders only)
- Data is persisted in `orders.json`


## Technologies Used

- Frontend: HTML / CSS / JavaScript (jQuery)
- Backend: Node.js (Express)
- Data Storage: JSON files (`cars.json`, `orders.json`)


## Folder Structure

car-rental-site/
│
├── css/                  # Stylesheets
├── images/               # Logos and car images
├── js/                   # Frontend scripts
│   ├── reservation.js
│   └── history.js
├── data/                 # JSON data files (cars and orders)
├── index.html            # Home page
├── reservation.html      # Reservation form
├── confirmation.html     # Confirmation page
├── history.html          # Reservation history
├── server.js             # Node.js server script
├── package.json          # Node dependencies
└── README.md             # This file


## How It Works

1. User selects a car from the home page.
2. On the reservation form, the user enters personal and rental details.
3. The reservation is saved to `orders.json` with status `"pending"`.
4. A confirmation link is generated:

confirmation.html?id=UNIQUE\_ID
5. When the user clicks the link, the reservation status becomes `"confirmed"`.
6. Only confirmed reservations are displayed in `history.html`.


## How to Run Locally

### 1. Start the Backend Server

```bash
cd car-rental-site
npm install
node server.js
````

Make sure `orders.json` exists and is initially empty:

```json
{
  "orders": []
}
```

### 2. Open the App in Browser

Access the app via Apache (e.g., XAMPP) using:

http://localhost/car-rental-site/index.html


> Note: Place the `car-rental-site` folder inside your XAMPP `htdocs` directory. Run Node server for API support.


## Demo Video

You can view the demo video here: 
[▶ Watch Demo](https://github.com/emi-tyo/car-rental-site/raw/main/assets/demo.mp4)


## Repository

GitHub: [https://github.com/emi-tyo/car-rental-site](https://github.com/emi-tyo/car-rental-site)


## Deployment Options

This app can be deployed using:

* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
* [Render](https://render.com/)
* [Railway](https://railway.app/)

> Make sure to deploy both the frontend and Node server properly.


## Author
Emi Sekikawa
Master of IT (Cybersecurity), UTS


## License

This project is licensed under the MIT License.
