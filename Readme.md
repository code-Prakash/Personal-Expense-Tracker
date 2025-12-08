# Personal Expense Tracker

A full-stack web application built with **React**, **Node.js**, and **MongoDB** to help users track their income and expenses efficiently.

## Features

✅ **User Authentication** – Sign up, login, and secure session management  
✅ **Income Tracking** – Record and categorize income sources  
✅ **Expense Tracking** – Log expenses by category and date  
✅ **Dashboard** – View financial overview with interactive charts  
✅ **Recent Transactions** – Quick access to latest 5 transactions  
✅ **Financial Analytics** – Last 30 days expense and 60 days income analysis  
✅ **Profile Management** – Upload profile picture and manage user info  
✅ **Responsive Design** – Mobile-friendly UI with Tailwind CSS  

## Tech Stack

### Frontend
- **React 18** – UI library
- **React Router** – Client-side routing
- **Axios** – HTTP client
- **Recharts** – Data visualization (bar charts, pie charts)
- **Tailwind CSS** – Styling
- **React Icons** – Icon library
- **React Hot Toast** – Toast notifications
- **Moment.js** – Date formatting

### Backend
- **Node.js + Express** – Server framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication tokens
- **Bcryptjs** – Password hashing
- **Multer** – File upload handling

## Project Structure

```
Personal Expense Tracker/
├── frontend/
│   └── expense-tracker/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Auth/
│       │   │   │   ├── Login.jsx
│       │   │   │   └── SignUp.jsx
│       │   │   └── Dashboard/
│       │   │       ├── Home.jsx
│       │   │       ├── Income.jsx
│       │   │       └── Expense.jsx
│       │   ├── components/
│       │   │   ├── layouts/
│       │   │   ├── Cards/
│       │   │   ├── Charts/
│       │   │   ├── Dashboard/
│       │   │   └── Inputs/
│       │   ├── context/
│       │   │   └── userContext.jsx
│       │   ├── hooks/
│       │   │   └── useUserAuth.jsx
│       │   ├── utils/
│       │   │   ├── axiosInstance.js
│       │   │   ├── apiPaths.js
│       │   │   ├── helper.js
│       │   │   ├── uploadImage.js
│       │   │   └── data.js
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Income.js
│   │   └── Expense.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── incomeController.js
│   │   ├── expenseController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── incomeRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── .env
│   └── server.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```
Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend/expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```
App runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login user
- `GET /api/auth/getUser` – Get current user info (protected)

### Income
- `POST /api/income/add` – Add income transaction
- `GET /api/income/all` – Get all income (protected)
- `DELETE /api/income/:id` – Delete income (protected)

### Expense
- `POST /api/expense/add` – Add expense transaction
- `GET /api/expense/all` – Get all expenses (protected)
- `DELETE /api/expense/:id` – Delete expense (protected)

### Dashboard
- `GET /api/dashboard` – Get dashboard summary (protected)

## Usage

1. **Sign Up** – Create a new account with email and password
2. **Login** – Log in with credentials
3. **Add Income** – Navigate to Income page, click "Add Income"
4. **Add Expense** – Navigate to Expense page, click "Add Expense"
5. **View Dashboard** – See summary, charts, and recent transactions
6. **Logout** – Click logout from sidebar menu

## Key Features Explained

### Dashboard
- **Total Balance** – Income minus Expenses
- **Income Overview** – Chart showing income trends over time
- **Expense Overview** – Bar chart of expenses by category (last 30 days)
- **Recent Transactions** – Last 5 mixed income/expense entries
- **Finance Overview** – Pie chart breakdown of balance, income, and expense

### Authentication Flow
1. User signs up with email and password
2. Backend hashes password with bcryptjs
3. JWT token issued on successful login
4. Token stored in localStorage
5. axios interceptor auto-attaches token to requests
6. Protected routes use `useUserAuth()` hook for validation

### Charts
- **Bar Chart** – Expenses by category, Income by date
- **Pie Chart** – Balance composition (income vs expense)
- **Responsive** – Works on desktop and mobile

## Future Enhancements

- 📊 Budget planning and limits
- 📱 Mobile app (React Native)
- 💾 Export to CSV/PDF
- 📧 Email notifications
- 🎨 Dark mode
- 🔐 Two-factor authentication
- 💳 Bank integration

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

MIT License – Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue on GitHub or contact the maintainer.

---

**Happy Tracking! 💰**