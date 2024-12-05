---

# QuickMart

[Live Link](https://mart-client.vercel.app/)

## Introduction

QuickMart is a feature-rich e-commerce platform designed to deliver a seamless online shopping experience for users, vendors, and administrators. It provides a dynamic and intuitive environment where users can effortlessly browse and purchase products, vendors can efficiently manage their shops and inventories, and administrators can maintain full control of the platform. With robust authentication and secure payment integrations, QuickMart ensures a reliable and secure shopping journey. The application’s highlights include advanced product filtering, responsive design, and scalable features such as paginated product listings and order histories. By combining modern technologies like Node.js, Express.js, and MongoDB, QuickMart is built to be scalable, user-friendly, and enterprise-ready, catering to the needs of a growing digital marketplace.

## Project Description

This project focuses on building a dynamic frontend for QuickMart, a feature-rich e-commerce platform designed to cater to the needs of customers, vendors, and administrators. The application delivers an intuitive interface for browsing, filtering, and purchasing products, ensuring a seamless shopping experience. Customers can explore detailed product pages, manage their carts, and make secure payments with ease. Vendors benefit from tools to manage their shops, add products, track orders, and respond to customer reviews, while administrators have full control to oversee platform activities, manage user accounts, and moderate content effectively.

QuickMart's responsive design ensures a smooth and accessible experience across devices, from smartphones to desktops. Advanced features like product comparison, personalized recommendations, and coupon management further enhance usability. Whether you're a casual shopper or a dedicated vendor, QuickMart offers a modern, user-friendly platform tailored for a comprehensive e-commerce experience.

## To test the api here is the admin credentials:

```plaintext
{
  "email": "john@admin.com",
  "password": "admin123"
}
```

## To test the api here is the vendor credentials:

```plaintext
{
  "email": "john@vendor.com",
  "password": "vendor123"
}
```

## To test the api here is the customer credentials:

```plaintext
{
  "email": "john@customer.com",
  "password": "user123"
}
```

## Features

- Authentication and Authorization
- Role based routes
- An Admin can create,update and delete a category from database
- A Vendor can create,update and delete a product from database
- An Admin can manage coupons
- Allows user to filter,search specific product
- Allows user to buy products
- Initiates payment with aamarpay

## Technology Stack

- Programming Language: TypeScript
- Frontend Framework: React (using Vite for build tooling)
- Routing: React Router DOM
- Styling: Tailwind CSS
- UI Components: ShadCN
- Validation Library: Zod
- State Management: Redux Toolkit
- Data Fetching: RTK Query
- State Persistence: Redux Persist
- Animations: Framer Motion
- Payment Method: aamarpay
- Deployment: Vercel

### Prerequisites

- Node.js
- npm(or yarn)

### Installation Steps

**Follow this simple step to clone the project:**

```bash
git clone  https://github.com/GGTuran/QuickMart-client.git
```

**Now install the dependencies of the project:**

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:

```bash

    DATABASE_URL=backend_url

```

## Start the server

**You can run the server in development mode**

```
npm run dev
```

## Project Structure

- **src/**: Contains application source code, including Redux services.
- **components/**: Contains React components.
- **pages/**: Contains React.js pages.
- **redux/**: Contains Redux slices and api.
- **routes/**: Contains all routing.
- **types/**: Contains all type.
- **schemas/**: Contains all schema.

# Usage

## Getting Started

To start using the QuickMart website, follow these steps:

1. **Access the Website**: Navigate to the [QuickMart](https://mart-client.vercel.app/) using your web browser.

2. **Browse Available Products**:

   - On the homepage, you can view a list of available products.
   - Use the search bar to filter products by name, category, or price.

3. **Buy a Product**:
   - Select a Product from the list to view its details.
   - Choose the amount.
   - Click the "Checkout" button to proceed with the booking.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `401 Unauthorized`: Authentication failed or user does not have permissions for the requested operation.
- `403 Forbidden`: Authentication succeeded but authenticated user does not have access to the requested resource.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server..
