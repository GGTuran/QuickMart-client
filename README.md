
---

# Home Of Bikes 



[Live Link](https://home-of-bikes.vercel.app/)

## To test the api here is the admin credentials:



```plaintext
{
  "email": "john@admin.com",
  "password": "admin123"
}
```



## To test the api here is the user credentials:

```plaintext
{
  "email": "john@user.com",
  "password": "user123"
}
```


## Introduction
This frontend application is designed to support a bike rental platform, offering a seamless and engaging experience for users looking to rent bikes. It provides a visually appealing and intuitive interface with user-friendly navigation, ensuring an easy and efficient process for browsing, selecting, and renting bikes. The responsive design and interactive features make it accessible across all devices, catering to both casual riders and biking enthusiasts. Administrators have access to robust tools for managing bike availability, bookings, user accounts, and payment processing, making it a comprehensive solution for running a bike rental business smoothly and effectively.

## Project Description

This project focuses on creating a dynamic frontend application for a bike rental platform. The application is designed to provide users with an engaging and intuitive interface for browsing, selecting, and renting bikes. With features like real-time bike availability, easy booking management, and secure payment options, it aims to deliver a seamless and enjoyable rental experience for both casual riders and biking enthusiasts. The responsive design ensures that users can access and navigate the platform effortlessly across various devices, from smartphones to desktops. Administrators are equipped with powerful tools to manage bike inventory, track bookings, handle user accounts, and process payments efficiently. This solution is ideal for businesses looking to offer a modern, user-friendly bike rental service that meets the needs of a diverse customer base.

## Features

- Authentication and Authorization
- Role based routes
- An Admin can create,update and delete a bike from database
- An Admin can manage coupons
- Allows user to filter,search specific bike
- Allows user to rent bikes  
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
git clone  https://github.com/GGTuran/bike-rental-service-client
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

To start using the Bike Rental website, follow these steps:

1. **Access the Website**: Navigate to the [Bike Rental website](https://home-of-bikes.vercel.app) using your web browser.

2. **Browse Available Bikes**:
   - On the homepage, you can view a list of available bikes.
   - Use the search bar to filter bikes by name, brand, or model.
   - Apply filters to refine your search based on bike type, availability, and more.

   

3. **Rent a Bike**:
   - Select a bike from the list to view its details.
   - Choose the rental start and end times.
   - Click the "Rent Now" button to proceed with the booking.







## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `401 Unauthorized`: Authentication failed or user does not have permissions for the requested operation.
- `403 Forbidden`: Authentication succeeded but authenticated user does not have access to the requested resource.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server..
