# Subscription-Based Food Ordering Platform

A full-stack subscription-based food ordering application developed using the MERN Stack. The platform allows users to subscribe to dynamic daily meal plans for different durations such as 1 day, 7 days, 15 days, and 30 days with automatic discount calculations for long-term subscriptions.

The application includes role-based authentication using sessions and cookies, secure online payments with Razorpay, cart management, live order tracking, and an admin dashboard for managing menus, subscriptions, users, and orders.

Tailwind CSS was used for responsive and modern UI design.

---

# Features

## User Features

- User registration and login
- Session & cookie-based authentication
- Browse and filter food menus
- Add items to cart
- Subscription-based meal ordering
- Dynamic pricing and discount system
- Secure online payment integration
- Order history and profile management
- Live order tracking

### Order Status
- Preparing
- Out for Delivery
- Delivered

---

## Admin Features

- Admin dashboard with analytics cards and tables
- Add, update, and delete menus
- Manage cuisines and meal categories
- Upload food images using multer
- Manage users and subscriptions
- Update delivery status
- View monthly/yearly sales data
- Monitor orders and recent activities

### Dashboard Analytics
- Total Users
- Total Products/Menu Items
- Total Orders
- Monthly Sales
- Yearly Revenue
- Average Sales

---

# Subscription Pricing Logic

The platform supports flexible subscription plans with dynamic discounts.

| Plan | Discount |
|------|-----------|
| 1 Day | No Discount |
| 7 Days | Small Discount |
| 15 Days | Higher Discount |
| 30 Days | Maximum Discount |

The final amount is calculated dynamically in the backend before payment processing.

---
## Demo Video

https://github.com/user-attachments/assets/7d6ee13a-cfb6-4480-a737-e91af15ae049

---
## Live Project

Experience the Live Application

### Frontend
https://subscription-based-food-ordering-pl.vercel.app

### Backend API
https://subscription-based-food-ordering-platform.onrender.com

> Note: Backend may take a few seconds to respond initially because it is hosted on Render free tier.

---
# Tech Stack

## Frontend
- React.js
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Authentication
- Sessions
- Cookies
- Role-Based Access Control

## Payment Gateway
- Razorpay

---

# Backend Functionalities

- REST APIs
- CRUD Operations
- GET, POST, PUT, PATCH, DELETE methods
- Dynamic pricing calculations
- Cart management
- Order management system

---

# Additional Features

- Dynamic daily food menu management
- Subscription-based pricing model
- Discount calculation for long-term plans
- Real-time order status updates
- Secure authentication and authorization
- Admin analytics dashboard
- Multer image uploads

---

# Installation

## Clone Repository

```bash
git clone https://github.com/SujiPrasanth/Subscription-Based-Food-Ordering-Platform.git
```

## Navigate to Project Folder

```bash
cd project-folder
```

## Install Dependencies

```bash
cd backend
npm install
```

---

# Run Frontend

```bash
npm run dev
```

# Run Backend

```bash
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection
PORT=your_Port_address
SESSION_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

---

# Future Improvements

- Email notifications
- Reviews and ratings
- Delivery tracking
- Invoice generation
- Advanced analytics charts
- Cloudinary image storage

---

# Author

Suji Prasanth
