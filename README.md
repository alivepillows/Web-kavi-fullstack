# KAVI - Financial Assistant (Fullstack)

Aplikasi manajemen keuangan untuk mahasiswa menggunakan Node.js, Prisma, MySQL, dan React.js

## Tech Stack

### Backend
- Node.js + Express
- Prisma ORM
- MySQL Database
- JWT Authentication
- bcryptjs

### Frontend
- React.js + Vite
- React Router
- Axios
- Chart.js
- Tailwind CSS

## Setup Instructions

### 1. Setup Database MySQL

Buat database MySQL baru:
```sql
CREATE DATABASE kavi_db;
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Edit file `.env` sesuai konfigurasi MySQL Anda:
```
DATABASE_URL="mysql://username:password@localhost:3306/kavi_db"
JWT_SECRET="kavi_secret_key_2024"
PORT=5000
```

Generate Prisma Client dan migrate database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Jalankan backend server:
```bash
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Jalankan frontend:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - Get semua transaksi user
- `POST /api/transactions` - Tambah transaksi baru

### Categories
- `GET /api/categories` - Get semua kategori user
- `POST /api/categories` - Tambah kategori baru
- `DELETE /api/categories/:id` - Hapus kategori

### User
- `GET /api/user` - Get data user
- `PUT /api/user` - Update data user

## Features

1. **Landing Page** - Halaman utama dengan informasi aplikasi
2. **Authentication** - Sign in & Sign up dengan JWT
3. **Dashboard** - Financial health score, ringkasan bulanan, riwayat transaksi
4. **Spending Tracker** - Visualisasi pengeluaran dengan chart
5. **Smart Money** - Manajemen kategori pengeluaran
6. **Bill Buddy** - Split bill dengan teman
7. **Accounts** - Manajemen profil user

## Tampilan

Tampilan UI tetap sama dengan versi HTML/CSS/JS original, menggunakan Tailwind CSS dengan warna custom:
- Dark Blue: #113F67
- Blue: #34699A
- Light Blue: #58A0C8
- Yellow: #FDEE68

## Development

Backend menggunakan nodemon untuk auto-reload:
```bash
cd backend
npm run dev
```

Frontend menggunakan Vite HMR:
```bash
cd frontend
npm run dev
```

## Build Production

Frontend:
```bash
cd frontend
npm run build
```

Output akan ada di folder `frontend/dist`
