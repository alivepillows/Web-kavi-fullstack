# Project Structure

```
Web-Kavi-Fullstack/
│
├── backend/                      # Backend Node.js + Express + Prisma
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server & API routes
│
├── frontend/                     # Frontend React + Vite
│   ├── public/
│   │   └── images/              # Static images
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardContent.jsx
│   │   │   ├── SpendingTracker.jsx
│   │   │   ├── SmartMoney.jsx
│   │   │   ├── BillBuddy.jsx
│   │   │   └── Accounts.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js           # Axios instance
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── postcss.config.js        # PostCSS configuration
│
├── .gitignore
├── README.md                     # Setup instructions
├── API_DOCUMENTATION.md          # API documentation
├── PROJECT_STRUCTURE.md          # This file
├── database.sql                  # Database setup
├── setup.bat                     # Setup script
└── start.bat                     # Start script
```

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Prisma** - ORM for database
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Tailwind CSS** - Styling

## Key Features by Component

### LandingPage.jsx
- Hero section
- Navigation with active indicator
- Call to action buttons

### SignIn.jsx
- Login/Register toggle
- Form validation
- JWT token storage
- API integration

### Dashboard.jsx
- Main layout
- Menu routing
- User session management

### DashboardContent.jsx
- Financial health score
- Transaction management
- Pie chart visualization
- Monthly summary

### SpendingTracker.jsx
- Spending analysis
- Pie & Bar charts
- Weekly/Monthly toggle
- Category breakdown

### SmartMoney.jsx
- Category CRUD operations
- Dynamic category list

### BillBuddy.jsx
- Bill splitting calculator
- Even/Manual split modes
- Participant management

### Accounts.jsx
- User profile management
- Savings percentage display
- Profile update API

## Database Schema

### User
- id (PK)
- name
- email (unique)
- password (hashed)
- createdAt

### Transaction
- id (PK)
- userId (FK)
- amount
- type (masuk/keluar)
- category
- date
- note
- createdAt

### Category
- id (PK)
- userId (FK)
- name
- createdAt
