
## Introduction
    Welcome to the Next.js E-commerce Project! This application is designed to provide a seamless shopping experience by showcasing a variety of products. Users can browse products, filter by categories, search for specific items, view detailed product information, and submit reviews. The application leverages Firebase for real-time data management and user authentication.

# Technologies Used
**Next.js:** A powerful React framework for building server-rendered applications and static websites.
**React:** A JavaScript library for building user interfaces.
**Firebase:** A cloud-based platform that provides various services, including Firestore for database management and Firebase Authentication for user management.
**Tailwind CSS:** A utility-first CSS framework for designing modern web applications.
**JavaScript:** The programming language used for the application logic.

## Setup Instructions

To set up this project locally, follow these steps:

1. Clone the Repository:

2. Install Dependencies: Make sure you have Node.js installed. Then, run:

3. npm install

## Set Up Firebase:

# Create a Firebase project at Firebase Console.
# Enable Firestore and Firebase Authentication.
Copy your Firebase configuration details into a new file named firebaseConfig.js in the root directory:
javascript


// firebaseConfig.js
const firebaseConfig = {
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBY9HapebuAaMYSndYtYs_m55qlhq-DTp8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=next-ecommerce-ddbcc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=next-ecommerce-ddbcc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=next-ecommerce-ddbcc.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=785743885572
NEXT_PUBLIC_FIREBASE_APP_ID=1:785743885572:web:bee1c772c87d3fb2c28c51
};

export default firebaseConfig;
Run the Application:


4. npm run dev
Open your browser and navigate to http://localhost:3000.

# Usage

## Navigating the Application

**Home Page:** Displays a grid of products.
**Product Detail Page:** Click on a product to view its details, including images, price, stock information, and reviews.
**Search Bar** Use the search functionality to find specific products.
**Category Filter:** Filter products based on categories.
**Reviews:** Users can submit reviews, which can be sorted and paginated.

Example
To add a product review:

    Go to a product detail page.
    Fill in your name, rating, and review comment.
    Click "Submit Review" to add it.
    Components Overview
    This project consists of several components, each serving a specific purpose:

**ProductGrid:** Displays a grid of products fetched from Firestore.
**ProductsClient**: Manages product fetching, filtering, searching, and pagination.
**ProductDetail:** Displays detailed information about a selected product, including images, price, and reviews.
**Searchbar:** Allows users to search for products by name.
**CategoryFilter:** Enables filtering products by category.
**SortOptions:** Provides sorting functionality for product lists.
**Pagination:** Handles pagination of product listings and reviews.
**Navbar:** Displays navigation links and authentication options.
Each component is designed to be reusable and modular, ensuring a clean and maintainable codebase.

[vercel](https://fsj-portfolio-piece-chrtsh-528-jse-2407-group-a-chri-rl1eh5kun.vercel.app/)

## License
This project is licensed under the MIT License.