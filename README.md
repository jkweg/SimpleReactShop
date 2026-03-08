# 🛒 E-Commerce Web App (Full Stack React + Node.js)

A fully functional application developed as an academic project. The system consists of a client-side (Frontend) and a server-side (Backend) featuring a custom API and JWT-based authentication.

---

## 🛠️ Tech Stack & Tools

### Frontend (Client)
* **React** – UI library for building the interface.
* **React Router DOM** – Client-side routing and navigation.
* **Axios** – API communication (fetching products, processing orders).
* **Vite** – Fast build tool and development server.

### Backend (Server)
* **Node.js** – JavaScript runtime environment.
* **Express** – Web framework for the server.
* **JSON Web Token (JWT)** – Secure authentication (Access & Refresh Token logic).
* **FS (File System)** – Handling a simple JSON-based database.

### Database
* **`db.json` file** – Stores user data, reviews, orders, and active session tokens.

---

## ⚙️ Features

1. **User Management System:**
    * User registration.
    * Login with data validation.
    * Silent session refreshing (Refresh Token) in the background.
    * Secure logout.

2. **Product Catalog:**
    * Dynamic product listing fetched from the API.
    * Product filtering by name.
    * Detailed product view.

3. **Shopping Cart:**
    * Adding products to the cart.
    * Quantity management (+/-).
    * Removing items.
    * Dynamic total price calculation.
    * Persistent cart state using **LocalStorage**.

4. **Reviews & Ratings (RBAC - Role-Based Access Control):**
    * Submitting reviews (restricted to authenticated users).
    * **Deletion Permissions:**
        * Standard users can delete **only their own** reviews.
        * Admin (account: `prowadzacy`) has the authority to delete **any** review.

5. **Orders:**
    * Order placement (saved to the database).
    * Order history view within the user profile.

---

## 🚀 Setup & Installation

The project requires running two separate terminals – one for the server and one for the client.

### Step 1: Backend Setup (Server)
1. Open a terminal in the project directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server (default port: 3000):
    ```bash
    node server.js
    ```

### Step 2: Frontend Setup (Client)
1. Open a **new** terminal in the project directory.
2. Start the React application:
    ```bash
    npm run dev
    ```
3. Open the link displayed in the terminal (usually `http://localhost:5173`).
