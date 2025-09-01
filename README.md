# Final Project | Online Store Web App

## Project Overview
This is a client-side final project developed using HTML, CSS, and JavaScript. The project represents a web-based store or business platform, such as a toy shop, clothing store, bookstore, grocery shop, or service-provider website.

The system includes user authentication, product management (for admins), a dynamic shop interface, shopping cart, and optional order history.

---

## Technologies Used
- **Languages**: HTML, CSS, JavaScript (ES6+)
- **Design Patterns**: Object-oriented programming (using `class`es)
- **Architecture**: Single Page Application (SPA)
- **Tools**: `fetch` API for backend communication
- **UX Enhancements**: Animations, error handling, and loading states

---

## System Structure

### 1. Registration & Login Page
- **Register**: New user sign-up form
- **Login**: Existing user authentication

### 2. Admin Product Management
- View list of products
- Add a new product
- Delete existing products
- Edit product details

### 3. Shop Page
The main customer interface for browsing and shopping:
- Display products with **image**, **description**, and **price**
- "Add to Cart" button for each product

### 4. Shopping Cart Page
Shows all items the user added:
- View product summary
- Remove items from cart

### 5. (Optional) Order History Page
- Complete order
- View past purchases

---

## Key Features
- **SPA Behavior** – All navigation handled in one HTML page.
- **OOP Structure** – JavaScript code organized in `class`es for each feature (User, Product, Cart, etc).
- **Dynamic UI** – Uses JavaScript to generate content and apply animations.
- **Server Communication** – All data (products, users, orders) is fetched via `fetch()` API calls.
- **Error Handling** – Loading states and user-friendly error messages.

---

## How to Run
1. Open `index.html` in your browser.
2. Register a user and log in.
3. As an **admin**:
   - Add/edit/delete products.
4. As a **customer**:
   - Browse the store.
   - Add items to your cart.
   - View and modify your shopping cart.
   - (Optional) Complete your order and view history.

---

