# Authentication, Product Uploading, email notification and create variant

This project provides a basic API for user authentication and product management using Node.js, Express.js, and MongoDB. It includes endpoints for user sign-up, sign-in, and product operations.

## Features

- **User sign-up** and **sign-in** with JWT authentication

- **Product Management**: Create and manage product details including name, category, code, description, size, wood type, finish type, and price.
- **Retrieve Products**: Fetch a list of all products.
- **Create variant**: Add a variant to an existing product.
- **Show variant**:Display detailed information about the main product and its variants.
- **Send Notifications via email**


# User API Endpoints 

## User Endpoints

### Sign Up
- **URL:** `http://localhost:6000/api/user/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }


### Sign In

 **URL:** `http://localhost:6000/api/user/signin`

**Method:** `POST`

**Description:** Authenticate a user and return a JWT token.

**Request Headers:**
- Content-Type: `application/json`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
# Product API Endpoint

## Upload a Product
### Product 
- **URL:** `http://localhost:6000/api/product`
- **Method:** `POST`


### Form Data
The request must be sent as `form-data` and include the following fields:

- **productName** (string, required): The name of the product.
- **productCategory** (string, required): The category of the product.
- **productCode** (string, required): A unique code for the product.
- **smallDescription** (string, required): A brief description of the product.
- **detailedDescription** (string, required): A detailed description of the product.
- **productSize** (string, required): The size of the product.
- **productWoodType** (string, required): The type of wood used for the product.
- **finishType** (string, required): The type of finish applied to the product.
- **productPrice** (number, required): The price of the product.
- **images** (file, multiple, up to 10 files): Upload one or more image files of the product.


## Retrieve All Products

### Description
Retrieves a list of all products from the database.
### Product 
- **URL:** `http://localhost:6000/api/product`
- **Method:** `GET`


## Add Variant to a Product

**URL:** `http://localhost:6000/api/product/:mainProductName/variant`

**Method:** `POST`

**Description:** Adds a variant to an existing product by providing variant details and uploading images.


### Body

- `variantName` (string): Name of the variant.
- `productSize` (string): Size of the product.
- `productWoodType` (string): Wood type used.
- `finishType` (string): Finish type of the product.
- `productPrice` (number): Price of the variant.

### Responses

- **201 Created:** The variant was successfully added.
- **404 Not Found:** The main product was not found.
- **500 Server Error:** An error occurred on the server.

## Show Variants of a Product

**URL:** `http://localhost:6000/api/:productName/variants`

**Method:** `GET`

**Description:** Retrieve all variants associated with a specified main product.

### Responses

- **200 OK:** Returns the main product and its associated variants.
- **404 Not Found:** The specified main product was not found.
- **500 Server Error:** An error occurred on the server.

# Contact API Endpoint

This API endpoint allows users to submit a contact form, which sends an email to the specified email address.

## API Endpoint



### Contact
- **URL:** `http://localhost:6000/api/contact`
- **Method:** `POST`
- **Description:** Handles contact form submissions and sends an email with the submitted details..
**Request Body:**

The request body should be in JSON format and include the following fields:
- `name` (string): The name of the person submitting the form.
- `email` (string): The email address of the person submitting the form.
- `message` (string): The message/content of the contact form.

**Example Request:**

```json

{
  "name": "Chetan Mendhe",
  "email": "surajmendhe498@gmail.com",
  "message": "I am interested in your web development services. Please provide more information."
}

```
**Response:**

```json
{
  "message": "Email sent successfully"
}
```



## Set Up Environment Variables

Create a `.env` file in the root directory of your project and add your environment variables. Below is an example `.env` file:

**Example `.env` file:**
```env

PORT=3000
MONGO_URI=mongodb://localhost:27017/defaultdb
SecretKey=your_jwt_secret_key

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
