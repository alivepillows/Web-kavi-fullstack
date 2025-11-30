# Troubleshooting Guide

## Common Issues & Solutions

### 1. MySQL Connection Error

**Error:**
```
Error: P1001: Can't reach database server at localhost:3306
```

**Solutions:**
- ✅ Pastikan MySQL server berjalan
- ✅ Cek username/password di `backend/.env`
- ✅ Cek port MySQL (default 3306)
- ✅ Test koneksi: `mysql -u root -p`

**Fix:**
```bash
# Windows - Start MySQL
net start MySQL80

# Atau via XAMPP/WAMP
# Start MySQL dari control panel
```

---

### 2. Database Not Found

**Error:**
```
Error: P1003: Database kavi_db does not exist
```

**Solution:**
```sql
-- Buka MySQL dan jalankan:
CREATE DATABASE kavi_db;
```

Lalu migrate:
```bash
cd backend
npx prisma migrate dev --name init
```

---

### 3. Prisma Client Not Generated

**Error:**
```
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
cd backend
npx prisma generate
```

---

### 4. Port Already in Use

**Error Backend:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Cari process yang menggunakan port 5000
netstat -ano | findstr :5000

# Kill process (ganti PID dengan nomor yang muncul)
taskkill /PID <PID> /F

# Atau ubah port di backend/.env
PORT=5001
```

**Error Frontend:**
```
Port 3000 is in use
```

**Solution:**
Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 3001  // Ubah ke port lain
}
```

---

### 5. Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Hapus node_modules dan install ulang
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install

# Atau untuk frontend
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

### 6. CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
Backend sudah include CORS middleware. Pastikan:
- Backend berjalan di port 5000
- Frontend proxy configured di `vite.config.js`

Jika masih error, tambahkan di `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

### 7. JWT Token Invalid

**Error:**
```
Error: Invalid token
```

**Solutions:**
- ✅ Logout dan login ulang
- ✅ Clear localStorage: `localStorage.clear()`
- ✅ Cek JWT_SECRET di `.env` sama dengan yang digunakan

---

### 8. Prisma Migration Failed

**Error:**
```
Error: Migration failed to apply
```

**Solution:**
```bash
cd backend

# Reset database (WARNING: Hapus semua data)
npx prisma migrate reset

# Atau force migrate
npx prisma migrate deploy
```

---

### 9. React Component Not Rendering

**Error:**
Halaman blank atau component tidak muncul

**Solutions:**
- ✅ Cek console browser (F12)
- ✅ Cek import path benar
- ✅ Pastikan export default ada
- ✅ Restart dev server

---

### 10. Tailwind Classes Not Working

**Error:**
Styling tidak muncul

**Solutions:**
- ✅ Cek `tailwind.config.js` content path
- ✅ Cek `index.css` ada @tailwind directives
- ✅ Restart dev server
- ✅ Clear browser cache

---

### 11. Chart.js Not Displaying

**Error:**
Chart tidak muncul atau error

**Solutions:**
```bash
# Pastikan Chart.js terinstall
cd frontend
npm install chart.js react-chartjs-2

# Import yang benar
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
```

---

### 12. Images Not Loading

**Error:**
Images 404 atau tidak muncul

**Solutions:**
- ✅ Pastikan images ada di `frontend/public/images/`
- ✅ Path harus `/images/filename.jpg` (dengan slash di depan)
- ✅ Cek case-sensitive filename
- ✅ Restart dev server

---

### 13. API Request Failed

**Error:**
```
Error: Network Error
```

**Solutions:**
- ✅ Pastikan backend berjalan
- ✅ Cek URL di `api.js` benar
- ✅ Cek network tab di browser DevTools
- ✅ Cek CORS configuration

---

### 14. npm install Gagal

**Error:**
```
npm ERR! code ENOENT
```

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
npm install

# Atau gunakan yarn
npm install -g yarn
yarn install
```

---

### 15. Vite Build Error

**Error:**
```
Error: Build failed
```

**Solutions:**
```bash
cd frontend

# Clear cache
rmdir /s /q node_modules .vite
npm install

# Build ulang
npm run build
```

---

## Debug Tips

### Backend Debugging
```javascript
// Tambahkan console.log di server.js
app.post('/api/auth/login', async (req, res) => {
  console.log('Login request:', req.body);
  // ... rest of code
});
```

### Frontend Debugging
```javascript
// Gunakan React DevTools
// Tambahkan console.log
useEffect(() => {
  console.log('Component mounted');
  console.log('State:', state);
}, [state]);
```

### Database Debugging
```bash
# Buka Prisma Studio
cd backend
npx prisma studio

# Lihat data di browser: http://localhost:5555
```

---

## Performance Issues

### Slow Backend
- ✅ Add database indexes
- ✅ Optimize queries
- ✅ Use pagination
- ✅ Add caching

### Slow Frontend
- ✅ Use React.memo
- ✅ Lazy load components
- ✅ Optimize images
- ✅ Code splitting

---

## Still Having Issues?

1. **Check Logs**
   - Backend: Terminal output
   - Frontend: Browser console (F12)
   - Database: MySQL logs

2. **Verify Setup**
   - Node.js version: `node --version`
   - npm version: `npm --version`
   - MySQL running: `mysql --version`

3. **Clean Install**
   ```bash
   # Backend
   cd backend
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   
   # Frontend
   cd frontend
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

4. **Check Documentation**
   - README.md
   - QUICK_START.md
   - API_DOCUMENTATION.md

5. **Reset Everything**
   ```bash
   # Database
   cd backend
   npx prisma migrate reset
   
   # Dependencies
   # Delete node_modules di backend & frontend
   # npm install di keduanya
   ```

---

## Contact & Support

Jika masih ada masalah:
1. Cek error message lengkap
2. Screenshot error
3. Cek versi Node.js, npm, MySQL
4. Cek semua file konfigurasi (.env, vite.config.js, dll)
