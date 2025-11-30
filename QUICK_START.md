# Quick Start Guide - KAVI

## Prerequisites
- Node.js (v16 atau lebih baru)
- MySQL Server
- npm atau yarn

## Setup dalam 5 Langkah

### 1. Install Dependencies
```bash
# Jalankan setup.bat atau manual:
cd backend
npm install

cd ../frontend
npm install
```

### 2. Setup Database
Buka MySQL dan jalankan:
```sql
CREATE DATABASE kavi_db;
```

### 3. Konfigurasi Environment
Edit `backend/.env`:
```
DATABASE_URL="mysql://root:password@localhost:3306/kavi_db"
JWT_SECRET="kavi_secret_key_2024"
PORT=5000
```
Ganti `root` dan `password` sesuai MySQL Anda.

### 4. Migrate Database
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Jalankan Aplikasi
```bash
# Otomatis (Windows):
start.bat

# Manual:
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Akses Aplikasi
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Test Account
1. Buka http://localhost:3000
2. Klik "Sign up"
3. Isi form registrasi
4. Login dengan akun yang dibuat
5. Mulai gunakan aplikasi!

## Troubleshooting

### Error: Cannot connect to MySQL
- Pastikan MySQL server berjalan
- Cek username/password di `.env`
- Cek port MySQL (default 3306)

### Error: Port already in use
- Backend: Ubah PORT di `.env`
- Frontend: Ubah port di `vite.config.js`

### Error: Prisma Client not generated
```bash
cd backend
npx prisma generate
```

### Error: Module not found
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

## Fitur Utama

1. **Dashboard** - Lihat ringkasan keuangan
2. **Spending Tracker** - Analisis pengeluaran dengan chart
3. **Smart Money** - Kelola kategori pengeluaran
4. **Bill Buddy** - Split tagihan dengan teman
5. **Accounts** - Kelola profil

## Development Tips

### Hot Reload
- Backend: Menggunakan nodemon (auto-restart)
- Frontend: Menggunakan Vite HMR (instant update)

### Database Management
```bash
# Lihat database di browser
npx prisma studio

# Reset database
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name migration_name
```

### Build Production
```bash
cd frontend
npm run build
# Output: frontend/dist
```

## Support
Jika ada masalah, cek:
1. README.md - Setup lengkap
2. API_DOCUMENTATION.md - API reference
3. PROJECT_STRUCTURE.md - Struktur project
