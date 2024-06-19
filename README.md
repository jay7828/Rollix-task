# **MERN Stack Coding Challenge**

## Overview
This project is a MERN stack application designed to manage and visualize product transaction data. The backend APIs are implemented using Node.js and Express, while the frontend is built with React. The application interacts with a third-party API to fetch transaction data and provides several endpoints to retrieve and manipulate this data. The frontend uses these APIs to display transaction data in a table and visualizes statistics through charts.

## **Project Structure**

### **Backend**

#### **API Endpoints**

1. **Initialize Database**
    - **Endpoint:** `/api/init`
    - **Method:** `GET`
    - **Description:** Fetches JSON data from the third-party API and initializes the database with this data.

2. **List Transactions**
    - **Endpoint:** `/api/transactions`
    - **Method:** `GET`
    - **Query Parameters:**
        - `month` (required): January to December
        - `search` (optional): Text to search in title, description, or price
        - `page` (optional): Page number for pagination (default: 1)
        - `perPage` (optional): Number of items per page (default: 10)
    - **Description:** Returns a list of transactions for the specified month. Supports search and pagination.

3. **Statistics**
    - **Endpoint:** `/api/statistics`
    - **Method:** `GET`
    - **Query Parameter:** `month` (required): January to December
    - **Description:** Provides statistics for the specified month including total sale amount, total sold items, and total not sold items.

4. **Bar Chart Data**
    - **Endpoint:** `/api/bar-chart`
    - **Method:** `GET`
    - **Query Parameter:** `month` (required): January to December
    - **Description:** Returns data for a bar chart showing the number of items in various price ranges for the specified month.

5. **Pie Chart Data**
    - **Endpoint:** `/api/pie-chart`
    - **Method:** `GET`
    - **Query Parameter:** `month` (required): January to December
    - **Description:** Returns data for a pie chart showing unique categories and the number of items in each category for the specified month.

6. **Combined Data**
    - **Endpoint:** `/api/combined`
    - **Method:** `GET`
    - **Query Parameter:** `month` (required): January to December
    - **Description:** Fetches data from the statistics, bar chart, and pie chart APIs, combines the results, and returns a single JSON response.

### **Frontend**

#### **Features**

1. **Transactions Table**
    - Displays a list of transactions for the selected month.
    - Includes a dropdown to select the month (default: March).
    - Supports search functionality to filter transactions by title, description, or price.
    - Implements pagination with "Next" and "Previous" buttons.

2. **Transactions Statistics**
    - Shows total sale amount, total sold items, and total not sold items for the selected month.

3. **Transactions Bar Chart**
    - Displays a bar chart showing the number of items in various price ranges for the selected month.

4. **Transactions Pie Chart**
    - Displays a pie chart showing the distribution of items across different categories for the selected month.

## **Setup Instructions**

### **Prerequisites**
- Node.js
- MongoDB
- npm or yarn

### **Backend Setup**
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO_URI=<your_mongodb_connection_string>
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### **Frontend Setup**
1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

### **Usage**
1. Ensure the backend server is running.
2. Access the frontend application at `http://localhost:3000`.
3. Use the dropdown to select a month and view the transactions, statistics, and charts for that month.

## **API Documentation**

### **Initialize Database**
- **Endpoint:** `/api/init`
- **Method:** `GET`
- **Description:** Fetches data from the third-party API and seeds the database.

### **List Transactions**
- **Endpoint:** `/api/transactions`
- **Method:** `GET`
- **Query Parameters:**
    - `month` (required)
    - `search` (optional)
    - `page` (optional, default: 1)
    - `perPage` (optional, default: 10)

### **Statistics**
- **Endpoint:** `/api/statistics`
- **Method:** `GET`
- **Query Parameter:** `month` (required)

### **Bar Chart Data**
- **Endpoint:** `/api/bar-chart`
- **Method:** `GET`
- **Query Parameter:** `month` (required)

### **Pie Chart Data**
- **Endpoint:** `/api/pie-chart`
- **Method:** `GET`
- **Query Parameter:** `month` (required)

### **Combined Data**
- **Endpoint:** `/api/combined`
- **Method:** `GET`
- **Query Parameter:** `month` (required)

## **Notes**
- Ensure MongoDB is running and accessible.
- The frontend and backend servers should be started separately.
- Update the `.env` file with the correct MongoDB connection string before starting the backend server.

