# Setup & Verification Checklist

## ✅ Pre-requisites

- [ ] Node.js installed (v16+)
  ```bash
  node --version
  ```

- [ ] npm installed
  ```bash
  npm --version
  ```

- [ ] MySQL installed & running
  ```bash
  mysql --version
  ```

- [ ] Git installed (optional)
  ```bash
  git --version
  ```

---

## ✅ Initial Setup

### Backend Setup
- [ ] Navigate to backend folder
  ```bash
  cd backend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```

- [ ] Create `.env` file
  ```
  DATABASE_URL="mysql://root:password@localhost:3306/kavi_db"
  JWT_SECRET="kavi_secret_key_2024"
  PORT=5000
  ```

- [ ] Create MySQL database
  ```sql
  CREATE DATABASE kavi_db;
  ```

- [ ] Generate Prisma Client
  ```bash
  npx prisma generate
  ```

- [ ] Run migrations
  ```bash
  npx prisma migrate dev --name init
  ```

### Frontend Setup
- [ ] Navigate to frontend folder
  ```bash
  cd frontend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```

---

## ✅ Running the Application

### Start Backend
- [ ] Open terminal 1
  ```bash
  cd backend
  npm run dev
  ```

- [ ] Verify backend running
  - [ ] Check terminal: "Server running on port 5000"
  - [ ] Open: http://localhost:5000
  - [ ] Should see: Cannot GET /

### Start Frontend
- [ ] Open terminal 2
  ```bash
  cd frontend
  npm run dev
  ```

- [ ] Verify frontend running
  - [ ] Check terminal: "Local: http://localhost:3000"
  - [ ] Open: http://localhost:3000
  - [ ] Should see: Landing page

---

## ✅ Feature Testing

### Landing Page
- [ ] Navigate to http://localhost:3000
- [ ] Check navigation menu works
- [ ] Check "Sign in" button works
- [ ] Check "Sign up" button works
- [ ] Check responsive design

### Authentication
- [ ] Click "Sign up"
- [ ] Fill form:
  - Name: Test User
  - Email: test@example.com
  - Password: password123
- [ ] Click "Create Account"
- [ ] Should see success message
- [ ] Switch to "Sign in" tab
- [ ] Login with same credentials
- [ ] Should redirect to dashboard

### Dashboard
- [ ] Check sidebar menu visible
- [ ] Check user name displayed
- [ ] Check Financial Health Score
- [ ] Check Ringkasan Bulanan
- [ ] Click "Tambah Transaksi"
- [ ] Fill transaction form:
  - Nominal: 50000
  - Kategori: Pengeluaran - Makanan
  - Tanggal: Today
  - Catatan: Test transaction
- [ ] Click "Simpan"
- [ ] Check transaction appears in list
- [ ] Check chart updates

### Spending Tracker
- [ ] Click "Spending Habit Tracker" in sidebar
- [ ] Check pie chart displays
- [ ] Check category legend displays
- [ ] Check bar chart displays
- [ ] Toggle "Mingguan" / "Bulanan"
- [ ] Check chart updates

### Smart Money
- [ ] Click "Smart Money" in sidebar
- [ ] Click "Tambah Kategori"
- [ ] Enter category name: "Test Category"
- [ ] Check category appears
- [ ] Click "Hapus" on category
- [ ] Confirm deletion
- [ ] Check category removed

### Bill Buddy
- [ ] Click "Bill Buddy" in sidebar
- [ ] Enter total bill: 120000
- [ ] Check amount split evenly
- [ ] Toggle "Dibagi secara manual"
- [ ] Check UI updates

### Accounts
- [ ] Click "Accounts" in sidebar
- [ ] Check user profile displays
- [ ] Update name: "Updated Name"
- [ ] Update email: "updated@example.com"
- [ ] Click "Simpan"
- [ ] Check success message
- [ ] Check sidebar name updates

### Logout
- [ ] Click "Logout" in sidebar
- [ ] Should redirect to sign in page
- [ ] Try accessing dashboard directly
- [ ] Should redirect to sign in

---

## ✅ API Testing (Optional)

### Using Browser/Postman

#### Register
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "API Test",
  "email": "api@test.com",
  "password": "test123"
}
```
- [ ] Should return userId

#### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "api@test.com",
  "password": "test123"
}
```
- [ ] Should return token and user object

#### Get Transactions (with token)
```
GET http://localhost:5000/api/transactions
Authorization: Bearer {your_token}
```
- [ ] Should return array of transactions

---

## ✅ Database Verification

### Using Prisma Studio
```bash
cd backend
npx prisma studio
```

- [ ] Open http://localhost:5555
- [ ] Check User table has data
- [ ] Check Transaction table has data
- [ ] Check Category table has data

### Using MySQL CLI
```bash
mysql -u root -p
```

```sql
USE kavi_db;
SHOW TABLES;
SELECT * FROM User;
SELECT * FROM Transaction;
SELECT * FROM Category;
```

- [ ] All tables exist
- [ ] Data is present

---

## ✅ Code Quality Check

### Backend
- [ ] No console errors in terminal
- [ ] Server restarts on file changes (nodemon)
- [ ] All API endpoints respond correctly

### Frontend
- [ ] No console errors in browser
- [ ] Hot reload works (HMR)
- [ ] All components render correctly
- [ ] No React warnings

---

## ✅ Build & Production

### Frontend Build
```bash
cd frontend
npm run build
```

- [ ] Build completes without errors
- [ ] `dist` folder created
- [ ] Files in dist folder

### Preview Build
```bash
npm run preview
```

- [ ] Preview server starts
- [ ] Application works in production mode

---

## ✅ Documentation Check

- [ ] README.md exists and complete
- [ ] QUICK_START.md exists
- [ ] API_DOCUMENTATION.md exists
- [ ] PROJECT_STRUCTURE.md exists
- [ ] MIGRATION_NOTES.md exists
- [ ] SUMMARY.md exists
- [ ] TROUBLESHOOTING.md exists
- [ ] CHECKLIST.md exists (this file)

---

## ✅ File Structure Verification

### Backend Files
- [ ] `backend/package.json`
- [ ] `backend/server.js`
- [ ] `backend/.env`
- [ ] `backend/prisma/schema.prisma`

### Frontend Files
- [ ] `frontend/package.json`
- [ ] `frontend/vite.config.js`
- [ ] `frontend/tailwind.config.js`
- [ ] `frontend/src/main.jsx`
- [ ] `frontend/src/App.jsx`
- [ ] `frontend/src/index.css`

### Frontend Components
- [ ] `frontend/src/components/Sidebar.jsx`
- [ ] `frontend/src/components/DashboardContent.jsx`
- [ ] `frontend/src/components/SpendingTracker.jsx`
- [ ] `frontend/src/components/SmartMoney.jsx`
- [ ] `frontend/src/components/BillBuddy.jsx`
- [ ] `frontend/src/components/Accounts.jsx`

### Frontend Pages
- [ ] `frontend/src/pages/LandingPage.jsx`
- [ ] `frontend/src/pages/SignIn.jsx`
- [ ] `frontend/src/pages/Dashboard.jsx`

### Frontend Utils
- [ ] `frontend/src/utils/api.js`

### Images
- [ ] `frontend/public/images/landingPageImage.jpg`
- [ ] `frontend/public/images/SignInImage.jpeg`
- [ ] `frontend/public/images/logo.png`
- [ ] `frontend/public/images/medal.png`
- [ ] `frontend/public/images/PopUpBerhasil.jpeg`
- [ ] `frontend/public/images/PopUpGagal.jpeg`
- [ ] `frontend/public/images/Success.png`

---

## ✅ Security Check

- [ ] Passwords are hashed (bcryptjs)
- [ ] JWT tokens used for auth
- [ ] .env file not committed to git
- [ ] CORS configured properly
- [ ] SQL injection protected (Prisma)

---

## ✅ Performance Check

- [ ] Backend responds quickly (<100ms)
- [ ] Frontend loads quickly (<2s)
- [ ] Charts render smoothly
- [ ] No memory leaks
- [ ] Database queries optimized

---

## ✅ Browser Compatibility

Test in different browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

---

## ✅ Responsive Design

Test in different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## ✅ Final Verification

- [ ] All features work as expected
- [ ] No console errors
- [ ] No broken links
- [ ] All images load
- [ ] All forms work
- [ ] All buttons work
- [ ] Navigation works
- [ ] Authentication works
- [ ] Data persists in database
- [ ] Logout works
- [ ] UI matches original design

---

## 🎉 Completion

If all checkboxes are checked, congratulations! 
Your KAVI Fullstack application is ready to use! 🚀

### Next Steps:
1. Deploy to production server
2. Add more features
3. Optimize performance
4. Add tests
5. Monitor and maintain

---

## 📝 Notes

Use this space to note any issues or customizations:

```
Date: _______________
Issues found: _______________
Customizations made: _______________
```
