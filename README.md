# 📝 [iLuxe Shop Backend](https://iluxe-shop-backend.vercel.app/)

## 📌 Overview
This is the backend for the Stationery Shop application, a role-based e-commerce platform for managing stationery products, orders, and users. The backend handles authentication, product management, orders, and secure payments.

## 🚀 Features
- User authentication with JWT-based login/logout.
- Role-based access control (Admin & User).
- Product management (CRUD operations for Admin).
- Order management with status updates.
- Secure payment integration (e.g., SurjoPay, Stripe).

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Payment Integration:** SurjoPay/Stripe
- **Other:** dotenv, cors, express-validator

## 📂 Project Structure
```
backend/
├── src/
│   ├── builder/
│   ├── config/
│   ├── errors/
│   ├── interface/
│   ├── middlewares/
│   ├── modules/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   ├── server.ts
├── uploads/
├── .env
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
├── vercel.json
├── yarn.lock
```

## 🏗️ Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/nNEWBE/iluxe-shop-backend.git
cd iluxe-shop-backend
```

### 2️⃣ Install Dependencies
```sh
yarn
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and configure the necessary environment variables for your MongoDB connection, JWT secrets, payment gateway, and other configurations. For example:
- `PORT`: Port for the server to run on.
- `DATABASE_URL`: MongoDB connection string.
- `JWT_ACCESS_SECRET`: Secret key for JWT access tokens.
- `JWT_REFRESH_SECRET`: Secret key for JWT refresh tokens.
- Payment-related keys (e.g., `SP_ENDPOINT`, `SP_USERNAME`).

### 4️⃣ Start the Server
```sh
yarn start:dev
```
The server will run at `http://localhost:5000`

## 📌 API Endpoints

### 🔹 Authentication Routes
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | /api/auth/register    | Register a new user      |
| POST   | /api/auth/login       | User login               |
| POST   | /api/auth/logout      | User logout              |
| POST   | /api/auth/refresh-token | Refresh JWT token        |

### 🔹 User Routes
| Method | Endpoint                       | Description               |
|--------|--------------------------------|---------------------------|
| GET    | /api/users/                    | Get all users             |
| PATCH  | /api/users/update-user/:id     | Update user details       |
| PATCH  | /api/users/change-status/:id   | Change user status        |
| GET    | /api/users/me                  | Get logged-in user profile|

### 🔹 Product Routes
| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| POST   | /api/products/create           | Create a new product     |
| GET    | /api/products/                 | Get all products         |
| GET    | /api/products/all              | Get all products without query |
| GET    | /api/products/:productId       | Get a single product     |
| PATCH  | /api/products/:productId       | Update a product         |
| DELETE | /api/products/:productId       | Delete a product         |

### 🔹 Order Routes
| Method | Endpoint                                  | Description                |
|--------|-------------------------------------------|----------------------------|
| POST   | /api/orders/create-order                 | Create an order            |
| GET    | /api/orders/verify                        | Verify payment             |
| GET    | /api/orders/                              | Get all orders             |
| GET    | /api/orders/user-orders/:userId           | Get orders of a user       |
| GET    | /api/orders/revenue                       | Calculate revenue          |
| PATCH  | /api/orders/update-order-status/:orderId  | Update order status        |
| DELETE | /api/orders/delete-order/:orderId         | Delete an order            |

## 🔐 Authentication & Security
- JWT-based authentication stored in local storage.
- Passwords securely hashed using bcrypt.
- CORS enabled for secure cross-origin requests.

## 📌 Deployment
To deploy on a platform like Heroku or Vercel:
1. Set environment variables on the hosting service.
2. Ensure MongoDB connection is accessible.
3. Deploy the project using Git or CI/CD pipelines.

## 🛠️ Scripts

The project uses several scripts to handle development, production, linting, and formatting.

| Command               | Description                                  |
|-----------------------|----------------------------------------------|
| `yarn start:prod`      | Start the server in production mode.         |
| `yarn start:dev`       | Start the server in development mode with live reloading. |
| `yarn build`           | Compile TypeScript code to JavaScript (dist). |
| `yarn lint`            | Run ESLint to check for code quality issues. |
| `yarn lint:fix`        | Automatically fix ESLint issues.             |
| `yarn prettier`        | Format the code using Prettier.              |
| `yarn prettier:fix`    | Automatically fix formatting issues with Prettier. |
| `yarn test`            | Run tests (currently shows an error message). |

### 📝 .env Structure

Ensure you configure the `.env` file in the root directory of the project. Below is the structure for the `.env` file (exclude sensitive data like passwords, API keys, etc.):

```
PORT=5000
NODE_ENV=development
BCRYPT_SALT_ROUNDS=12
DATABASE_URL=your_mongodb_connection_string
DEFAULT_PASSWORD=your_default_password
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=30d
COOKIES_MAX_AGE=86400000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SP_ENDPOINT=your_surjopayment_endpoint
SP_USERNAME=your_surjopayment_username
SP_PASSWORD=your_surjopayment_password
SP_PREFIX=your_surjopayment_prefix
SP_RETURN_URL=your_surjopayment_return_url
```

## 💡 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.

---